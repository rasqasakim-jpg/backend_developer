// src/services/category.service.ts
import * as categoryRepository from "../repository/category.repository";
export const getAllCategories = async () => {
    return await categoryRepository.list(0, 100, // default limit (boleh kamu ganti)
    { deletedAt: null }, { createdAt: "desc" });
};
export const getCategoryById = async (id) => {
    const numId = Number(id);
    if (isNaN(numId))
        throw new Error("id kategori tidak valid");
    const category = await categoryRepository.findById(numId);
    if (!category)
        throw new Error("kategori tidak ditemukan");
    return category;
};
export const createCategory = async (name) => {
    // cek nama unik
    const existing = await categoryRepository.list(0, 1, { name, deletedAt: null }, { id: "asc" });
    if (existing.length > 0) {
        throw new Error("nama kategori sudah ada");
    }
    return await categoryRepository.create({ name });
};
export const updateCategory = async (id, data) => {
    const numId = Number(id);
    if (isNaN(numId))
        throw new Error("id kategori tidak valid");
    const category = await categoryRepository.findById(numId);
    if (!category)
        throw new Error("kategori tidak ditemukan");
    if (data.name) {
        const [existingCategoryWithSameName] = await categoryRepository.list(0, 1, { name: data.name, deletedAt: null }, { id: "asc" });
        if (existingCategoryWithSameName && existingCategoryWithSameName.id !== numId) {
            throw new Error("nama kategori sudah ada");
        }
    }
    return await categoryRepository.update(numId, data);
};
export const deleteCategory = async (id) => {
    const numId = Number(id);
    if (isNaN(numId))
        throw new Error("id kategori tidak valid");
    const category = await categoryRepository.findById(numId);
    if (!category)
        throw new Error("kategori tidak ditemukan");
    return await categoryRepository.softDelete(numId);
};
//# sourceMappingURL=category.service.js.map