import type { Profile } from "../generated/client";
export declare const createProfile: (data: {
    name: string;
    gender: string;
    address: string;
    profile_picture_url?: string;
    userId: number;
}) => Promise<Profile>;
export declare const getProfileById: (id: number) => Promise<({
    user: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        username: string;
        email: string;
        password_hash: string;
        role: string;
    };
} & {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    userId: number;
    gender: string | null;
    address: string | null;
    profile_picture_url: string | null;
}) | null>;
export declare const updateProfile: (id: number, data: Partial<Profile>) => Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    userId: number;
    gender: string | null;
    address: string | null;
    profile_picture_url: string | null;
}>;
export declare const deleteProfile: (id: number) => Promise<{
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    userId: number;
    gender: string | null;
    address: string | null;
    profile_picture_url: string | null;
}>;
//# sourceMappingURL=profile.service.d.ts.map