import { Ingredient } from "./ingredientType";
import { Recipe } from "./recipeType";
export type IUser = {
  _id: string;
  email: string;
  password: string;
  firstname: string;
  surname: string;
  token: string;
  ingredients?: Ingredient[];
  recipes?: Recipe[];
};
