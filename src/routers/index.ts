import express from "express";
import authRouter from "./authentication";
import userRouter from "./user";
import productRouter from "./product";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/product", productRouter);

export default router;
