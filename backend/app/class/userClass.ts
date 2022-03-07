import { prop } from "@typegoose/typegoose";
import IngredientClass from "./IngredientClass";
import RecipeClass from "./RecipeClass";
import brewingHistoryType from "../types/brewingHistoryType";

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

  @prop({ type: () => IngredientClass, default: [] })
  ingredients?: IngredientClass[];

  @prop({ type: () => RecipeClass, default: [] })
  recipes?: RecipeClass[];

  @prop({ default: [] })
  brewingHistory?: brewingHistoryType[];
}

export default UserClass;
