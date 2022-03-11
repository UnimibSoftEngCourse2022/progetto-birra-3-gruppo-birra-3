import { INGREDIENTS_ENUM } from "../enums/ingredientEnums";

export type IngredientType = {
  name?: string;
  type?: INGREDIENTS_ENUM;
  quantity: number;
};
