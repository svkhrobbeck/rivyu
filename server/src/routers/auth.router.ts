import { Router } from "express";
// initial
const router = Router();
// controllers
import { usersController } from "../controllers";
// middlewares
import { validation } from "../middlewares";
// destructured
const { login, register } = usersController;
// routes
router.post("/register", validation.register, register);
router.post("/login", validation.login, login);

export default router;
