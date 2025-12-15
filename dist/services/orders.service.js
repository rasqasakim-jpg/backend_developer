import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const checkout = async (data) => {
    if (!data.orderItems || data.orderItems.length === 0) {
        throw new Error("order items tidak boleh kosong");
    }
    return await prisma.$transaction(async (tx) => {
        let total = 0;
        const orderItemsData = [];
        // 1. Loop setiap item untuk ambil data Product asli (Harga & Stok)
        for (const item of data.orderItems) {
            const product = await tx.product.findUnique({
                where: { id: item.productId }
            });
            if (!product) {
                throw new Error(`Product ID ${item.productId} not found`);
            }
            // Validasi Stok (Optional tapi recommended)
            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product ${product.name}`);
            }
            // Hitung Total (Harga DB x Quantity Request)
            const currentPrice = Number(product.price);
            total += currentPrice * item.quantity;
            // Siapkan data untuk disimpan ke table OrderItems
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                priceAtTime: product.price // PENTING: Simpan harga saat transaksi terjadi
            });
            // Update Stok (Decrement)
            await tx.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } }
            });
        }
        // 2. Buat Header Order & Items sekaligus (Nested Write)
        const newOrder = await tx.order.create({
            data: {
                userId: data.userId,
                total, // Total hasil perhitungan real
                orderItems: {
                    create: orderItemsData // Insert ke table OrderItems
                }
            },
            include: {
                orderItems: {
                    include: { product: true } // Return response lengkap
                }
            }
        });
        return newOrder;
    });
};
export const getTransactionById = async (id) => {
    return await prisma.order.findUnique({
        where: { id },
        include: {
            user: true,
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });
};
export const getAllOrders = async () => {
    const order = await prisma.order.findMany();
    const total = order.length;
    return { order, total };
};
export const getOrderById = async (id) => {
    const data = await prisma.order.findUnique({
        where: {
            id
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });
    if (!data) {
        throw new Error("Order tidak ditemukan");
    }
    return data;
};
export const searchOrders = async (userId, maxTotal, minTotal) => {
    return await prisma.order.findMany({
        where: {
            ...(userId !== undefined && { user_id: userId }),
            total: {
                ...(minTotal !== undefined && { gte: minTotal }),
                ...(maxTotal !== undefined && { lte: maxTotal }),
            },
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            },
        }
    });
};
export const createOrder = async (userId, items) => {
    if (!items || items.length === 0) {
        throw new Error("Items tidak boleh kosong");
    }
    const total = await Promise.all(items.map(async (item) => {
        const product = await prisma.product.findUnique({
            where: {
                id: item.productId
            }
        });
        if (!product) {
            throw new Error(`Product dengan ID ${item.productId} tidak ditemukan`);
        }
        return Number(product.price) * Number(item.quantity);
    })).then(prices => prices.reduce((a, b) => a + b, 0));
    return await prisma.order.create({
        data: {
            userId: userId,
            total,
            orderItems: {
                createMany: {
                    data: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            }
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });
};
export const updateOrder = async (id, items) => {
    await getOrderById(id);
    await prisma.orderItems.deleteMany({
        where: {
            id
        }
    });
    const total = await Promise.all(items.map(async (item) => {
        const product = await prisma.product.findUnique({
            where: {
                id: item.productId
            }
        });
        if (!product) {
            throw new Error(`Product dengan ID ${item.productId} tidak ditemukan`);
        }
        return Number(product.price) * Number(item.quantity);
    })).then(prices => prices.reduce((a, b) => a + b, 0));
    return await prisma.order.update({
        where: {
            id: id
        },
        data: {
            total,
            orderItems: {
                createMany: {
                    data: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                }
            }
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });
};
export const deleteOrder = async (id) => {
    await getOrderById(id);
    await prisma.orderItems.deleteMany({
        where: {
            id
        }
    });
    return await prisma.order.delete({
        where: {
            id
        }
    });
};
//# sourceMappingURL=orders.service.js.map