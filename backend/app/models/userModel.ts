import { getModelForClass } from "@typegoose/typegoose";
import UserClass from "../class/userClass";
import { DB_COLLECTIONS_ENUM } from "../enums/dbEnums";

const UserModel = getModelForClass(UserClass, {
  schemaOptions: {
    collection: DB_COLLECTIONS_ENUM.USERS,
    timestamps: true,
  },
});

export default UserModel;
