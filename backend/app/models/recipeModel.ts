import { getModelForClass } from "@typegoose/typegoose";
import RecipeClass from "../class/RecipeClass";
import { DB_COLLECTIONS_ENUM } from "../enums/dbEnums";

const RecipeModel = getModelForClass(RecipeClass, {
  schemaOptions: { timestamps: true, collection: DB_COLLECTIONS_ENUM.RECIPES },
});

export default RecipeModel;
