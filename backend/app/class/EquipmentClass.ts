import { prop } from "@typegoose/typegoose";
import { UNIT_OF_MEASUREMENT_ENUM } from "../enums/unitEnums";

class EquipmentClass {
  @prop({ required: true })
  public name?: string;

  @prop({ enum: UNIT_OF_MEASUREMENT_ENUM })
  public unit?: UNIT_OF_MEASUREMENT_ENUM;

  @prop({ default: 0 })
  public quantity?: number;
}

export default EquipmentClass;
