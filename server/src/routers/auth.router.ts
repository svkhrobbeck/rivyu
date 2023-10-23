import { Router } from "express";
import { login, register } from "../controllers/users.controller";
import { validation } from "../middlewares";

const router = Router();

router.post("/register", validation.register, register);
router.post("/login", validation.login, login);

export default router;
