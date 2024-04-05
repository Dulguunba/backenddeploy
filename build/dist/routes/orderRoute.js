"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const orderRouter = (0, express_1.Router)();
orderRouter.route("/create").post(orderController_1.createOrder);
orderRouter.route("/get").get(orderController_1.getOrder);
exports.default = orderRouter;
