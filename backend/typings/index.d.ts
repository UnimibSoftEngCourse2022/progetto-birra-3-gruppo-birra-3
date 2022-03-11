import {UserSession} from "../app/types/userSessionType";

declare namespace Express {
    export interface Request{
        userSession: UserSession;
    }
}