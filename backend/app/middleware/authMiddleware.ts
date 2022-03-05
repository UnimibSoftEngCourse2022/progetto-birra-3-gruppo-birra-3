import { Request, Response, NextFunction } from 'express';
import { ErrorCode } from '../errors/errorCode';
import { ErrorException } from '../errors/errorException';
import { verifyToken } from '../helpers/jwtHelper';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.headers.authorization;
        if (auth && auth.startsWith('Bearer')) {
            const token = auth.slice(7);

            try {
                const tokenData = verifyToken(token);
                req.body.tokenData = tokenData;
                next();
            } catch (error) {
                next(new ErrorException(ErrorCode.Unauthenticated));
            }
        } else {
            next(new ErrorException(ErrorCode.Unauthenticated));
        }
    } catch (error: any) {
        next(new ErrorException(ErrorCode.Unauthenticated, error.message));
    }
};
