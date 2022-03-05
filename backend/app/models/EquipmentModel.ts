import { getModelForClass } from "@typegoose/typegoose";
import EquipmentClass from "../class/EquipmentClass";
import { DB_COLLECTIONS_ENUM } from "../enums/dbEnums";

const EquimentModel = getModelForClass(EquipmentClass, {
  schemaOptions: { timestamps: true, collection: DB_COLLECTIONS_ENUM.EQUIPMENTS },
});

export default EquimentModel;
