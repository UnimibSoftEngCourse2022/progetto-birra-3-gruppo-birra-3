import mongoose from "mongoose";
import { url } from "../config/dbConfig";
import EquimentModel from "./equipmentModel";
import RecipeModel from "./recipeModel";
import UserModel from "./userModel";

type MongoDb = {
  mongoose: typeof mongoose;
  url: string;
  equipments: typeof EquimentModel;
  recipes: typeof RecipeModel;
  users: typeof UserModel;
};

mongoose.Promise = global.Promise;

const db: MongoDb = {
  url: url,
  mongoose: mongoose,
  equipments: EquimentModel,
  recipes: RecipeModel,
  users: UserModel,
};

export default db;
