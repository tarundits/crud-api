import express from "express";
import { productRouter } from "./productRouter";
import { userRouter } from "./userRouter";

const router = express.Router();

router.use("/user", userRouter);
router.use("/catalog/product", productRouter);

export { router };