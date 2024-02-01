import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  tags: [String], // an array of strings
  images: [String], // an array of image urls
  quantity: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // a reference to the user who created the product
});

export const ProductModel = mongoose.model("Product", ProductSchema);

export const getAllProduct = (filter: string) =>
  ProductModel.find({
    $or: [
      {
        name: {
          $regex: filter,
        },
      },
      {
        tags: {
          $regex: filter,
        },
      },
    ],
  });

export const getProductById = (id: string) => ProductModel.findById(id);

export const createProduct = (value: Record<string, any>) =>
  ProductModel.create(value);

export const deleteProductById = (id: string) =>
  ProductModel.findOneAndDelete({ _id: id });

export const updateProductById = (id: string, value: Record<string, any>) =>
  ProductModel.findByIdAndUpdate(id, value);
