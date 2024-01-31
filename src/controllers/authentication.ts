import { Request, Response } from "express";
import z from "zod";
import { createUser, getUserByEmail } from "../db/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.log("JWT SECRET NOT FOUND");
}

const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const signup = async (req: Request, res: Response) => {
  try {
    const validateData = signUpSchema.safeParse(req.body);

    if (!validateData.success) {
      res.status(400).json({
        message: "Invalid Input",
      });
    }
    const { firstName, lastName, email, username, password } = req.body;
    //  check for exisitng user:
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        message: "Email already taken!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    };

    await createUser(userData);

    res.status(200).json({
      message: "User Created Successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};

const loginBody = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = async (req: Request, res: Response) => {
  try {
    const validateData = loginBody.safeParse(req.body);
    if (!validateData.success) {
      res.status(400).json({
        message: "Invalid inputs",
      });
    }
    const { email, password } = req.body;
    const user = await getUserByEmail(email).select("+password");
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User with the provided email not found!!!",
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      console.log(result);
      if (result) {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!);
        return res.status(200).json({ message: "Logged in", token: token });
      } else {
        return res.status(411).json({ message: "Error while logging in" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
};
