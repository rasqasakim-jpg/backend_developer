import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const list = async (skip, take, where, orderBy) => {
    return await prisma.category.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { products: true }
    });
};
export const countAll = async (where) => {
    return await prisma.category.count({ where });
};
export const findById = async (id) => {
    return await prisma.category.findUnique({
        where: { id, deletedAt: null },
        include: { products: true }
    });
};
export const create = async (data) => {
    return await prisma.category.create({ data });
};
export const update = async (id, data) => {
    return await prisma.category.update({
        where: { id },
        data
    });
};
export const softDelete = async (id) => {
    return await prisma.category.update({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() }
    });
};
//# sourceMappingURL=category.repository.js.map