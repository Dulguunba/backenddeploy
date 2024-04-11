"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
userRouter.route("/create").post(userController_1.createUser);
userRouter.route("/get").get(userController_1.getUser);
userRouter.route("/delete").delete(userController_1.deleteUser);
exports.default = userRouter;
