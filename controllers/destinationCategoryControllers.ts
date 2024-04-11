import { DestinationCategoryModel } from "../models/destinationCategoryModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { DestinationModel } from "../models/destinationModel";


dotenv.config();

export const createDestinationCategory = async (req: Request, res: Response) => {
  const { name, english } = req.body;
  console.log("name", name, "english", english);
  try {
    const newCategory = await DestinationCategoryModel.create({
      name,
      english,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "successfully created destination category" });
  } catch (error) {
    res.status(400).json({ message: "fail to create destination category " });
  }
};

export const getDestinationCategory = async (req: Request, res: Response) => {
  try {
    const destinationCategoryQuery = DestinationCategoryModel.find({});
    destinationCategoryQuery.sort("-createdAt");
    // destinationCategoryQuery.select("_id destinationCategoryName email phoneNumber");
    const destinationCategoryData = await destinationCategoryQuery.exec();
    res.status(200).json({ result: destinationCategoryData });
  } catch (error) {
    res.status(400).json({ message: "fail to get destination category data", error: error });
  }
};

export const deleteDestinationCategory = async (req: Request, res: Response) => {
  try {
    const { name, english } = req.body;
    if (!name || !english) {
      return res.status(401).json({ message: "undifinded name or english" })
    }
    const deleteDestination = await DestinationCategoryModel.deleteMany({ name, english })
  } catch (error) {
    res.status(400).json({ message: "fail to delete DestinationCategory" })
  }
}