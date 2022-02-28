import { INGREDIENTS_ENUM } from "../enums/IngredientEnums";

export type ingredient = {
  name?: string;
  type?: INGREDIENTS_ENUM;
  quantity?: number;
};
