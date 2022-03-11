import { getModelForClass } from "@typegoose/typegoose";
import { DB_COLLECTIONS_ENUM } from "../enums/dbEnums";
import BrewingHistoryClass from "../class/brewingHistoryClass";

const BrewingHistoryModel = getModelForClass(BrewingHistoryClass, {
  schemaOptions: {
    timestamps: true,
    collection: DB_COLLECTIONS_ENUM.BREWING_HISTORY,
  },
});

export default BrewingHistoryModel;