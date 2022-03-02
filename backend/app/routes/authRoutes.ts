import authController from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/sign-in", authController.signIn);

router.post("/sign-up", authController.signUp);

export default router;