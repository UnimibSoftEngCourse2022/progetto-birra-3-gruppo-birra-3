import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import BrewingHistoryController from "../controllers/brewingHistoryController";

const router = Router();

router.get("/", [authMiddleware], BrewingHistoryController.findAll);

router.delete("/:id", [authMiddleware], BrewingHistoryController.delete);

router.post(
  "/brew-recipe/:id",
  [authMiddleware],
  BrewingHistoryController.brewRecipe
);

export default router;
