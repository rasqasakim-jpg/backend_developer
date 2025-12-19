import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const list = async (skip, take, where, orderBy) => {
    return await prisma.product.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { category: true }
    });
};
export const countAll = async (where) => {
    return await prisma.product.count({ where });
};
export const findById = async (id) => {
    return await prisma.product.findUnique({
        where: { id, deletedAt: null },
        include: { category: true }
    });
};
export const create = async (data) => {
    return await prisma.product.create({ data });
};
export const update = async (id, data) => {
    return await prisma.product.update({
        where: { id },
        data
    });
};
export const softDelete = async (id) => {
    return await prisma.product.update({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() }
    });
};
//# sourceMappingURL=product.repository.js.map