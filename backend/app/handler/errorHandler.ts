import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '../errors/errorCode';
import { ErrorException } from '../errors/errorException';
import { ErrorModel } from '../errors/errorModel';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ErrorException) {
        res.status(err.status).send(err);
    } else {
        // TODO Aggiungere logger Email all'admin per gestire le eccezzioni mancanti
        res.status(500).send({ code: ErrorCode.UnknownError, status: 500 } as ErrorModel);
    }
};