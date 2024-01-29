import { Request, Response } from "express";
import { getAllUsers } from "../db/users";

export const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};
