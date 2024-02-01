import { Request, Response } from "express";
import { z } from "zod";
import { createProduct } from "../db/products";

const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  tags: z.array(z.string()),
  images: z.array(z.string()),
  quantity: z.number(),
});

export const createProductController = async (req: Request, res: Response) => {
  try {
    const validateData = ProductSchema.safeParse(req.body);
    if (!validateData.success) {
      return res.status(400).json({ message: "Invalid Input data" });
    }
    const data = req.body;
    const productCreate = await createProduct(data);
    console.log(productCreate);
    res.status(200).json({ message: "Product Created", productCreate });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};