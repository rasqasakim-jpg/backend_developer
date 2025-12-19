import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const findByEmail = async (email) => {
    return prisma.user.findFirst({
        where: {
            email,
            deletedAt: null
        }
    });
};
export const findById = async (id) => {
    return prisma.user.findFirst({
        where: {
            id,
            deletedAt: null
        }
    });
};
export const create = async (data) => {
    return prisma.user.create({ data });
};
export const update = async (id, data) => {
    return prisma.user.update({
        where: { id },
        data
    });
};
export const softDelete = async (id) => {
    return prisma.user.update({
        where: {
            id,
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }
    });
};
//# sourceMappingURL=auth.repository.js.map