import {getModelForClass} from "@typegoose/typegoose";
import {DB_COLLECTIONS_ENUM} from "../enums/dbEnums";
import EquipmentClass from "../class/equipmentClass";

const EquipmentModel = getModelForClass(EquipmentClass, {
    schemaOptions: {
        timestamps: true,
        collection: DB_COLLECTIONS_ENUM.EQUIPMENTS,
    },
});

export default EquipmentModel;