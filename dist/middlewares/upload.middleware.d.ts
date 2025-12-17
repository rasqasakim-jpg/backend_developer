import type { Request } from "express";
import multer from "multer";
export declare const storage: multer.StorageEngine;
export declare const fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => void;
export declare const upload: multer.Multer;
export default upload;
//# sourceMappingURL=upload.middleware.d.ts.map