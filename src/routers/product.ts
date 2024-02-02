import express from "express";
import {
  isAdmin,
  isAuthenticated,
  isOwner,
  isProductOwner,
} from "../middleware";
import {
  createProductController,
  deleteProduct,
  getAllProductsController,
} from "../controllers/products";

const productRouter = express.Router();

productRouter.get("/all-products", getAllProductsController);
productRouter.delete(
  "/deleteProduct/:id",
  isAuthenticated,
  isAdmin,
  isProductOwner,
  deleteProduct,
);
productRouter.post(
  "/create",
  isAuthenticated,
  isAdmin,
  createProductController,
);

export default productRouter;
