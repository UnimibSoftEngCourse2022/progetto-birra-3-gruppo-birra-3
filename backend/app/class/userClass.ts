import { prop } from "@typegoose/typegoose";
import IngredientClass from "./ingredientClass";
import RecipeClass from "./recipeClass";
import EquipmentProfileClass from "./equipmentProfileClass";
import BrewingHistoryClass from "./brewingHistoryClass";

class UserClass {
  @prop({
    required: true,
    lowercase: true,
    index: true,
    unique: true,
  })
  email!: string;

  @prop({ required: true })
  firstname!: string;

  @prop({ required: true })
  surname!: string;

  @prop({ required: true })
  password!: string;

  @prop({ required: false })
  token?: string;

  // TODO Vedere caricamento inverso
  @prop({ ref: () => EquipmentProfileClass, default: [] })
  public equipmentProfiles?: EquipmentProfileClass[];

  @prop({ ref: () => IngredientClass, default: [] })
  public ingredients?: IngredientClass[];

  @prop({ ref: () => RecipeClass, default: [] })
  public recipes?: RecipeClass[];

  @prop({ ref: () => BrewingHistoryClass, default: [] })
  public brewingHistory?: BrewingHistoryClass[];
}

export default UserClass;
