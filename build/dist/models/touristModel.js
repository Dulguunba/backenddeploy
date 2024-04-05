"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouristModel = void 0;
const mongoose_1 = require("mongoose");
const touristSchema = new mongoose_1.Schema({
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
    group: {
        type: String,
        required: [true, "please insert input"],
    },
});
exports.TouristModel = (0, mongoose_1.model)("tourist", touristSchema);
