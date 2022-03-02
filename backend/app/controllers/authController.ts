import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../errors/errorCode";
import { ErrorException } from "../errors/errorException";
import { generateAuthToken } from "../helpers/jwtHelper";
import { responseHandler } from "../handler/responseHandler";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import UserModel from "../models/userModel";

class AuthController {
  static signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userBody: { email: string; password: string } = req.body;

      // check if user exists
      let userExists = await UserModel.findOne({ email: userBody.email });

      if (!userExists) {
        throw new ErrorException(ErrorCode.NotFound);
      }

      // validate the password
      let validPassword = comparePassword(
        userBody.password,
        userExists!.password
      );

      if (!validPassword) {
        throw new ErrorException(ErrorCode.NotFound);
      }

      let token = generateAuthToken(userExists);

      if (!token) {
        throw new ErrorException(ErrorCode.NotFound);
      }

      userExists.token = token;

      responseHandler(res, userExists);
    } catch (error) {
      next(error);
    }
  };

  static signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let userBody: {
        email: string;
        firstname: string;
        surname: string;
        password: string;
      } = req.body;

      // Campi obbligatori tutti
      if (
        !userBody ||
        !userBody.email ||
        !userBody.firstname ||
        !userBody.surname ||
        !userBody.password
      ) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      // Controllo che non esista un utente con la stessa email
      let checkUserExist = await UserModel.findOne({ email: userBody.email });

      if (checkUserExist) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      userBody.password = hashPassword(userBody.password);


      let userCreate = await UserModel.create({ email: userBody.email, firstname: userBody.firstname, surname: userBody.surname, password: userBody.password });

      if (!userCreate) {
        throw new ErrorException(ErrorCode.NotFound);
      }

      let token = generateAuthToken(userCreate);

      if (!token) {
        throw new ErrorException(ErrorCode.NotFound);
      }

      userCreate.token = token;

      responseHandler(res, userCreate);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
