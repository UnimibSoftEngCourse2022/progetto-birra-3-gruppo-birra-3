import AuthController from "../controllers/authController";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/sign-in", AuthController.signIn);

authRoutes.post("/sign-up", AuthController.signUp);

export default authRoutes;
