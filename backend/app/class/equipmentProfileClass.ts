import {prop} from "@typegoose/typegoose";
import EquipmentClass from "./equipmentClass";
import UserClass from "./userClass";

class EquipmentProfileClass {
    @prop({ref: () => UserClass, required: true})
    public userId?: string;

    @prop({required: true})
    public title?: string;

    @prop({ref: () => EquipmentClass, default: []})
    public equipments?: EquipmentClass[];
}

export default EquipmentProfileClass;