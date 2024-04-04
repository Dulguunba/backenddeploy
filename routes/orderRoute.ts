import { Router } from "express";
import { createOrder, getOrder } from "../controllers/orderController";

const orderRouter = Router();
orderRouter.route("/create").post(createOrder);
orderRouter.route("/get").get(getOrder);

export default orderRouter;
