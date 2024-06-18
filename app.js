import express from "express";
import productRouter from "./router/productRouter.js";

const app = express();

app.use("/", productRouter);

export default app;
