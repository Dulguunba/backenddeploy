"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComment = exports.createComment = void 0;
const commentModel_1 = require("../models/commentModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, reviewId, userId, email, phoneNumber } = req.body;
    try {
        const newComment = yield commentModel_1.CommentModel.create({
            comment,
            reviewId,
            userId,
            email,
            phoneNumber,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.status(200).json({ message: "successfully created comment" });
    }
    catch (error) {
        res.status(400).json({ message: "fail to create ccomment" });
    }
});
exports.createComment = createComment;
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commentQuery = commentModel_1.CommentModel.find({});
        commentQuery.sort("-createdAt");
        // commentQuery.select("_id commentName email phoneNumber");
        const commentData = yield commentQuery.exec();
        res.status(200).json({ result: commentData });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get comment data", error: error });
    }
});
exports.getComment = getComment;
