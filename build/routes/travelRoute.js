"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelRouter = void 0;
const express_1 = require("express");
const travelController_1 = require("../controllers/travelController");
const travelRouter = (0, express_1.Router)();
exports.travelRouter = travelRouter;
travelRouter.route("/create").post(travelController_1.createTravel);
travelRouter.route("/get").get(travelController_1.getTravel);
travelRouter.route("/delete").delete(travelController_1.deleteTravel);
travelRouter.route("/destination").post(travelController_1.getTravelByDestination);
travelRouter.route("/number").get(travelController_1.getNumberofTravel);
travelRouter.route("/numberlastweek").get(travelController_1.getNumberTravelLastWeek);
travelRouter.route("/destinationpage").post(travelController_1.getTravelSkipLimit);
travelRouter.route("/pagination").post(travelController_1.getTravelAllPagination);
travelRouter.route("/id").post(travelController_1.getTravelId);
//vfjdk
