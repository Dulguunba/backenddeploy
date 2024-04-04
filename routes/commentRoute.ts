import { Router } from "express";
import { createComment, getComment } from "../controllers/commentController";

const commmentRouter = Router();
commmentRouter.route("/create").post(createComment);
commmentRouter.route("/get").get(getComment);

export default commmentRouter;
