export declare const register: (data: {
    username: string;
    email: string;
    password: string;
    role?: string;
}) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    username: string;
    email: string;
    password_hash: string;
    role: string;
}>;
export declare const loginUser: (data: {
    email: string;
    password: string;
}) => Promise<{
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
    token: string;
}>;
//# sourceMappingURL=user.service.d.ts.map