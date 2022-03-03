import { INGREDIENTS_ENUM } from "../enums/IngredientEnums";

export type Ingredient = {
  name?: string;
  type?: INGREDIENTS_ENUM;
  quantity?: number;
};
