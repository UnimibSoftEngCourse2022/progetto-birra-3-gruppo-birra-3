import {NextFunction, Request, Response} from "express";
import {ErrorCode} from "../errors/errorCode";
import {ErrorException} from "../errors/errorException";
import {responseHandler} from "../handler/responseHandler";
import RecipeModel from "../models/recipeModel";
import {IngredientType} from "../types/ingredientType";
import {UserSession} from "../types/userSessionType";
import IngredientModel from "../models/ingredientModel";
import RecipeClass from "../class/recipeClass";
import {getParamsForLike} from "../utils/mongoDBUtils";

class RecipeController {
    static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let body: { title: string, description: string, color: string, equipmentId: string, ingredients: IngredientType[] } = req.body;

            // @ts-ignore
            const userSession: UserSession = req.userSession;

            if (!body) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            // TODO Fixare la validazione dei dati in body

            if (!body.ingredients) {
                body.ingredients = [];
            }

            if (!body.equipmentId) {
                body.equipmentId = "1";
            }

            const ingredients = await IngredientModel.insertMany(body.ingredients);

            if (!ingredients) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            let recipe: RecipeClass = new RecipeClass();
            recipe.title = body.title;
            recipe.color = body.color;
            recipe.description = body.description;
            recipe.userId = userSession._id;

            // Recupero gli id della Equipments appena creati
            recipe.ingredients = ingredients.map(x => x._id);

            const recipeCreated = await RecipeModel.create(recipe);

            if (!recipeCreated) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            responseHandler(res, recipe);
        } catch (error) {
            next(error);
        }
    };

    static findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: any = req.query as any;
            //@ts-ignore
            const userSession: UserSession = req.userSession;

            let _params = {
                ...{
                    userId: userSession._id
                },
                ...getParamsForLike(query)
            };

            const result = await RecipeModel.find(_params).populate("ingredients").exec();

            if (!result) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            responseHandler(res, result);
        } catch (error) {
            next(error);
        }
    };

    static findOne = async (req: Request, res: Response, next: NextFunction) => {
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

            const result = await RecipeModel.findOne(_params).populate("ingredients");

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

            const result = await RecipeModel.findOneAndDelete(_params, {
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

    static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;

            if (!id) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const body: any = req.body;

            // Campi obbligatori tutti
            if (!body || !body.title || !body.color || !body.description) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            const _params = {
                //@ts-ignore
                userId: req.userSession._id,
                _id: id
            };

            let recipe = await RecipeModel.findOneAndUpdate(_params, body, {
                useFindAndModify: false,
            });

            if (!recipe) {
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
            const userSession: UserSession = req.userSession;

            const id: string = req.params.id;

            const _params = {
                //@ts-ignore
                userId: req.userSession._id,
                _id: id
            };

            let recipe = await RecipeModel.findOne(_params).populate("ingredients");

            if (!recipe) {
                throw new ErrorException(ErrorCode.BadRequest);
            }

            /**
             * TODO Controllo se posso produrre la birra, dagli ingredienti dell'utente
             * Se può allora salvo in historyBrew il ref della ricetta
             * */

            return responseHandler(res, {});
        } catch (error) {
            next(error);
        }
    };
}

export default RecipeController;