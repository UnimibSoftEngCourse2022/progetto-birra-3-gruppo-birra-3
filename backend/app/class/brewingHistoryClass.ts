import {prop} from "@typegoose/typegoose";
import UserClass from "./userClass";
import RecipeClass from "./recipeClass";

class BrewingHistoryClass {
    @prop({ref: () => UserClass, required: true})
    public userId?: string;

    @prop({ref: () => RecipeClass, required: true})
    public recipe?: RecipeClass;
}

export default BrewingHistoryClass;