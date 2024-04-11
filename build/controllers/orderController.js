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
exports.deleteOrder = exports.getOrder = exports.createOrder = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const orderModel_1 = require("../models/orderModel");
dotenv_1.default.config();
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, email, phoneNumber, travelDate, description, details, lastName, firstName, travelId } = req.body;
    console.log(amount, email, phoneNumber, travelDate, description, details, lastName, firstName, travelId);
    try {
        const newOrder = yield orderModel_1.OrderModel.create({
            amount,
            email,
            phoneNumber,
            travelDate,
            description,
            details,
            lastName,
            firstName,
            travelId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res
            .status(200)
            .json({ message: "successfully created order", result: newOrder });
    }
    catch (error) {
        res.status(400).json({ message: "fail to create order" });
    }
});
exports.createOrder = createOrder;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderQuery = orderModel_1.OrderModel.find({});
        orderQuery.sort("-createdAt");
        const orderData = yield orderQuery.exec();
        res.status(200).json({ result: orderData });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get order data", error: error });
    }
});
exports.getOrder = getOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hello");
        const { _id } = req.query;
        console.log(_id);
        const deleteNode = yield orderModel_1.OrderModel.findByIdAndDelete({ _id });
        res.send("ok");
    }
    catch (error) {
        res.status(400).json({ message: "fail to delete user data", error: error });
    }
});
exports.deleteOrder = deleteOrder;
