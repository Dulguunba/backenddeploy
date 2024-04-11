import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please insert input"],
  },
  phoneNumber: {
    type: Number,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
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
