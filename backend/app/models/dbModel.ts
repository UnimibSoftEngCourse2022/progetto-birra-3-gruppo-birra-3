import mongoose from "mongoose";
import { url } from "../config/dbConfig";
import RecipeModel from "./recipeModel";
import UserModel from "./userModel";

type MongoDb = {
  mongoose: typeof mongoose;
  url: string;
  recipes: typeof RecipeModel;
  users: typeof UserModel;
};

mongoose.Promise = global.Promise;

const db: MongoDb = {
  url: url,
  mongoose: mongoose,
  recipes: RecipeModel,
  users: UserModel,
};

export default db;
