import { Ingredient } from "./ingredientType";

export type Recipe = {
  _id: string;
  title: string;
  color: string;
  description: string;
  ingredients: Ingredient[];
};
