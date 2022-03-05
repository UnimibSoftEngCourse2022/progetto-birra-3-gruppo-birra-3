import { prop } from "@typegoose/typegoose";

class EquipmentClass {
  @prop({ required: true, unique: true, index: true })
  public title!: string;
}
export default EquipmentClass;
