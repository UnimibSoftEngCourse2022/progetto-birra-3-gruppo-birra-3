import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import IngredientController from "../controllers/ingredientController";

const router = Router();

router.post(
  "/add-to-user",
  [authMiddleware],
  IngredientController.addIngredientToUser
);

router.post(
  "/add-to-recipe",
  [authMiddleware],
  IngredientController.addIngredientToRecipe
);

router.put("/:id", [authMiddleware], IngredientController.update);

router.delete("/:id", [authMiddleware], IngredientController.delete);

export default router;
