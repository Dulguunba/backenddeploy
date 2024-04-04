import { Router } from "express";
import { createTourist, getTourist } from "../controllers/touristController";

const touristRouter = Router();
touristRouter.route("/create").post(createTourist);
touristRouter.route("/get").get(getTourist);

export default touristRouter;
