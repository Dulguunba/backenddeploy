import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Please insert input"],
  },
  email: {
    type: String,
    required: [true, "Please insert input"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please insert input"],
  },
  password: {
    type: String,
    required: [true, "Please insert input"],
  },
  //   cartId: {
  //     type: String,
  //     required: [true, "Please insert input"],
  //   },
  createdAt: {
    type: Date,
    required: [true, "Please insert input"],
  },
  updatedAt: {
    type: Date,
    required: [true, "Please insert input"],
  },
});

export const UserModel = model("users", userSchema);
