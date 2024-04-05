"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    comment: {
        type: String,
        required: [true, "please insert input"],
    },
    reviewId: {
        type: String,
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
    createdAt: {
        type: Date,
        required: [true, "please insert input"],
    },
    updatedAt: {
        type: Date,
        required: [true, "please insert input"],
    }
});
exports.CommentModel = (0, mongoose_1.model)("comments", commentSchema);
