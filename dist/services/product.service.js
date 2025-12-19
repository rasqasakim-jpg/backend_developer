import * as productRepo from '../repository/product.repository';
export const getAllProduct = async (params) => {
    const { page, limit, search, sortBy, sortOrder } = params;
    const skip = (page - 1) * limit;
    const whereClause = { deletedAt: null, };
    if (search?.name) {
        whereClause.name = {
            contains: search.name,
            mode: 'insensitive',
        };
    }
    if (search?.min_price || search?.max_price) {
        whereClause.price = {};
        if (search.min_price)
            whereClause.price.gte = search.min_price;
        if (search.max_price)
            whereClause.price.lte = search.max_price;
    }
    const sortCriteria = sortBy
        ? { [sortBy]: sortOrder || 'desc' } :
        { createdAt: 'desc' };
    const products = await productRepo.list(skip, limit, whereClause, sortCriteria);
    const total = await productRepo.countAll(whereClause);
    return {
        products,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
};
export const getByIdProduct = async (id) => {
    const numId = parseInt(id);
    const product = await productRepo.findById(numId);
    if (!product) {
        throw new Error("Produk dengan ID tersebut tidak ditemukan");
    }
    return product;
};
export const createProduct = async (data) => {
    return await productRepo.create(data);
};
export const updateProduct = async (id, data) => {
    await getByIdProduct(id);
    const numId = parseInt(id);
    return await productRepo.update(numId, data);
};
export const deleteProduct = async (id) => {
    const numId = parseInt(id);
    return await productRepo.softDelete(numId);
};
//# sourceMappingURL=product.service.js.map