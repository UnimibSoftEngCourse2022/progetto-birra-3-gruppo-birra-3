import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../errors/errorCode";
import { ErrorException } from "../errors/errorException";
import { responseHandler } from "../handler/responseHandler";
import RecipeModel from "../models/recipeModel";
import {UserSession} from "../types/userSessionType";
import BrewingHistoryClass from "../class/brewingHistoryClass";
import BrewingHistoryModel from "../models/brewingHistoryModel";

class BrewingHistoryController {
    static brewRecipe = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;

            // @ts-ignore
            const userSession: UserSession = req.userSession;

            if (!id) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const _params = {
                //@ts-ignore
                userId: req.userSession._id,
                _id: id
            };

            const recipe = await RecipeModel.findOne(_params).populate("ingredients");

            if (!recipe) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            /**
             * TODO Controllo se posso produrre la birra, dagli ingredienti dell'utente
             * Se può allora salvo in historyBrew il ref della ricetta
             * */

            let brewHistory: BrewingHistoryClass = new BrewingHistoryClass();
            brewHistory.userId = userSession._id;
            brewHistory.recipe = recipe._id;

            const result = await BrewingHistoryModel.create(brewHistory);

            if (!result) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            responseHandler(res, recipe);
        } catch (error) {
            next(error);
        }
    };

    static findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const userSession: UserSession = req.userSession;

            let _params = {
                userId: userSession._id
            };

            const result = await BrewingHistoryModel.find(_params).populate("recipe").exec();

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
                _id: id
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