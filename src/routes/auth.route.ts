import { Router } from "express";
import * as authcontroller from "../controllers/auth.controller";


const router = Router()

router.post('/login', authcontroller.login)
router.post('/register', authcontroller.register)

export default router;