import { TouristModel } from "../models/touristModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { resolve } from "path";

dotenv.config();

export const createTourist = async (req: Request, res: Response) => {
  const { name, english, group } = req.body;
  console.log("name", name, "english", english, group);

  try {
    const newTourist = await TouristModel.create({
      name,
      english,
      group,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "successfully created tourist" });
  } catch (error) {
    res.status(400).json({ message: "fail to create tourist" });
  }
};

export const getTourist = async (req: Request, res: Response) => {
  try {
    const touristQuery = TouristModel.find({});
    touristQuery.sort("-createdAt");
    // touristQuery.select("_id touristName email phoneNumber");
    const touristData = await touristQuery.exec();
    res.status(200).json({ result: touristData });
  } catch (error) {
    res.status(400).json({ message: "fail to get tourist data", error: error });
  }
};
