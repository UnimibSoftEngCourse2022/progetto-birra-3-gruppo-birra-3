import mongoose from "mongoose";
import { url } from "../config/dbConfig";
import RecipeModel from "./recipeModel";
import UserModel from "./userModel";
import EquipmentProfileModel from "./equipmentProfileModel";
import EquipmentModel from "./equipmentModel";
import IngredientModel from "./ingredientModel";
import BrewingHistoryModel from "./brewingHistoryModel";

type MongoDb = {
  mongoose: typeof mongoose;
  url: string;
  equipments: typeof EquipmentModel;
  equipmentProfiles: typeof EquipmentProfileModel;
  ingredients: typeof IngredientModel;
  brewingHistory: typeof BrewingHistoryModel;
  recipes: typeof RecipeModel;
  users: typeof UserModel;
};

mongoose.Promise = global.Promise;

const dbModel: MongoDb = {
  url: url,
  mongoose: mongoose,
  equipments: EquipmentModel,
  equipmentProfiles: EquipmentProfileModel,
  ingredients: IngredientModel,
  brewingHistory: BrewingHistoryModel,
  recipes: RecipeModel,
  users: UserModel
};

export default dbModel;