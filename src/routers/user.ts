import express from "express";
import { allUsers, authCheck, deleteUser } from "../controllers/user";
import { isAuthenticated, isOwner } from "../middleware";

const userRouter = express.Router();

userRouter.get("/all-users", allUsers);
userRouter.get("/authCheck", isAuthenticated, authCheck);
userRouter.delete("/delete", isAuthenticated, isOwner, deleteUser);

export default userRouter;
