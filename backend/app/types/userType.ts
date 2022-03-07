import brewingHistoryType from "./brewingHistoryType";
import { Ingredient } from "./IngredientType";
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
  brewingHistory?: brewingHistoryType[];
};
