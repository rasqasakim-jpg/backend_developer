import { getPrisma } from "../prisma";
import type { Prisma } from "../generated/client";

const prisma = getPrisma()

export const list = async (skip: number, take: number, where: Prisma.ProductWhereInput, 
    orderBy: Prisma.ProductOrderByWithRelationInput) => {

    return await prisma.product.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { category: true }
    })
}

export const countAll = async (where: Prisma.ProductWhereInput) => {
    return await prisma.product.count({ where })
}

export const findById = async (id: number) => {
    return await prisma.product.findUnique({
        where: { id, deletedAt: null },
        include: { category: true }
    })
}

export const create = async (data: Prisma.ProductCreateInput) => {
    return await prisma.product.create({ data })
}

export const update = async (id: number, data: Prisma.ProductUpdateInput) => {
    return await prisma.product.update({
        where: { id },
        data
    })
}

export const softDelete = async (id: number) => {
    return await prisma.product.update({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() }
    })
}

