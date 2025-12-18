// services/user.service.ts
import { getPrisma } from "../prisma";
const prisma = getPrisma();
export const getAllUser = async () => {
    const users = await prisma.user.findMany({
        where: { deletedAt: null },
        include: { orders: true }
    });
    return { users, total: users.length };
};
export const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: { orders: true }
    });
};
export const createUser = async (username, email, password_hash) => {
    const exist = await prisma.user.findFirst({
        where: {
            OR: [{ username }, { email }],
            deletedAt: null
        }
    });
    if (exist) {
        throw new Error("Username atau email sudah digunakan");
    }
    return await prisma.user.create({
        data: { username, email, password_hash }
    });
};
export const updateUser = async (id, data) => {
    return await prisma.user.update({
        where: { id: parseInt(id), deletedAt: null },
        data
    });
};
export const deleteUser = async (id) => {
    return await prisma.user.update({
        where: { id: parseInt(id), deletedAt: null },
        data: { deletedAt: new Date() }
    });
};
//# sourceMappingURL=user.service.js.map