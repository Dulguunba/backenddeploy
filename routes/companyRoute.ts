import { Router } from "express";
import { createCompany, getCompany } from "../controllers/companyControllers";

const companyRouter = Router();
companyRouter.route("/create").post(createCompany);
companyRouter.route("/get").get(getCompany);

export default companyRouter;
