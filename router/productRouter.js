import express from "express";
import { transaction } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.send(`Welcome to roxiler Assignment Backend : ${new Date()}`);
});

productRouter.get("/transaction", transaction);

export default productRouter;
