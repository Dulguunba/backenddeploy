import { Schema, model } from "mongoose";

const touristSchema = new Schema({
  name: {
    type: String,
    required: [true, true, "please insert input"],
  },
  english: {
    type: String,
    required: [true, true, "please insert input"],
  },
  createdAt: {
    type: Date,
    required: [true, "please insert input"],
  },
  updatedAt: {
    type: Date,
    required: [true, "please insert input"],
  },
  group: {
    type: String,
    required: [true, "please insert input"],
  },
});

export const TouristModel = model("tourist", touristSchema);
