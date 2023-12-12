import { Router } from "express";
import { usersController } from "../controllers";
import { validation } from "../middlewares";
const { login, register } = usersController;

const router = Router();

router.post("/register", validation.register, register);
router.post("/login", validation.login, login);

export default router;
