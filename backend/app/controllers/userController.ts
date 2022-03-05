import { NextFunction, Response } from "express";
import RecipeClass from "../class/RecipeClass";
import { responseHandler } from "../handler/ResponseHandler";
import UserModel from "../models/userModel";
import { Ingredient } from "../types/IngredientType";

class UserController {
  private static userId: string = "";

  //ingredients

  static updateIngredientQuantity = async (
    res: Response,
    ingredient: Ingredient,
    next: NextFunction
  ) => {
    try {
      const updatedDocument = await UserModel.findOneAndUpdate(
        { id: this.userId },
        { $set: { "ingredients.$[igredient].quantity": ingredient.quantity } },
        {
          arrayFilters: [
            {
              "ingredient.name": ingredient.name,
              "ingredient.type": ingredient.type,
            },
          ],
        }
      );

      responseHandler(res, updatedDocument);
    } catch (err) {
      next(err);
    }
  };

  static addIngredient = async (
    res: Response,
    ingredient: Ingredient,
    next: NextFunction
  ) => {
    const userId = "";

    const conditions = {
      id: this.userId,
      "ingredients.name": { $ne: ingredient.name },
    };

    try {
      const addedIngr = await UserModel.findOneAndUpdate(
        conditions,
        {
          $addToSet: {
            ingredients: ingredient,
          },
        },
        {},
        (error, doc) => {
          if (error) {
            next(error);
          }
          if (doc === null) {
            responseHandler(res, null);
          }
        }
      );

      responseHandler(res, addedIngr);
    } catch (err) {
      next(err);
    }
  };

  static removeIngredient = async (
    res: Response,
    ingredient: Ingredient,
    next: NextFunction
  ) => {
    try {
      const removedIngredient = await UserModel.findOneAndUpdate(
        {
          id: this.userId,
        },
        { $pull: { ingredients: ingredient } }
      );

      responseHandler(res, removedIngredient);
    } catch (error) {
      next(error);
    }
  };

  //ID UTENTE MAI PASSATO. CE LO PESCHIAMO DA UN MIDDLEWARE. JWT LO SETTA DIRETTAMENTE.

  //RECIPES.

  static addRecipe = async (
    res: Response,
    recipe: RecipeClass,
    next: NextFunction
  ) => {
    const conditions = {
      id: this.userId,
    };
    try {
      const addedRecipe = await UserModel.findOneAndUpdate(conditions, {
        $push: {
          recipes: recipe,
        },
      });
      responseHandler(res, addedRecipe);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
