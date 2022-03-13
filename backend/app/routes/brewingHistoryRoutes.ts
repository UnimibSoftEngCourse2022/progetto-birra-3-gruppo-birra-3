import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import BrewingHistoryController from "../controllers/brewingHistoryController";

const brewingHistoryRoutes = Router();

brewingHistoryRoutes.get("/", [authMiddleware], BrewingHistoryController.findAll);

brewingHistoryRoutes.delete("/:id", [authMiddleware], BrewingHistoryController.delete);

brewingHistoryRoutes.get(
  "/brew-recipe/:id",
  [authMiddleware],
  BrewingHistoryController.brewRecipe
);

export default brewingHistoryRoutes;