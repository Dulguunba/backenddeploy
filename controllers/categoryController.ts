import { CategoryModel } from "../models/categoryModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const createCategory = async (req: Request, res: Response) => {
  const { name, english } = req.body;
  console.log("name", name, "english", english);
  try {
    const newCategory = await CategoryModel.create({
      name,
      english,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "successfully created category" });
  } catch (error) {
    res.status(400).json({ message: "fail to create category" });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const categoryQuery = CategoryModel.find({});
    categoryQuery.sort("-createdAt");
    // categoryQuery.select("_id categoryName email phoneNumber");
    const categoryData = await categoryQuery.exec();
    res.status(200).json({ result: categoryData });
  } catch (error) {
    res.status(400).json({ message: "fail to get tourist data", error: error });
  }
};
