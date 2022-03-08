import UserModel from "../models/userModel";
import { IUser } from "../types/userType";

export const findUserById = async (userId: string): Promise<IUser> => {
  const user = await UserModel.findById(userId);

  return user as unknown as IUser;
};
