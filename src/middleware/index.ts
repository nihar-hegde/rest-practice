import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserByEmail } from "../db/users";
import { ObjectId } from "mongodb";

dotenv.config();
interface IdentidyI {
  _id: string | ObjectId;
  email: string;
  firstName: string;
  lastName: string;
}

declare global {
  namespace Express {
    interface Request {
      indentity: IdentidyI;
    }
  }
}

if (!process.env.JWT_SECRET) {
  console.log("JWT_SECRET not found");
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        message: "You are not logged in!",
      });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      const email = (decoded as JwtPayload).email;
      const exisitingUser = await getUserByEmail(email);
      console.log(exisitingUser);
      if (!exisitingUser) {
        return res.sendStatus(400).json({ message: "User not found" });
      }
      req.indentity = exisitingUser;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    const id = req.indentity._id.toString();
    if (jwtid !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
