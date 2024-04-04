import { UserModel } from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { OrderModel } from "../models/orderModel";

dotenv.config();

export const createOrder = async (req: Request, res: Response) => {
  const {
    orderNumber,
    status,
    phoneNumber,
    travelDate,
    amountPaid,
    amountToBePaid,
    coupon,
    description,
    details,
    lastName,
    firstName,
  } = req.body;
  console.log(
    orderNumber,
    status,
    phoneNumber,
    travelDate,
    amountPaid,
    amountToBePaid,
    coupon,
    description,
    details,
    lastName,
    firstName
  );

  try {
    const newOrder = await OrderModel.create({
      orderNumber,
      status,
      phoneNumber,
      travelDate,
      amountPaid,
      amountToBePaid,
      coupon,
      description,
      details,
      lastName,
      firstName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res
      .status(200)
      .json({ message: "successfully created order", result: newOrder });
  } catch (error) {
    res.status(400).json({ message: "fail to create order" });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const orderQuery = OrderModel.find({});
    orderQuery.sort("-createdAt");
    const orderData = await orderQuery.exec();
    res.status(200).json({ result: orderData });
  } catch (error) {
    res.status(400).json({ message: "fail to get order data", error: error });
  }
};
