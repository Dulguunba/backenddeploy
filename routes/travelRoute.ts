import { Router } from "express";
import {
  createTravel,
  deleteTravel,
  getNumberTravelLastWeek,
  getNumberofTravel,
  getTravel,
  getTravelAllPagination,
  getTravelByDestination,
  getTravelSkipLimit,
} from "../controllers/travelController";

const travelRouter = Router();
travelRouter.route("/create").post(createTravel);
travelRouter.route("/get").get(getTravel);
travelRouter.route("/delete").delete(deleteTravel);
travelRouter.route("/destination").post(getTravelByDestination);
travelRouter.route("/number").get(getNumberofTravel);
travelRouter.route("/numberlastweek").get(getNumberTravelLastWeek);
travelRouter.route("/destinationpage").post(getTravelSkipLimit);
travelRouter.route("/pagination").post(getTravelAllPagination);

export { travelRouter };
