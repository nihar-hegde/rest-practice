import express from "express";
import { login, signup } from "../controllers/authentication";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);

export default authRouter;
