import { ErrorCode } from "../errors/errorCode";
import { ErrorException } from "../errors/errorException";
import RecipeModel from "../models/recipeModel";
import { Recipe } from "../types/recipeType";

export const fetchRecipeById = async (recipeId: string): Promise<Recipe> => {
  if (!recipeId) {
    throw new ErrorException(ErrorCode.BadRequest);
  }

  const recipe = await RecipeModel.findById(recipeId);

  if (!recipe) {
    throw new ErrorException(ErrorCode.BadRequest);
  }
  return recipe as unknown as Recipe;
};
