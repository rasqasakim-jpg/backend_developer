import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { body, param, validationResult } from 'express-validator';
import type { ValidationChain } from 'express-validator';

dotenv.config();

const app = express();
const PORT = process.env.PORT

// ==================== INTERFACE PRODUK ====================
interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
}

// DATA PRODUK
let products: Product[] = [
  { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
  { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
  { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
];

// ==================== RESPONSE HELPER ====================
const successResponse = (
  res: Response,
  message: string,
  data: unknown = null,
  pagination: any = null,
  statusCode: number = 200
) => {
  const out: any = { success: true, message };
  if (data !== null) out.data = data;
  if (pagination) out.pagination = pagination;
  return res.status(statusCode).json(out);
};

const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  errors: any = null
) => {
  const out: any = { success: false, message };
  if (errors) out.errors = errors;
  return res.status(statusCode).json(out);
};

// ==================== MIDDLEWARE ====================

// keamanan + logger
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// custom middleware 1 → hitung waktu proses
app.use((req: Request, _res: Response, next: NextFunction) => {
  (req as any).startTime = Date.now();
  next();
});

// custom middleware 2 → cek API KEY
app.use((req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return errorResponse(res, "Header X-API-Key wajib diisi!", 401);
  }

  if (apiKey !== "secret-api-key-123") {
    return errorResponse(res, "API Key tidak valid!", 403);
  }

  next();
});

// ==================== VALIDATOR ====================
const validate = (rules: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(rules.map(r => r.run(req)));
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return errorResponse(
      res,
      "Validasi gagal",
      400,
      errors.array().map(err => ({
        field: err.type === "field" ? err.path : null,
        message: err.msg
      }))
    );
  };
};

const productCreateValidation = [
  body("nama").notEmpty().withMessage("Nama wajib diisi").isLength({ min: 3 }).withMessage("Nama minimal 3 karakter"),
  body("deskripsi").notEmpty().withMessage("Deskripsi wajib diisi"),
  body("harga").isNumeric().withMessage("Harga harus angka")
];

const productIdValidation = [
  param("id").isNumeric().withMessage("ID harus angka")
];

// ==================== ASYNC HANDLER ====================
const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
};

// ==================== ROUTES ====================

// HOME
app.get("/", (req: Request, res: Response) => {
  const time = Date.now() - (req as any).startTime;
  successResponse(res, "API Produk Hari 4 aktif!", { waktuProses: `${time}ms` });
});

// GET ALL PRODUK
app.get("/api/products", (_req: Request, res: Response) => {
  successResponse(res, "Daftar produk", products);
});

// GET BY ID + VALIDASI
app.get("/api/products/:id", validate(productIdValidation), (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    throw new Error("Produk dengan ID tersebut tidak ditemukan");
  }

  successResponse(res, "Produk ditemukan", product);
});

// CREATE PRODUK + VALIDASI
app.post("/api/products", validate(productCreateValidation), (req: Request, res: Response) => {
  const { nama, deskripsi, harga } = req.body;

  const newProduct: Product = {
    id: products.length + 1,
    nama,
    deskripsi,
    harga: Number(harga)
  };

  products.push(newProduct);

  successResponse(res, "Produk berhasil ditambahkan", newProduct, null, 201);
});

// UPDATE PRODUK
app.put("/api/products/:id", validate(productIdValidation), (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    throw new Error("Produk dengan ID tersebut tidak ditemukan");
  }

  products[index] = { ...products[index], ...req.body };

  successResponse(res, "Produk berhasil diupdate", products[index]);
});

// DELETE PRODUK
app.delete("/api/products/:id", validate(productIdValidation), (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    throw new Error("Produk dengan ID tersebut tidak ditemukan");
  }

  const deleted = products.splice(index, 1);

  successResponse(res, "Produk berhasil dihapus", deleted[0]);
});

// ROUTE TEST ERROR
app.get("/api/error-test", () => {
  throw new Error("Ini error test!");
});

// ROUTE TEST ASYNC
app.get(
  "/api/async-test",
  asyncHandler(async (_req: Request, res: Response) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    successResponse(res, "Async test berhasil!");
  })
);

// 404 fallback
app.use((req: Request) => {
  throw new Error(`Route ${req.originalUrl} tidak ditemukan!`);
});

// GLOBAL ERROR HANDLER
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("ERROR:", err.message);
  errorResponse(res, err.message, 400);
});

// ==================== LISTEN ====================
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
  console.log("Gunakan header: X-API-Key: secret-api-key-123");
});
