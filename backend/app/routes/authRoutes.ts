import AuthController from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/sign-in", AuthController.signIn);

router.post("/sign-up", AuthController.signUp);

export default router;
