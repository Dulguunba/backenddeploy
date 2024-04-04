import { Schema, model } from "mongoose";

const destinationSchema = new Schema({
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
  destinationCategory: {
    type: Schema.ObjectId,
    ref: "destinationCategory",
  },
});

export const DestinationModel = model("destination", destinationSchema);
