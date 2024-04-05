"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const reviewRouter = (0, express_1.Router)();
reviewRouter.route("/create").post(reviewController_1.createReview);
reviewRouter.route("/get").get(reviewController_1.getReview);
exports.default = reviewRouter;
