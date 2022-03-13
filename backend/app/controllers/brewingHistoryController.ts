import {NextFunction, Request, Response} from "express";
import {ErrorCode} from "../errors/errorCode";
import {ErrorException} from "../errors/errorException";
import {responseHandler} from "../handler/responseHandler";
import RecipeModel from "../models/recipeModel";
import {UserSession} from "../types/userSessionType";
import BrewingHistoryClass from "../class/brewingHistoryClass";
import BrewingHistoryModel from "../models/brewingHistoryModel";
import UserModel from "../models/userModel";
import IngredientModel from "../models/ingredientModel";
import IngredientClass from "../class/ingredientClass";

class BrewingHistoryController {
    static brewRecipe = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const _idRicetta: string = req.params.id;

            // @ts-ignore
            const userSession: UserSession = req.userSession;

            if (!_idRicetta) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            //FETCHING USER and populate ingredients.
            const user = await UserModel.findById(userSession._id).populate(
                "ingredients"
            )!;

            if (!user) {
                throw new ErrorException(ErrorCode.NotFound);
            }

            //Settings params to retrieve recipe to brew
            const _params = {
                //@ts-ignore
                userId: userSession._id,
                _id: _idRicetta,
            };

            const recipeToBrew = await RecipeModel.findOne(_params).populate(
                "ingredients"
            );

            if (!recipeToBrew) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const recipeToBrewIngr = recipeToBrew.ingredients!;

            // CHECKING IF CAN BREW RECIPE
            if (recipeToBrewIngr.length === 0) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const ingredientsToSubstractArray: IngredientClass[] = [];

            const canBrew = recipeToBrewIngr.every((recipeIngredient) => {
                const ingredientToUse = user.ingredients?.find((userIngredient) => {
                    return (
                        userIngredient.name === recipeIngredient.name &&
                        userIngredient.type === recipeIngredient.type &&
                        userIngredient.quantity! >= recipeIngredient.quantity!
                    );
                });

                if (ingredientToUse !== undefined) {
                    ingredientToUse.quantity = recipeIngredient.quantity!;

                    ingredientsToSubstractArray.push(ingredientToUse);
                }

                return !!ingredientToUse;
            });

            if (!canBrew) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            // REMOVING QUANTITY FROM USER INGRS
            for (const ingredientToSubstract of ingredientsToSubstractArray) {
                await IngredientModel.findOneAndUpdate(
                    // @ts-ignore
                    {_id: ingredientToSubstract._id},
                    {
                        $inc: {
                            quantity: -ingredientToSubstract.quantity!,
                        },
                    }
                );
            }

            const brewHistory: BrewingHistoryClass = new BrewingHistoryClass();
            brewHistory.userId = userSession._id;
            brewHistory.recipe = recipeToBrew._id;

            const result = await BrewingHistoryModel.create(brewHistory);

            if (!result) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            return responseHandler(res, recipeToBrew);
        } catch (error) {
            next(error);
        }
    };

    static findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const userSession: UserSession = req.userSession;

            let _params = {
                userId: userSession._id,
            };

            const result: any = await BrewingHistoryModel.find(_params).populate({
                path: 'recipe',
                populate: {
                    path: 'ingredients',
                }
            }).exec();

            if (!result) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const arrRes = result.filter((x: any) => x.recipe !== null).map((x: any) => {
                if (x.recipe) {
                    x.recipe.createdAt =  x.createdAt;

                    return x.recipe
                }
            });

            responseHandler(res, arrRes);
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

            const result = await BrewingHistoryModel.findOneAndDelete(_params, {
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
}

export default BrewingHistoryController;
