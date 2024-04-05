"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shoppingCartController_1 = require("../controllers/shoppingCartController");
const shoppingCartRouter = (0, express_1.Router)();
shoppingCartRouter.route("/create").post(shoppingCartController_1.createShoppingCart);
shoppingCartRouter.route("/get").get(shoppingCartController_1.getShoppingCart);
exports.default = shoppingCartRouter;
