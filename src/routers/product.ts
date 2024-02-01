import express from "express";
import { allUsers, authCheck, deleteUser } from "../controllers/user";
import { isAdmin, isAuthenticated, isOwner } from "../middleware";
import { createProductController } from "../controllers/products";

const productRouter = express.Router();

productRouter.post(
  "/create",
  isAuthenticated,
  isAdmin,
  createProductController
);

export default productRouter;
