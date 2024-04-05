"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const touristController_1 = require("../controllers/touristController");
const touristRouter = (0, express_1.Router)();
touristRouter.route("/create").post(touristController_1.createTourist);
touristRouter.route("/get").get(touristController_1.getTourist);
exports.default = touristRouter;
