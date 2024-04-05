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
exports.getShoppingCart = exports.createShoppingCart = void 0;
const shoppingCartModel_1 = require("../models/shoppingCartModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createShoppingCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderNumber, travelCount } = req.body;
    try {
        const newShoppingCart = yield shoppingCartModel_1.ShoppingCartModel.create({
            orderNumber,
            travelCount,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(200).json({
            message: "successfully created shopping cart",
            result: newShoppingCart,
        });
    }
    catch (error) {
        res.status(400).json({ message: "fail to create shpping cart" });
    }
});
exports.createShoppingCart = createShoppingCart;
const getShoppingCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shoppingCartQuery = shoppingCartModel_1.ShoppingCartModel.find({});
        shoppingCartQuery.sort("-createdAt");
        const shoppingCartData = yield shoppingCartQuery.exec();
        res.status(200).json({ result: shoppingCartData });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "fail to get shopping cart data", error: error });
    }
});
exports.getShoppingCart = getShoppingCart;
