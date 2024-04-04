import { TravelModel } from "../models/travelModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const createTravel = async (req: Request, res: Response) => {
  const {
    name,
    travelCompany,
    duration,
    price,
    food,
    traffic,
    categoryType,
    touristType,
    additionalInfo,
    image,
    route,
    calendar,
  } = req.body;
  console.log(
    name,
    travelCompany,
    duration,
    price,
    food,
    traffic,
    categoryType,
    touristType,
    additionalInfo,
    image,
    route,
    calendar
  );

  try {
    const newTravel = await TravelModel.create({
      name,
      travelCompany,
      duration,
      price,
      food,
      traffic,
      categoryType,
      touristType,
      additionalInfo,
      image,
      route,
      calendar,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("newTravel", newTravel);
    res
      .status(200)
      .json({ message: "successfully created travel info", result: newTravel });
  } catch (error) {
    console.log("failt to create travel", error);
    res.status(400).json({ message: "fail to create travel " });
  }
};

export const getTravel = async (req: Request, res: Response) => {
  try {
    const travelQuery = TravelModel.find({});
    travelQuery.sort("-createdAt");
    // travelQuery.select("_id travelName email phoneNumber");
    const travelData = await travelQuery.exec();
    res.status(200).json({ result: travelData });
  } catch (error) {
    res.status(400).json({ message: "fail to get tourist data", error: error });
  }
};
