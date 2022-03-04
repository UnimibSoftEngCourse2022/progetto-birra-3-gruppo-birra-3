import jwt from "jsonwebtoken";
import { ErrorException } from "../errors/errorException";
import { ErrorCode } from "../errors/errorCode";
import config from "../config/authConfig";
export type tokenData = {
  _id: string;
  email: string;
};
export const generateAuthToken = (user: any | null): string | null => {
  let token = null;

  if (user) {
    token = jwt.sign({ _id: user._id, email: user.email }, config.jwtSecret, {
      expiresIn: "1h",
    });
  }

  return token;
};

export const verifyToken = (token: string): tokenData => {
  try {
    let tokenData = jwt.verify(token, config.jwtSecret);
    return tokenData as tokenData;
  } catch (error) {
    throw new ErrorException(ErrorCode.Unauthenticated);
  }
};
