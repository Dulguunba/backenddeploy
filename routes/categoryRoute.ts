import { Router } from "express";
import { createCategory, getCategory } from "../controllers/categoryController";

const categoryRouter = Router();
categoryRouter.route("/create").post(createCategory);
categoryRouter.route("/get").get(getCategory);

export default categoryRouter;
