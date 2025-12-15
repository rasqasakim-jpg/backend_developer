import type { Request, Response } from "express";
export interface OrderRequest extends Request {
    userId: number;
    total: number;
    orderItems: OrderItems[];
}
export interface OrderItems {
    productId: number;
    quantity: number;
}
export declare const checkout: (req: Request, res: Response) => Promise<void>;
export declare const getAll: (_req: Request, res: Response) => Promise<void>;
export declare const getById: (req: Request, res: Response) => Promise<void>;
export declare const search: (req: Request, res: Response) => Promise<void>;
export declare const create: (req: Request, res: Response) => Promise<void>;
export declare const update: (req: Request, res: Response) => Promise<void>;
export declare const remove: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=orders.controller.d.ts.map