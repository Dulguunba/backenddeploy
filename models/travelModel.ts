import { Schema, model } from "mongoose";

const travelSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please insert input"],
  },
  travelCompany: {
    type: String,
    required: [true, "Please insert input"],
  },
  duration: {
    type: Number,
    required: [true, "Please insert input"],
  },
  price: {
    adultPrice: {
      type: Number,
      required: [true, "Please insert input"],
    },
    childPrice: {
      type: Number,
      required: [true, "Please insert input"],
    },
  },
  food: {
    IsIncludeFoodCheck: {
      type: Boolean,
      required: [true, "Please insert input"],
    },
    IsIncludeFoodPriceCheck: {
      type: Boolean,
      required: [true, "Please insert input"],
    },
    foodNumber: {
      type: Number,
      required: [true, "Please insert input"],
    },
    foodPrice: {
      type: Number,
      required: [true, "Please insert input"],
    },
  },
  traffic: {
    trafficPrice: {
      type: Number,
      required: [true, "Please insert input"],
    },
    IsIncludeTrafficCheck: {
      type: Boolean,
      required: [true, "Please insert input"],
    },
    IsIncludeTrafficPriceCheck: {
      type: Boolean,
      required: [true, "Please insert input"],
    },
  },
  categoryType: {},
  touristType: {},
  additionalInfo: {
    type: String,
    required: [true, "Please insert input"],
  },
  image: {
    mainImage: {
      type: String,
      required: [true, "Please insert input"],
    },
    supportImage: {
      type: String,
      required: [true, "Please insert input"],
    },
  },
  route: {
    type: Array,
  },
  calendar: {
    type: Array,
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

export const TravelModel = model("travelinfo", travelSchema);
