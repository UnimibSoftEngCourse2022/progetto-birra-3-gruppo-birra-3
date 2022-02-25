// const dbConfig = require("../config/db.config.js");
import mongoose, { Mongoose } from "mongoose";
import { url } from "../config/dbConfig";
import { RecipeModel } from "../models/recipeModel";

type MongoDb = {
  mongoose: typeof mongoose;
  url: string;
  recipes: typeof RecipeModel;
};

mongoose.Promise = global.Promise;

const db: MongoDb = {
  url: url,
  mongoose: mongoose,
  recipes: RecipeModel,
};

export default db;
