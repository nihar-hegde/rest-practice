import { Request, Response } from "express";
import z from "zod";
import { createUser, getUserByEmail } from "../db/users";
import bcrypt from "bcryptjs";

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
