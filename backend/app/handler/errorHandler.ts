import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '../errors/errorCode';
import { ErrorException } from '../errors/errorException';
import { ErrorModel } from '../errors/errorModel';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorException) {
    res.status(err.status).json(err);
  } else {
    res
      .status(500)
      .send({ code: ErrorCode.UnknownError, status: 500 } as ErrorModel);
  }
};
