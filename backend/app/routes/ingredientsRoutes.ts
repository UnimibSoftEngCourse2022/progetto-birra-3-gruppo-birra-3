import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import IngredientController from "../controllers/ingredientController";

const ingredientsRoutes = Router();

ingredientsRoutes.post(
  "/add-to-user",
  [authMiddleware],
  IngredientController.addIngredientToUser
);

ingredientsRoutes.post(
  "/add-to-recipe",
  [authMiddleware],
  IngredientController.addIngredientToRecipe
);

ingredientsRoutes.get("/", [authMiddleware], IngredientController.findAll);

ingredientsRoutes.put("/:id", [authMiddleware], IngredientController.update);

ingredientsRoutes.delete("/:id", [authMiddleware], IngredientController.delete);

export default ingredientsRoutes;
