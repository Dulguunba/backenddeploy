import { PaymentModel } from "../models/paymentModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import categoryRouter from "../routes/categoryRoute";

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
