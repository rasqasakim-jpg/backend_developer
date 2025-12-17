import { Router } from "express";
import { 
create, 
deleteById, 
getAll, 
getById, 
search, 
update 
} from "../controllers/product.controller";
import { createProductValidation, getProductsByIdValidation } from "../validation/product.validation";
import { validate } from "../utils/validator";
import { authenticate } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/upload.middleware";

const router = Router();
router.get("/", getAll );
router.get("/:id", validate(getProductsByIdValidation),getById );
router.get("/search", search);
router.post("/", authenticate, upload.single('image'), validate(createProductValidation),create );
router.put("/:id", validate(getProductsByIdValidation),update);
router.delete("/:id", validate(getProductsByIdValidation),deleteById );

export default router;