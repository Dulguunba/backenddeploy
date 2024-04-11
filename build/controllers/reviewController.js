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
exports.getReview = exports.createReview = void 0;
const reviewModel_1 = require("../models/reviewModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { travelId, stars, comment, userId, email, phoneNumber } = req.body;
    try {
        const newPayment = yield reviewModel_1.ReviewModel.create({
            travelId, stars, comment, userId, email, phoneNumber,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.status(200).json({ message: "successfully created review" });
    }
    catch (error) {
        res.status(400).json({ message: "fail to create review" });
    }
});
exports.createReview = createReview;
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewQuery = reviewModel_1.ReviewModel.find({});
        reviewQuery.sort("-createdAt");
        // reviewQuery.select("_id reviewName email phoneNumber");
        const reviewData = yield reviewQuery.exec();
        res.status(200).json({ result: reviewData });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get review data", error: error });
    }
});
exports.getReview = getReview;
