import { Schema, model } from "mongoose";

const companySchema = new Schema({
  name: {
    type: String,
    required: [true, true, "please insert input"],
  },
  english: {
    type: String,
    required: [true, true, "please insert input"],
  },
  info: {
    type: String,
    required: [true, "please insert info"],
  },
  email: {
    type: String,
    required: [true, "please insert info"],
    unique: [true, "wrong email"],
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
  password: {
    type: String,
    required: [true, "please insert input"],
  },
  updatedAt: {
    type: Date,
    required: [true, "please insert input"],
  },
  role: {
    type: String,
    enum: ["company", "admin"],
    default: "company",
  },
});

export const CompanyModel = model("company", companySchema);
