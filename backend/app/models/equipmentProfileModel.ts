import { getModelForClass } from "@typegoose/typegoose";
import { DB_COLLECTIONS_ENUM } from "../enums/dbEnums";
import EquipmentProfileClass from "../class/equipmentProfileClass";

const EquipmentProfileModel = getModelForClass(EquipmentProfileClass, {
  schemaOptions: {
    timestamps: true,
    collection: DB_COLLECTIONS_ENUM.EQUIPMENT_PROFILES,
  },
});

export default EquipmentProfileModel;