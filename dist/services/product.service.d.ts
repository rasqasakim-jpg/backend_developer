import type { Product } from "../generated/client";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
        min_price?: number;
        max_price?: number;
    };
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
interface ProductListRespon {
    products: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export declare const getAllProduct: (params: FindAllParams) => Promise<ProductListRespon>;
export declare const getByIdProduct: (id: string) => Promise<{
    category: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    } | null;
} & {
    id: number;
    name: string;
    description: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
    stock: number;
    image: string;
    categoryId: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare const createProduct: (data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    image: string;
    categoryId?: number;
}) => Promise<Product>;
export declare const updateProduct: (id: string, data: Partial<Product>) => Promise<Product>;
export declare const deleteProduct: (id: string) => Promise<Product>;
export {};
//# sourceMappingURL=product.service.d.ts.map