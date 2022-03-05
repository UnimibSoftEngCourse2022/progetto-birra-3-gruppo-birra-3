import { Router } from "express";
import IngredientController from "../controllers/ingredientController";
import { authMiddleware } from "../middleware/authMiddleware";

const ingredientRouter = Router();

ingredientRouter.post(
  "/ingredient",
  [authMiddleware],
  IngredientController.addIngredient
);
ingredientRouter.put(
  "/ingredient",
  [authMiddleware],
  IngredientController.updateIngredientQuantity
);
ingredientRouter.delete(
  "/ingredient",
  [authMiddleware],
  IngredientController.removeIngredient
);

export default ingredientRouter;
