import express from "express";
import { allUsers, authCheck } from "../controllers/user";
import { isAuthenticated } from "../middleware";

const userRouter = express.Router();

userRouter.get("/all-users", allUsers);
userRouter.get("/authCheck", isAuthenticated, authCheck);

export default userRouter;
