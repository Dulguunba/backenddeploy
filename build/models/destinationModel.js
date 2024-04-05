"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationModel = void 0;
const mongoose_1 = require("mongoose");
const destinationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, true, "please insert input"],
    },
    english: {
        type: String,
        required: [true, true, "please insert input"],
    },
    createdAt: {
        type: Date,
        required: [true, "please insert input"],
    },
    updatedAt: {
        type: Date,
        required: [true, "please insert input"],
    },
    destinationCategory: {
        type: mongoose_1.Schema.ObjectId,
        ref: "destinationCategory",
    },
});
exports.DestinationModel = (0, mongoose_1.model)("destination", destinationSchema);
