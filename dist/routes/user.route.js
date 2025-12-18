import { Router } from "express";
import * as userController from "../controllers/user.controller";
const router = Router();
router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.deletedUser);
export default router;
//# sourceMappingURL=user.route.js.map