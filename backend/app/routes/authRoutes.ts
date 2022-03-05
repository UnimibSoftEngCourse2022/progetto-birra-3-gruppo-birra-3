import AuthController from "../controllers/AuthController";
import { Router } from "express";

const router = Router();

router.post("/sign-in", AuthController.signIn);

router.post("/sign-up", AuthController.signUp);

export default router;