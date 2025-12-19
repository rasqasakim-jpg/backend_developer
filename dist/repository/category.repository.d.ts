import type { Prisma } from "../generated/client";
export declare const list: (skip: number, take: number, where: Prisma.CategoryWhereInput, orderBy: Prisma.CategoryOrderByWithRelationInput) => Promise<({
    products: {
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
    }[];
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
})[]>;
export declare const countAll: (where: Prisma.CategoryWhereInput) => Promise<number>;
export declare const findById: (id: number) => Promise<({
    products: {
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
    }[];
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}) | null>;
export declare const create: (data: Prisma.CategoryCreateInput) => Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare const update: (id: number, data: Prisma.CategoryUpdateInput) => Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
export declare const softDelete: (id: number) => Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}>;
//# sourceMappingURL=category.repository.d.ts.map