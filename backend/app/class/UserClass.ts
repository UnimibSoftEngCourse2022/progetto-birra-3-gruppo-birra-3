import { prop, Ref } from "@typegoose/typegoose";
import { isEmail } from "../utils/validationUtils";
import IngredientClass from "./IngredientClass";
import RecipeClass from "./RecipeClass";

class UserClass {
  @prop({
    required: true, lowercase: true, index: true, unique: true, validate: {
      validator: (val: string) => isEmail(val),
      message: `{VALUE} is not a valid email`
    }
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

  @prop({ ref: () => IngredientClass, type: () => IngredientClass, default: [] })
  ingredients?: Ref<IngredientClass>[];

  @prop({ type: () => RecipeClass, default: [] })
  recipes?: RecipeClass[];
}

export default UserClass;
