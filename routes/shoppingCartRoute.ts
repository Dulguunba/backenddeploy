import { Router } from "express";
import { createShoppingCart, getShoppingCart } from "../controllers/shoppingCartController";

const shoppingCartRouter = Router();
shoppingCartRouter.route("/create").post(createShoppingCart);
shoppingCartRouter.route("/get").get(getShoppingCart);

export default shoppingCartRouter;
