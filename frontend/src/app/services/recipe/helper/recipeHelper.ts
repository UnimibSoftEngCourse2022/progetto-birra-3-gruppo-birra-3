import { Ingredient } from 'src/app/models/ingredient/ingredient.model';

export const canBrewRecipe = (
  recipeIngredients: Ingredient[],
  userIngredients: Ingredient[]
) => {
  const hasEveryIngredient = recipeIngredients.every((recipeIngr) => {
    const findIngredient = userIngredients.find((userIngr) => {
      return (
        userIngr.name === recipeIngr.name &&
        userIngr.type === recipeIngr.type &&
        userIngr.quantity >= recipeIngr.quantity
      );
    });
    return !!findIngredient;
  });

  return hasEveryIngredient;
};
