import { Router } from "express";
import UserController from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.get("/", [authMiddleware], UserController.getUser);
userRouter.post("/ingredient", [authMiddleware], UserController.addIngredient);
userRouter.put(
  "/ingredient",
  [authMiddleware],
  UserController.updateIngredientQuantity
);
userRouter.delete(
  "/igrendient",
  [authMiddleware],
  UserController.removeIngredient
);

export default userRouter;
