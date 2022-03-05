import { Router } from "express";
import IngredientController from "../controllers/ingredientController";
import { authMiddleware } from "../middleware/authMiddleware";

const ingredientRouter = Router();

ingredientRouter.post(
  "/add",
  [authMiddleware],
  IngredientController.addIngredient
);
ingredientRouter.put(
  "/update",
  [authMiddleware],
  IngredientController.updateIngredientQuantity
);
ingredientRouter.delete(
  "/remove",
  [authMiddleware],
  IngredientController.removeIngredient
);

export default ingredientRouter;
