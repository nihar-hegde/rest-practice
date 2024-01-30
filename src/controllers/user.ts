import { Request, Response } from "express";
import { getAllUsers } from "../db/users";

export const allUsers = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter || "";
    const users = await getAllUsers(filter as string);
    res.status(200).json({
      user: users.map((user) => ({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};
