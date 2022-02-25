import * as recipes from "../controllers/recipeController";
import express from "express";

const recipeRouter = express.Router();

recipeRouter.post("/", recipes.create);

//   // // Retrieve all recipes
recipeRouter.get("/", recipes.findAllRecipes);

//   // // Retrieve all published recipes
recipeRouter.get("/published", recipes.findAllPublished);

//   // // Retrieve a single recipes with id
recipeRouter.get("/:id", recipes.findOneRecipe);

//   // // Update a recipes with id
recipeRouter.put("/:id", recipes.updateRecipe);

//   // // Delete a recipes with id
recipeRouter.delete("/:id", recipes.deleteRecipe);

//   // // Create a new recipes
recipeRouter.delete("/", recipes.deleteAll);

export { recipeRouter };
