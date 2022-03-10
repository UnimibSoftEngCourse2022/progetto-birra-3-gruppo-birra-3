import { Ingredient } from 'src/app/models/ingredient/ingredient.model';

export const canBrewRecipe = (
  recipeIngredients: Ingredient[],
  userIngredients: Ingredient[]
) => {
  const hasEveryIngredient = recipeIngredients.every((recipeIngr) => {
    const isAmountPresent = userIngredients.findIndex((userIngr) => {
      userIngr.name === recipeIngr.name &&
        userIngr.type === recipeIngr.type &&
        userIngr.quantity! >= recipeIngr.quantity!;
    });
    return isAmountPresent !== -1;
  });
  return hasEveryIngredient;
};
