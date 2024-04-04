import { CommentModel } from "../models/commentModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import categoryRouter from "../routes/categoryRoute";

dotenv.config();

export const createComment = async (req: Request, res: Response) => {
  const { comment, reviewId , userId, email, phoneNumber } = req.body;
  try {
    const newComment = await CommentModel.create({
        comment, 
        reviewId , 
        userId, 
        email, 
        phoneNumber,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.status(200).json({ message: "successfully created comment" });
  } catch (error) {
    res.status(400).json({ message: "fail to create ccomment" });
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    const commentQuery = CommentModel.find({});
    commentQuery.sort("-createdAt");
    // commentQuery.select("_id commentName email phoneNumber");
    const commentData = await commentQuery.exec();
    res.status(200).json({ result: commentData });
  } catch (error) {
    res.status(400).json({ message: "fail to get comment data", error: error });
  }
};
