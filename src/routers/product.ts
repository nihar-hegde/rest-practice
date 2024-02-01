import express from "express";
import { isAdmin, isAuthenticated, isOwner } from "../middleware";
import {
  createProductController,
  getAllProductsController,
} from "../controllers/products";

const productRouter = express.Router();

productRouter.get("/all-products", getAllProductsController);
productRouter.post(
  "/create",
  isAuthenticated,
  isAdmin,
  createProductController,
);

export default productRouter;
