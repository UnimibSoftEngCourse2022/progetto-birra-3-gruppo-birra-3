import { NextFunction, Response, Request } from "express";
import RecipeClass from "../class/RecipeClass";
import { responseHandler } from "../handler/responseHandler";
import { tokenData } from "../helpers/jwtHelper";
import UserModel from "../models/userModel";
import { Ingredient } from "../types/ingredientType";

class UserController {
  static getUser = async (req: Request, res: Response, next: NextFunction) => {
    const tokenData: tokenData = req.token;

    try {
      const user = await UserModel.findOne({ _id: tokenData._id });

      responseHandler(res, user);
    } catch (err) {
      next(err);
    }
  };

  //ingredients

  static updateIngredientQuantity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tokenData: tokenData = req.token;
      const ingredient: Ingredient = req.body.ingredient;

      const updatedDocument = await UserModel.findOneAndUpdate(
        { _id: tokenData._id },
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
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const tokenData: tokenData = req.token;
    const ingredient: Ingredient = req.body.ingredient;

    const conditions = {
      _id: tokenData._id,
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
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const tokenData: tokenData = req.token;
    const ingredient: Ingredient = req.body.ingredient;

    try {
      const removedIngredient = await UserModel.findOneAndUpdate(
        {
          id: tokenData._id,
        },
        { $pull: { ingredients: ingredient } }
      );

      responseHandler(res, removedIngredient);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
