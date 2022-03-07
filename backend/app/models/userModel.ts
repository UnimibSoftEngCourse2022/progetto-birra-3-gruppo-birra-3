import { getModelForClass } from "@typegoose/typegoose";
import { DB_COLLECTIONS_ENUM } from "../enums/dbEnums";
import UserClass from "../class/userClass";

const UserModel = getModelForClass(UserClass, {
  schemaOptions: {
    collection: DB_COLLECTIONS_ENUM.USERS,
    timestamps: true,
  },
});

export default UserModel;
