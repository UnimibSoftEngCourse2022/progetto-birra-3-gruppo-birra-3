import { INGREDIENTS_ENUM } from "../enums/ingredientEnums";

export type Ingredient = {
  name?: string;
  type?: INGREDIENTS_ENUM;
  quantity?: number;
};
