import { getModelForClass } from "@typegoose/typegoose";
import { DB_COLLECTIONS_ENUM } from "../enums/dbEnums";
import IngredientClass from "../class/ingredientClass";

const IngredientModel = getModelForClass(IngredientClass, {
  schemaOptions: {
    timestamps: true,
    collection: DB_COLLECTIONS_ENUM.INGREDIENTS,
  },
});

export default IngredientModel;
