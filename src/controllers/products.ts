import { Request, Response } from "express";
import { z } from "zod";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
} from "../db/products";

const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  tags: z.array(z.string()),
  images: z.array(z.string()),
  quantity: z.number(),
});
export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter || "";
    const products = await getAllProduct(filter as string);
    if (!products) {
      res.status(404).json({ message: "NO Products found" });
    }
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const validateData = ProductSchema.safeParse(req.body);
    if (!validateData.success) {
      return res.status(400).json({ message: "Invalid Input data" });
    }
    const data = req.body;
    const updateData = { ...data, userId: req.indentity._id };
    console.log(updateData, "UPDATED DATA");
    const productCreate = await createProduct(updateData);
    console.log(productCreate, "CREATED PRODUCT");
    res.status(200).json({ message: "Product Created", productCreate });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await deleteProductById(productId);
    res
      .status(200)
      .json({ message: "PRduct deleted you test yo", deleteProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
