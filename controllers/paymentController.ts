import { PaymentModel } from "../models/paymentModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import categoryRouter from "../routes/categoryRoute";
import axios from "axios";
import { OrderModel } from "../models/orderModel";
import mongoose from "mongoose";

dotenv.config();

export const createPayment = async (req: Request, res: Response) => {
  const { orderNumber, paymentStatus, paymentType } = req.body;
  try {
    const newPayment = await PaymentModel.create({
      orderNumber, paymentStatus, paymentType,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(200).json({ message: "successfully created payment" });
  } catch (error) {
    res.status(400).json({ message: "fail to create payment" });
  }
};

export const getPayment = async (req: Request, res: Response) => {
  try {

    const paymentQuery = PaymentModel.find({});
    paymentQuery.sort("-createdAt");
    // paymentQuery.select("_id paymentName email phoneNumber");
    const paymentData = await paymentQuery.exec();
    res.status(200).json({ result: paymentData });
  } catch (error) {
    res.status(400).json({ message: "fail to get payment data", error: error });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  const invoiceRes = await axios.post(
    "https://merchant.qpay.mn/v2/invoice",
    {
      invoice_code: "POWER_EXPO_INVOICE",
      sender_invoice_no: "1234567",
      invoice_receiver_code: "terminal",
      invoice_description: "test",
      amount: 10,
      callback_url: "http://localhost:3001",
    },
    { headers: { Authorization: `Bearer ${req.body.token}` } }
  );
  return res.status(201).json({ invoiceId: invoiceRes.data });
};


export const checkPayment = async (req: Request, res: Response) => {
  try {
    console.log("first")
    // const { orderId } = req.query;
    // const checkRes = await axios.post(
    //   "https://merchant.qpay.mn/v2/payment/check",
    //   {
    //     object_type: "INVOICE",
    //     object_id: req.body.invoiceId,
    //     offset: {
    //       page_number: 1,
    //       page_limit: 100,
    //     },
    //   },

    //   { headers: { Authorization: `Bearer ${req.body.token}` } }
    // );

    // if (checkRes.data.isPaid) {
    //   await OrderModel.findByIdAndUpdate(new mongoose.Types.ObjectId(orderId), { IsPaidStatus: true });
    // }
    return res.status(200).json({ check: true });
  } catch (error) {
    console.error("error in fuck", error)
    return res.status(400).json({ err: error })
  }
};