import { Router } from "express";
import { createPayment, getPayment } from "../controllers/paymentController";

const paymentRouter = Router();
paymentRouter.route("/create").post(createPayment);
paymentRouter.route("/get").get(getPayment);

export default paymentRouter;
