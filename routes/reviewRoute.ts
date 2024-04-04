import { Router } from "express";
import { createReview, getReview } from "../controllers/reviewController";

const reviewRouter = Router();
reviewRouter.route("/create").post(createReview);
reviewRouter.route("/get").get(getReview);

export default reviewRouter;
