import { Router } from "express";
import { getDestination, createDestination } from "../controllers/destinationControllers";

const destinationRouter = Router();
destinationRouter.route("/create").post(createDestination);
destinationRouter.route("/get").get(getDestination);

export default destinationRouter;
