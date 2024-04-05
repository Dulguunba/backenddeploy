"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.travelRouter = void 0;
const express_1 = require("express");
const travelController_1 = require("../controllers/travelController");
const travelRouter = (0, express_1.Router)();
exports.travelRouter = travelRouter;
travelRouter.route("/create").post(travelController_1.createTravel);
travelRouter.route("/get").get(travelController_1.getTravel);
