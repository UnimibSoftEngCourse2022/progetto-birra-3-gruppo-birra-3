import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../errors/errorCode";
import { ErrorException } from "../errors/errorException";
import { responseHandler } from "../handler/responseHandler";
import { tokenData } from "../helpers/jwtHelper";
import { findUserById } from "../helpers/userHelper";
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

      const recipe = fetchRecipeById(id);

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
      // @ts-ignore
      const tokenData: tokenData = req.token;

      const recipeId: string = req.body;

      const recipe = await fetchRecipeById(recipeId);

      //Recipe Ingreedients
      const recipeIngredients: Ingredient[] = recipe.ingredients;

      const user: IUser = await findUserById(tokenData._id);

      const brewingHistory: brewingHistoryType = {
        date: new Date(),
        recipeName: recipe.title,
      };

      const canBrew = recipeIngredients.every((recipeIngredient) => {
        const canIngredientBeUsed = user.ingredients?.findIndex(
          (userIngredient) => {
            return (
              userIngredient.name === recipeIngredient.name &&
              userIngredient.type === recipeIngredient.type &&
              userIngredient.quantity >= recipeIngredient.quantity
            );
          }
        );
        return canIngredientBeUsed !== -1;
      });

      if (!canBrew) {
        return res.status(409).send({ error: "Ti mancano ingredienti" });
      }

      recipeIngredients.forEach(async (ingredient) => {
        await UserModel.updateOne(
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
              },
            ],
          }
        );
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

const fetchRecipeById = async (recipeId: string): Promise<Recipe> => {
  if (!recipeId) {
    throw new ErrorException(ErrorCode.BadRequest);
  }

  const recipe = await RecipeModel.findById(recipeId);

  if (!recipe) {
    throw new ErrorException(ErrorCode.BadRequest);
  }
  return recipe as unknown as Recipe;
};
