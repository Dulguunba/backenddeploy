"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    travelId: {
        type: String,
        required: [true, "Please insert input"],
    },
    stars: {
        type: Number,
        required: [true, "Please insert input"],
        max: [5, "wrong star number"],
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: [true, "Please insert input"],
    },
    updatedAt: {
        type: Date,
        required: [true, "Please insert input"],
    },
    userId: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "please insert info"],
    },
    phoneNumber: {
        type: Number,
        max: [100000000, "wrong phone number"],
        required: [true, "please insert input"],
    },
});
exports.ReviewModel = (0, mongoose_1.model)("reviews", reviewSchema);
