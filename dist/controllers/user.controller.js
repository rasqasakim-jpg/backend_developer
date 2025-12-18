import { successResponse } from "../utils/response";
import { createUser, deleteUser, getAllUser, getUserById, updateUser } from "../services/user.service";
export const getAll = async (_req, res) => {
    const result = await getAllUser();
    successResponse(res, "Semua user berhasil diambil", result);
};
export const getById = async (req, res) => {
    if (!req.params.id) {
        throw new Error("Paramater tidak ditemukan!");
    }
    const user = await getUserById(req.params.id);
    successResponse(res, "User ditemukan", user);
};
export const create = async (req, res) => {
    const { username, email, password_hash } = req.body;
    const user = await createUser(username, email, password_hash);
    successResponse(res, "User berhasil dibuat", user, null, 201);
};
export const update = async (req, res) => {
    if (!req.params.id) {
        throw new Error("Paramater tidak ditemukan!");
    }
    const user = await updateUser(req.params.id, req.body);
    successResponse(res, "User berhasil diperbarui", user);
};
export const deletedUser = async (req, res) => {
    if (!req.params.id) {
        throw new Error("Paramater tidak ditemukan!");
    }
    const user = await deleteUser(req.params.id);
    successResponse(res, "User berhasil dihapus", user);
};
//# sourceMappingURL=user.controller.js.map