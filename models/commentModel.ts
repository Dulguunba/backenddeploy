import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  comment: {
    type: String,
    required: [true, "please insert input"],
  },
  reviewId: {
    type: String,
  },
  userId: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "please insert info"],
  },
  phoneNumber: {
    type: Number,
    max: [100000000, "wrong phone number"],
    required: [true, "please insert input"],
  },
  createdAt: {
    type: Date,
    required: [true, "please insert input"],
  },
  
  updatedAt: {
    type: Date,
    required: [true, "please insert input"],
  }
});

export const CommentModel = model("comments", commentSchema);
