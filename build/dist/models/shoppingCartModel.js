"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCartModel = void 0;
const mongoose_1 = require("mongoose");
const shoppingCartSchema = new mongoose_1.Schema({
    orderNumber: {
        type: String,
        required: [true, "Please insert input"],
    },
    travelCount: {
        type: Number,
        required: [true, "Please insert input"],
    },
    createdAt: {
        type: Date,
        required: [true, "Please insert input"],
    },
    updatedAt: {
        type: Date,
        required: [true, "Please insert input"],
    },
});
exports.ShoppingCartModel = (0, mongoose_1.model)("shoppingCarts", shoppingCartSchema);
