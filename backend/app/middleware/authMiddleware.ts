import {ErrorCode} from '../errors/errorCode';
import {ErrorException} from '../errors/errorException';
import {verifyToken} from '../helpers/jwtHelper';
import {NextFunction, Request, Response} from "express";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const auth = req.headers.authorization;
        if (auth && auth.startsWith("Bearer")) {
            const token = auth.slice(7);

            try {
                // @ts-ignore
                req.userSession = verifyToken(token);
                next();
            } catch (error) {
                throw new ErrorException(ErrorCode.Unauthenticated);
            }
        } else {
            throw new ErrorException(ErrorCode.Unauthenticated);
        }
    } catch (error: any) {
        throw new ErrorException(ErrorCode.Unauthenticated, error.message);
    }
};
