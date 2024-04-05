"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayment = exports.createPayment = void 0;
const paymentModel_1 = require("../models/paymentModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderNumber, paymentStatus, paymentType } = req.body;
    try {
        const newPayment = yield paymentModel_1.PaymentModel.create({
            orderNumber,
            paymentStatus,
            paymentType,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(200).json({ message: "successfully created payment" });
    }
    catch (error) {
        res.status(400).json({ message: "fail to create payment" });
    }
});
exports.createPayment = createPayment;
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentQuery = paymentModel_1.PaymentModel.find({});
        paymentQuery.sort("-createdAt");
        // paymentQuery.select("_id paymentName email phoneNumber");
        const paymentData = yield paymentQuery.exec();
        res.status(200).json({ result: paymentData });
    }
    catch (error) {
        res.status(400).json({ message: "fail to get payment data", error: error });
    }
});
exports.getPayment = getPayment;
