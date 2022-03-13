import recipeController from "../controllers/recipeController";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const recipeRoutes = Router();

recipeRoutes.post("/", [authMiddleware], recipeController.create);

recipeRoutes.get("/", [authMiddleware], recipeController.findAll);

recipeRoutes.get("/:id", [authMiddleware], recipeController.findOne);

recipeRoutes.put("/:id", [authMiddleware], recipeController.update);

recipeRoutes.delete("/:id", [authMiddleware], recipeController.delete);

export default recipeRoutes;
