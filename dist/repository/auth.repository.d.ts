import type { Prisma } from "../generated/client";
export declare const findByEmail: (email: string) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password_hash: string;
    role: string;
} | null>;
export declare const findById: (id: number) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password_hash: string;
    role: string;
} | null>;
export declare const create: (data: Prisma.UserCreateInput) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password_hash: string;
    role: string;
}>;
export declare const update: (id: number, data: Prisma.UserUpdateInput) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password_hash: string;
    role: string;
}>;
export declare const softDelete: (id: number) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password_hash: string;
    role: string;
}>;
//# sourceMappingURL=auth.repository.d.ts.map