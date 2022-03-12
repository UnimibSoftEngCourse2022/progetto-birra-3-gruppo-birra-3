import { prop } from "@typegoose/typegoose";
import IngredientClass from "./ingredientClass";
import UserClass from "./userClass";
import EquipmentProfileClass from "./equipmentProfileClass";

class RecipeClass {
  @prop({ ref: () => UserClass, required: true })
  public userId?: string;

  @prop({
    required: true,
    sparse: true,
  })
  public title?: string;

  @prop({ required: true })
  public color!: string;

  @prop({ required: false })
  public description?: string;

  @prop({ ref: () => IngredientClass, default: [], required: true })
  public ingredients?: IngredientClass[];

  @prop({ ref: () => EquipmentProfileClass, required: true })
  public equipmentProfileId?: string;
}

export default RecipeClass;