import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    required: [true, "Please insert input"],
  },
  status: {
    type: String,
    enum: [
      "шинэ захиалга",
      "төлбөр хийгдээгүй",
      "төлбөр хийгдсэн",
      "захиалга баталгаажсан",
    ],
    required: [true, "Please insert input"],
    default: "шинэ захиалга",
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please insert input"],
  },
  firstName: {
    type: String,
    required: [true, "Please insert input"],
  },
  lastName: {
    type: String,
    required: [true, "Please insert input"],
  },
  travelDate: {
    type: Date,
  },
  amountPaid: {
    type: Number,
    required: [true, "Please insert input"],
    default: 0,
  },
  amountToBePaid: {
    type: Number,
    required: [true, "Please insert input"],
    default: 0,
  },
  description: {
    type: String,
  },
  details: {
    type: Array,
    // required: [true, "please insert data"],
  },
  createdAt: {
    type: Date,
    required: [true, "Please insert input"],
  },
  updatedAt: {
    type: Date,
    required: [true, "Please insert input"],
  },
});

export const OrderModel = model("orders", orderSchema);
