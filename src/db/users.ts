import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, select: false },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export const UserModel = mongoose.model("User", UserSchema);

// User Actions

export const getAllUsers = (filter: string) =>
  UserModel.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (value: Record<string, any>) =>
  UserModel.create(value);
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, value: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, value);
