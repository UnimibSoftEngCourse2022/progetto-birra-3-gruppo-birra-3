import { NextFunction, Response, Request } from "express";
import { responseHandler } from "../handler/responseHandler";
import UserModel from "../models/userModel";
import { IngredientType } from "../types/ingredientType";
import { UserSession } from "../types/userSessionType";
import { ErrorException } from "../errors/errorException";
import { ErrorCode } from "../errors/errorCode";
import IngredientModel from "../models/ingredientModel";
import RecipeModel from "../models/recipeModel";
import UserClass from "../class/userClass";

class IngredientController {
  static update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      if (!id) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      const ingredient: IngredientType = req.body;

      // Campi obbligatori tutti
      if (
        !ingredient ||
        !ingredient.name ||
        !ingredient.type ||
        !ingredient.quantity
      ) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      const _params = {
        //@ts-ignore
        userId: req.userSession._id,
        _id: id,
      };

      let result = await IngredientModel.findOneAndUpdate(_params, ingredient, {
        useFindAndModify: false,
      });

      if (!result) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      responseHandler(res, result);
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      if (!id) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      const _params = {
        //@ts-ignore
        userId: req.userSession._id,
        _id: id,
      };

      const result = await IngredientModel.findOneAndDelete(_params, {
        useFindAndModify: false,
      });

      if (!result) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      responseHandler(res, result);
    } catch (error) {
      next(error);
    }
  };

  static addIngredientToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ingredient: IngredientType = req.body;
      // @ts-ignore
      const userSession: UserSession = req.userSession;

      if (
        !ingredient ||
        !ingredient.name ||
        !ingredient.type ||
        !ingredient.quantity
      ) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      try {
        //findOne
        const user = (await UserModel.findById(userSession._id).populate({
          path: "ingredients",
        })) as UserClass;

        const userIngredients = user.ingredients!;

        const hasUserIngredientAlready = userIngredients!.find(
          (ingr) => ingr.name === ingredient.name
        );

        if (hasUserIngredientAlready) {
          return responseHandler(res, {});
        }
        const newIngredient = await IngredientModel.create(ingredient);

        await UserModel.updateOne(
          {
            _id: userSession._id,
          },
          {
            $push: {
              ingredients: newIngredient._id,
            },
          }
        );

        return responseHandler(res, newIngredient);
      } catch (err) {
        next(err);
      }
    } catch (error) {
      next(error);
    }
  };

  static addIngredientToRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body: { recipeId: string; ingredient: IngredientType } = req.body;
      // @ts-ignore
      const userSession: UserSession = req.userSession;

      if (
        !body ||
        !body.recipeId ||
        !body.ingredient.name ||
        !body.ingredient.type ||
        !body.ingredient.quantity
      ) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      const newIngredient = await IngredientModel.create(body.ingredient);

      try {
        await RecipeModel.updateOne(
          {
            _id: userSession._id,
          },
          {
            $push: {
              ingredients: newIngredient._id,
            },
          }
        );

        return responseHandler(res, newIngredient);
      } catch (err) {
        next(err);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default IngredientController;
