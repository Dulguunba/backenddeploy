import { UserModel } from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { OrderModel } from "../models/orderModel";

dotenv.config();

export const createOrder = async (req: Request, res: Response) => {
  const {
    amount,
    email,
    phoneNumber,
    travelDate,
    description,
    details,
    lastName,
    firstName,
    travelId
  } = req.body;
  console.log(
    amount,
    email,
    phoneNumber,
    travelDate,
    description,
    details,
    lastName,
    firstName,
    travelId
  );

  try {
    const newOrder = await OrderModel.create({
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
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    console.log("hello")
    const { _id } = req.query;
    console.log(_id)
    const deleteNode = await OrderModel.findByIdAndDelete({ _id })
    res.send("ok")
  } catch (error) {
    res.status(400).json({ message: "fail to delete user data", error: error });
  }
}

