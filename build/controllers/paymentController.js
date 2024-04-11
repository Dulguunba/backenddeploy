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
exports.checkPayment = exports.createInvoice = exports.getPayment = exports.createPayment = void 0;
const paymentModel_1 = require("../models/paymentModel");
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const orderModel_1 = require("../models/orderModel");
dotenv_1.default.config();
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderNumber, paymentStatus, paymentType } = req.body;
    try {
        const newPayment = yield paymentModel_1.PaymentModel.create({
            orderNumber, paymentStatus, paymentType,
            createdAt: new Date(),
            updatedAt: new Date()
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
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const invoiceRes = yield axios_1.default.post("https://merchant.qpay.mn/v2/invoice", {
        invoice_code: "POWER_EXPO_INVOICE",
        sender_invoice_no: "1234567",
        invoice_receiver_code: "terminal",
        invoice_description: "test",
        amount: 10,
        callback_url: "http://localhost:3001",
    }, { headers: { Authorization: `Bearer ${req.body.token}` } });
    return res.status(201).json({ invoiceId: invoiceRes.data });
});
exports.createInvoice = createInvoice;
const checkPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.query;
    const checkRes = yield axios_1.default.post("https://merchant.qpay.mn/v2/payment/check", {
        object_type: "INVOICE",
        object_id: req.body.invoiceId,
        offset: {
            page_number: 1,
            page_limit: 100,
        },
    }, { headers: { Authorization: `Bearer ${req.body.token}` } });
    if (checkRes.data.isPaid) {
        yield orderModel_1.OrderModel.findByIdAndUpdate(orderId, { IsPaidStatus: true });
    }
    return res.status(200).json({ check: checkRes.data });
});
exports.checkPayment = checkPayment;
