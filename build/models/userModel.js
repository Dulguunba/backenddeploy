"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: [true, "Please insert input"],
    },
    email: {
        type: String,
        required: [true, "Please insert input"],
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please insert input"],
    },
    password: {
        type: String,
        required: [true, "Please insert input"],
    },
    //   cartId: {
    //     type: String,
    //     required: [true, "Please insert input"],
    //   },
    createdAt: {
        type: Date,
        required: [true, "Please insert input"],
    },
    updatedAt: {
        type: Date,
        required: [true, "Please insert input"],
    },
});
exports.UserModel = (0, mongoose_1.model)("users", userSchema);
