"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyControllers_1 = require("../controllers/companyControllers");
const companyRouter = (0, express_1.Router)();
companyRouter.route("/create").post(companyControllers_1.createCompany);
companyRouter.route("/get").get(companyControllers_1.getCompany);
exports.default = companyRouter;
