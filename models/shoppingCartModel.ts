import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema({
  orderNumber: {
    type: String,
    required: [true, "Please insert input"],
  },
  travelCount: {
    type: Number,
    required: [true, "Please insert input"],
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

export const ShoppingCartModel = model("shoppingCarts", shoppingCartSchema);
