import { Router } from "express";
import { httpLogin } from "../controllers/authController";
import { validateLogin } from "../middlewares/validations";

export const authRouter = Router();

authRouter.post("/login", validateLogin, httpLogin);
