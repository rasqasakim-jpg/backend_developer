import type { Request, Response } from "express";
import * as order from "../services/orders.service";
import { successResponse } from "../utils/response";
import { checkoutOrder } from "../services/orders.service"

export interface OrderRequest extends Request {
    userId: number
    total: number
    orderItems: OrderItems[]
}

export interface OrderItems {
    productId: number
    quantity: number
}

export const checkout = async (req: Request, res: Response) => {
    const result = await checkoutOrder(req.body, req.user!.id)
    successResponse(
        res,
        "Order berasil dibuat",
        result,
        null,
        201
    )
}

export const getAll = async(_req: Request, res: Response) => {
    const data = await order.getAllOrders();

    successResponse(res, 'Success', data);
}

export const getById = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id!);
    if (isNaN(id)) {
        throw new Error("ID tidak valid");
    }

    const data = await order.getOrderById(id);

    successResponse(res, 'Success', data);
}

export const search = async (req: Request, res: Response) => {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const minTotal = req.query.minTotal ? Number(req.query.minTotal) : undefined;
    const maxTotal = req.query.maxTotal ? Number(req.query.maxTotal) : undefined;

    const data = await order.searchOrders(userId, maxTotal, minTotal);

    successResponse(res, "Success", data);
};

export const create = async(req: Request, res: Response) => {
    const { userId, items } = req.body;

    if (isNaN(userId || !userId)) {
        throw new Error("User ID tidak valid");
    }

    const data = await order.createOrder(userId, items);

    successResponse(res, 'Order created successfully', data);
}

export const update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { items } = req.body;

    const orderId = parseInt(id!);
    if (isNaN(orderId)) {
        throw new Error("Order ID tidak valid");
    }

    const update = await order.updateOrder(orderId, items);

    successResponse(res, 'Order updated successfully', update);

}

export const remove = async(req: Request, res: Response) => {
    const { id } = req.params;

    const orderId = parseInt(id!);
    if (isNaN(orderId)) {
        throw new Error("Order ID tidak valid");
    }

    await order.deleteOrder(orderId);

    successResponse(res, 'Order deleted successfully', null);
}