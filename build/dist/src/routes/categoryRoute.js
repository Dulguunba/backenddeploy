"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const categoryRouter = (0, express_1.Router)();
categoryRouter.route("/create").post(categoryController_1.createCategory);
categoryRouter.route("/get").get(categoryController_1.getCategory);
exports.default = categoryRouter;
