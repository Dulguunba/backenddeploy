import { ReviewModel } from "../models/reviewModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import categoryRouter from "../routes/categoryRoute";

dotenv.config();

export const createReview = async (req: Request, res: Response) => {
  const { travelId, stars , comment , userId, email, phoneNumber} = req.body;
  try {
    const newPayment = await ReviewModel.create({
        travelId, stars , comment , userId, email, phoneNumber,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.status(200).json({ message: "successfully created review" });
  } catch (error) {
    res.status(400).json({ message: "fail to create review" });
  }
};

export const getReview = async (req: Request, res: Response) => {
  try {
    const reviewQuery = ReviewModel.find({});
    reviewQuery.sort("-createdAt");
    // reviewQuery.select("_id reviewName email phoneNumber");
    const reviewData = await reviewQuery.exec();
    res.status(200).json({ result: reviewData });
  } catch (error) {
    res.status(400).json({ message: "fail to get review data", error: error });
  }
};
