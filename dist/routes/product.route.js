import { Router } from "express";
import { create, deleteById, getAll, getById, update } from "../controllers/product.controller";
import { createProductValidation, getProductsByIdValidation } from "../validation/product.validation";
import { validate } from "../utils/validator";
import { authenticate } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/upload.middleware";
const router = Router();
router.get("/", getAll);
router.get("/:id", validate(getProductsByIdValidation), getById);
router.post("/", authenticate, upload.single('image'), validate(createProductValidation), create);
router.put("/:id", validate(getProductsByIdValidation), update);
router.delete("/:id", validate(getProductsByIdValidation), deleteById);
export default router;
//# sourceMappingURL=product.route.js.map