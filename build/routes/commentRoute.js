"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = require("../controllers/commentController");
const commmentRouter = (0, express_1.Router)();
commmentRouter.route("/create").post(commentController_1.createComment);
commmentRouter.route("/get").get(commentController_1.getComment);
exports.default = commmentRouter;
