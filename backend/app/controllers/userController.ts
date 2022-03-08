import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../handler/responseHandler";
import { tokenData } from "../helpers/jwtHelper";
import { findUserById } from "../helpers/userHelper";
import UserModel from "../models/userModel";
import brewingHistoryType from "../types/brewingHistoryType";
import { IUser } from "../types/userType";

class UserController {
  static getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenData: tokenData = req.token;
      const user = await findUserById(tokenData._id);

      return responseHandler(res, user);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
