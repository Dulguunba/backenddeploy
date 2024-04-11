import { Router } from "express";
import { createUser, deleteUser, getUser } from "../controllers/userController";

const userRouter = Router();
userRouter.route("/create").post(createUser);
userRouter.route("/get").get(getUser);
userRouter.route("/delete").delete(deleteUser)

export default userRouter;
