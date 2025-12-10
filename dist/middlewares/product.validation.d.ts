import type { NextFunction, Response, Request } from "express";
import { type ValidationChain } from "express-validator";
export declare const validate: (rules: ValidationChain[]) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const productCreateValidation: ValidationChain[];
export declare const productIdValidation: ValidationChain[];
//# sourceMappingURL=product.validation.d.ts.map