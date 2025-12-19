import type { Prisma, Product } from "../generated/client";
import type { ProductWhereInput } from "../generated/models";
import * as productRepo from '../repository/product.repository'

interface FindAllParams {
  page: number;
  limit: number;
  search?: {
    name?: string;
    min_price?: number;
    max_price?: number;
  }
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface ProductListRespon {
    products: Product[], 
    total: number, 
    totalPages: number, 
    currentPage: number
}

export const getAllProduct = async (params: FindAllParams): Promise<ProductListRespon> => {
  const { page, limit, search, sortBy, sortOrder } = params

  const skip = (page - 1) * limit

  const whereClause: ProductWhereInput = {deletedAt: null,}

  if (search?.name) {
    whereClause.name = {
      contains: search.name,
      mode: 'insensitive',
    }
  }

  if (search?.min_price || search?.max_price) {
    whereClause.price = {}
    if (search.min_price) whereClause.price.gte = search.min_price
    if (search.max_price) whereClause.price.lte = search.max_price
  }

  const sortCriteria: Prisma.ProductOrderByWithRelationInput = sortBy 
  ? { [sortBy]: sortOrder || 'desc' } : 
  { createdAt: 'desc' }

  const products = await productRepo.list(skip, limit, whereClause, sortCriteria)

  const total = await productRepo.countAll(whereClause)

  return {
    products,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  }
}

export const getByIdProduct = async (id: string) => {
  const numId = parseInt(id);

  const product = await productRepo.findById(numId)

  if (!product) {
    throw new Error("Produk dengan ID tersebut tidak ditemukan");
  }
  return product;
}

export const createProduct = async(data: {name: string, description?: string, price: number, stock: number, image: string 
  categoryId?: number}): Promise<Product> => {
    return await productRepo.create(data)
}

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
    await getByIdProduct(id)

    const numId = parseInt(id);

    return await productRepo.update(numId, data)
}

export const deleteProduct = async (id: string): Promise<Product> => {
     const numId = parseInt(id);

     return await productRepo.softDelete(numId)
}