import { Request, Response } from "express";
import { deleteUserById, getAllUsers } from "../db/users";
import jwt, { JwtPayload } from "jsonwebtoken";

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

export const authCheck = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Works i guess",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        message: "You are not logged in!",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const jwtid = (decoded as JwtPayload).id;
    const deleteUser = await deleteUserById(jwtid);
    return res.status(200).json({ deleteUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
