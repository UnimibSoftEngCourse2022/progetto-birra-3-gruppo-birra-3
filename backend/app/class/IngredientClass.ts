import { prop } from "@typegoose/typegoose";
import { INGREDIENTS_ENUM } from "../enums/IngredientEnums";

class IngredientClass {
  @prop({ required: true })
  name!: string;
  @prop({ enum: INGREDIENTS_ENUM })
  type?: INGREDIENTS_ENUM;
  @prop({ default: 0 })
  quantity?: number;
}

export default IngredientClass;
