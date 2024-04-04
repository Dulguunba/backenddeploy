import { Router } from "express";
import { getDestinationCategory, createDestinationCategory } from "../controllers/destinationCategoryControllers";

const destinationCategoryRouter = Router();
destinationCategoryRouter.route("/create").post(createDestinationCategory);
destinationCategoryRouter.route("/get").get(getDestinationCategory);

export default destinationCategoryRouter;
