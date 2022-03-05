import { NextFunction, Response, Request } from "express";
import { responseHandler } from "../handler/responseHandler";
import { tokenData } from "../helpers/jwtHelper";
import UserModel from "../models/userModel";
import { Ingredient } from "../types/IngredientType";

class IngredientController {
  //ingredients

  static updateIngredientQuantity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tokenData: tokenData = req.token;
      const ingredient: Ingredient = req.body;

      await UserModel.updateOne(
        { _id: tokenData._id },
        { $set: { "ingredients.$[ingredient].quantity": ingredient.quantity } },
        {
          arrayFilters: [
            {
              "ingredient.name": ingredient.name,
              "ingredient.type": ingredient.type,
            },
          ],
        }
      );

      responseHandler(res, ingredient);
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
    const ingredient: Ingredient = req.body;

    const usersWithIngredients = await UserModel.find({
      ingredients: {
        $elemMatch: {
          name: ingredient.name,
        },
      },
    });

    const isAlreadyInArray =
      usersWithIngredients.findIndex((value) => {
        return value.email === tokenData.email;
      }) !== -1;

    if (!isAlreadyInArray) {
      try {
        await UserModel.updateOne(
          {
            _id: tokenData._id,
          },
          {
            $addToSet: {
              ingredients: ingredient,
            },
          }
        );
        responseHandler(res, ingredient);
      } catch (err) {
        next(err);
      }
      return;
    }

    responseHandler(res, {});
  };

  static removeIngredient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const tokenData: tokenData = req.token;
    const ingredient: Ingredient = req.body;

    try {
      const removedIngredient = await UserModel.updateOne(
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

export default IngredientController;
