import express from "express";
import authRouter from "./authentication";
import userRouter from "./user";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
