import { ShoppingCartModel } from "../models/shoppingCartModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const createShoppingCart = async (req: Request, res: Response) => {
  const {orderNumber, travelCount } = req.body;

  try {
    const newShoppingCart = await ShoppingCartModel.create({
      orderNumber, travelCount,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res
      .status(200)
      .json({ message: "successfully created shopping cart", result: newShoppingCart });
  } catch (error) {
    res.status(400).json({ message: "fail to create shpping cart" });
  }
};

export const getShoppingCart = async (req: Request, res: Response) => {
  try {
    const shoppingCartQuery = ShoppingCartModel.find({});
    shoppingCartQuery.sort("-createdAt");
    const shoppingCartData = await shoppingCartQuery.exec();
    res.status(200).json({ result: shoppingCartData });
  } catch (error) {
    res.status(400).json({ message: "fail to get shopping cart data", error: error });
  }
};
