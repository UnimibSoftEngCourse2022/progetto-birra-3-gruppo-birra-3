import {NextFunction, Request, Response} from "express";
import { responseHandler } from "../handler/responseHandler";
import {UserSession} from "../types/userSessionType";
import {ErrorException} from "../errors/errorException";
import {ErrorCode} from "../errors/errorCode";
import IngredientModel from "../models/ingredientModel";

class UserController {
  static update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: { firstname: string, surname: string } = req.body;

      // @ts-ignore
      const userSession: UserSession = req.userSession;

      if (!body) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      const _params = {
        _id: userSession._id,
      };

      let result = await IngredientModel.findOneAndUpdate(_params, body, {
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

export default UserController;
