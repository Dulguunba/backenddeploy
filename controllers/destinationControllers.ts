import { DestinationModel } from "../models/destinationModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();

export const createDestination = async (req: Request, res: Response) => {
  const { name, english, destinationCategory } = req.body;
  console.log("name", name, "english", english, 'destination category id', destinationCategory);
  try {
    const newCategory = await DestinationModel.create({
      name,
      english,
      destinationCategory,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "successfully created destination" });
  } catch (error) {
    res.status(400).json({ message: "fail to create destination" });
  }
};

export const getDestination = async (req: Request, res: Response) => {
  try {
    const destinationQuery = DestinationModel.find({}).populate("destinationCategory")
    destinationQuery.sort("-createdAt")
    const destinationData = await destinationQuery.exec();
    res.status(200).json({ result: destinationData });
  } catch (error) {
    res.status(400).json({ message: "fail to get destination data", error: error });
  }
};
