import { NextFunction, Request, Response } from "express";
import UserClass from "../class/UserClass";
import { ErrorCode } from "../errors/errorCode";
import { ErrorException } from "../errors/errorException";
import { responseHandler } from "../handler/responseHandler";
import { tokenData } from "../helpers/jwtHelper";
import RecipeModel from "../models/recipeModel";
import UserModel from "../models/userModel";
import brewingHistoryType from "../types/brewingHistoryType";
import { Ingredient } from "../types/IngredientType";
import { Recipe } from "../types/recipeType";
import { IUser } from "../types/userType";

class RecipeController {
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let body: any = req.body;

      // Campi obbligatori tutti
      if (!body || !body.title || !body.color || !body.description) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      let recipe = await RecipeModel.create(body);

      if (!recipe) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      responseHandler(res, recipe);
    } catch (error) {
      next(error);
    }
  };

  static findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let title: string = req.query.title as string;

      let condition = title
        ? { title: { $regex: new RegExp(title.trim()), $options: "i" } }
        : {};

      let recipes = await RecipeModel.find(condition);

      if (!recipes) {
        // Errore perché mongo se non rispetta la condizione ritorna un array vuoto
        throw new ErrorException(ErrorCode.BadRequest);
      }

      responseHandler(res, recipes);
    } catch (error) {
      next(error);
    }
  };

  static findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let id: string = req.params.id as string;

      if (!id) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      let recipe = await RecipeModel.findById(id);

      if (!recipe) {
        // Errore perché mongo se non rispetta la condizione ritorna un array vuoto
        throw new ErrorException(ErrorCode.BadRequest);
      }

      responseHandler(res, recipe);
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let id: string = req.params.id as string;

      if (!id) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      let recipe = await RecipeModel.findByIdAndRemove(id, {
        useFindAndModify: false,
      });

      if (!recipe) {
        // Errore perché mongo se non rispetta la condizione ritorna un array vuoto
        throw new ErrorException(ErrorCode.BadRequest);
      }

      responseHandler(res, recipe);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let id: string = req.params.id as string;

      if (!id) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      let body: any = req.body;

      // Campi obbligatori tutti
      if (!body || !body.title || !body.color || !body.description) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      let recipe = await RecipeModel.findByIdAndUpdate(id, body, {
        useFindAndModify: false,
      });

      if (!recipe) {
        // Errore perché mongo se non rispetta la condizione ritorna un array vuoto
        throw new ErrorException(ErrorCode.BadRequest);
      }

      responseHandler(res, recipe);
    } catch (error) {
      next(error);
    }
  };

  static brewRecipe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tokenData: tokenData = req.token;

      const recipe: Recipe = req.body;
      //Recipe Ingreedients
      const recipeIngredients: Ingredient[] = recipe.ingredients;

      const brewingHistory: brewingHistoryType = {
        date: new Date(),
        recipeName: recipe.title,
      };

      recipeIngredients.forEach(async (ingredient) => {
        const updateArray = await UserModel.updateOne(
          { _id: tokenData._id },
          {
            $inc: {
              "ingredients.$[ingredient].quantity": -ingredient.quantity,
            },
          },
          {
            arrayFilters: [
              {
                "ingredient.name": ingredient.name,
                "ingredient.type": ingredient.type,
                "ingredient.quantity": { $gte: ingredient.quantity },
              },
            ],
          }
        );

        if (updateArray.modifiedCount === 0) {
          return res.status(409).send("Not Enough Materials");
        }
      });

      await UserModel.updateOne(
        { _id: tokenData._id },
        {
          $push: {
            brewingHistory: brewingHistory,
          },
        }
      );

      return responseHandler(res, brewingHistory);
    } catch (error) {
      next(error);
    }
  };
}

export default RecipeController;
