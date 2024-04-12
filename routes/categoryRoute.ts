import { Router } from "express";
import { createCategory, deleteCategory, getCategory } from "../controllers/categoryController";

const categoryRouter = Router();
categoryRouter.route("/create").post(createCategory);
categoryRouter.route("/get").get(getCategory);
categoryRouter.route("/delete").delete(deleteCategory)

export default categoryRouter;
