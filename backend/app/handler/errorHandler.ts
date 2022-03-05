import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '../errors/ErrorCode';
import { ErrorException } from '../errors/ErrorException';
import { ErrorModel } from '../errors/ErrorModel';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorException) {
        res.status(err.status).send(err);
    } else {
        // TODO Aggiungere logger Email all'admin per gestire le eccezzioni mancanti
        res.status(500).send({ code: ErrorCode.UnknownError, status: 500 } as ErrorModel);
    }
};