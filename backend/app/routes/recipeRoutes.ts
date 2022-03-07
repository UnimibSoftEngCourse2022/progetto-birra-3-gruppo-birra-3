import recipeController from "../controllers/recipeController";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", [authMiddleware], recipeController.create);

router.get("/", [authMiddleware], recipeController.findAll);

router.get("/:id", [authMiddleware], recipeController.findOne);

router.put("/:id", [authMiddleware], recipeController.update);

router.delete("/:id", [authMiddleware], recipeController.delete);

router.post("/brewRecipe", [authMiddleware], recipeController.brewRecipe);

export default router;
