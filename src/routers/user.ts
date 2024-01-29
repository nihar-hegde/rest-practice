import express from "express";
import { allUsers } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/all-users", allUsers);

export default userRouter;
