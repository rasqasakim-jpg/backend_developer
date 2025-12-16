import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

export const apiKryValidate = ((req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return errorResponse(res, "Header X-API-Key wajib diisi!", 401);
  }

  if (apiKey !== "secret-api-key-123") {
    return errorResponse(res, "API Key tidak valid!", 403);
  }

  next();
});
