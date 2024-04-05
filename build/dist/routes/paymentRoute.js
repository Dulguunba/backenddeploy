"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const paymentRouter = (0, express_1.Router)();
paymentRouter.route("/create").post(paymentController_1.createPayment);
paymentRouter.route("/get").get(paymentController_1.getPayment);
exports.default = paymentRouter;
