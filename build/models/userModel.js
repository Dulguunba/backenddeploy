"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please insert input"],
    },
    phoneNumber: {
        type: Number,
    },
    password: {
        type: String,
    },
    address: {
        type: String,
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
