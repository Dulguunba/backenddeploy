import { Router } from "express";
import { createTravel, getTravel } from "../controllers/travelController";

const travelRouter = Router();
travelRouter.route("/create").post(createTravel);
travelRouter.route("/get").get(getTravel);

export { travelRouter };
