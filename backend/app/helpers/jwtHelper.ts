import jwt from "jsonwebtoken";
import { ErrorException } from "../errors/ErrorException";
import { ErrorCode } from "../errors/ErrorCode";
import config from "../config/authConfig";

export const generateAuthToken = (user: any | null): string | null => {
  let token = null;

  if (user) {
    token = jwt.sign({ _id: user._id, email: user.email }, config.jwtSecret, {
      expiresIn: "1h",
    });
  }

  return token;
};

export const verifyToken = (token: string): { _id: string; email: string } => {
  try {
    let tokenData = jwt.verify(token, config.jwtSecret);
    return tokenData as { _id: string; email: string };
  } catch (error) {
    throw new ErrorException(ErrorCode.Unauthenticated);
  }
};
