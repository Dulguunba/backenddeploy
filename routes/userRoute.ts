import { Router } from "express";
import { createUser, getUser } from "../controllers/userController";

const userRouter = Router();
userRouter.route("/create").post(createUser);
userRouter.route("/get").get(getUser);

export default userRouter;
