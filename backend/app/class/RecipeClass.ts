import { prop } from "@typegoose/typegoose";
import IngredientClass from "./IngredientClass";

class RecipeClass {
  @prop({ required: true, unique: true, index: true })
  public title!: string;
  @prop({ required: true })
  public color!: string;
  @prop({ required: true })
  public description!: string;
  @prop({ type: () => IngredientClass, required: true })
  public ingredients!: IngredientClass[];
}
export default RecipeClass;