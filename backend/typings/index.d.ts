declare namespace Express {
    type tokenData = {
        _id: string;
        email: string;
    };

    export interface Request {
        token: tokenData;
    }
}