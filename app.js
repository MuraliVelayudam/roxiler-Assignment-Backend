import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRouter from "./router/productRouter.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", productRouter);

export default app;
