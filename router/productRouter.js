import express from "express";

const productRouter = express();

productRouter.get("/", (req, res) => {
  res.send(`Welcome to roxiler Assignment Backend : ${new Date()}`);
});

export default productRouter;
