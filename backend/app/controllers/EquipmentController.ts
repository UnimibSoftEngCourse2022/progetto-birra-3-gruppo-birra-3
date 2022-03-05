import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../errors/errorCode";
import { ErrorException } from "../errors/errorException";
import { responseHandler } from "../handler/responseHandler";
import EquipmentModel from "../models/EquipmentModel";

class EquipmentController {
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let body: any = req.body;

      if (!body || !body.title) {
        throw new ErrorException(ErrorCode.BadRequest);
      }

      let recipe = await EquipmentModel.create(body);

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

      let recipes = await EquipmentModel.find(condition);

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

      let recipe = await EquipmentModel.findById(id);

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

      let recipe = await EquipmentModel.findByIdAndRemove(id, {
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

      let recipe = await EquipmentModel.findByIdAndUpdate(id, body, {
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
}

export default EquipmentController;
