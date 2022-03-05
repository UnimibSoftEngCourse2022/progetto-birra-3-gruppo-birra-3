import { ErrorCode } from "./ErrorCode";

export class ErrorException extends Error {
    public status: any = null;
    public message: any = null;

    constructor(code: string = ErrorCode.UnknownError, message: any = null) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = code;
        this.status = 500;
        this.message = "";

        switch (code) {
            case ErrorCode.BadRequest:
                this.status = 400;
                this.message = "Attenzione! Richiesta non valida";
                break;
            case ErrorCode.Unauthenticated:
                this.status = 401;
                this.message = "Attenzione! Credenziali non valide";
                break;
            case ErrorCode.AsyncError:
                this.status = 400;
                break;
            case ErrorCode.NotFound:
                this.status = 404;
                break;
            default:
                this.status = 500;
                break;
        }
    }
}