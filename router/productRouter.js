import express from "express";
import { months } from "../constants.js";
import ProductModel from "./../model/productModel.js";

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.send(`Welcome to roxiler Assignment Backend : ${new Date()}`);
});

// 1.An API to list the all transactions
productRouter.get("/api/transaction", async (req, res) => {
  // pagination values will be like page = 1, per page = 10
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;

  //   Skip
  const skip = (page - 1) * limit;

  //search text on product title / description / price;
  const search = req.query.search || "";

  //   Any month between January to December dateOfSale regardless of the year.
  const monthInput = req.query.month || "january";

  const month_num = months[monthInput.toLowerCase()];

  try {
    const products = await ProductModel.find({
      $and: [
        {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { price: { $regex: search, $options: "i" } },
          ],
        },
        {
          $expr: {
            $eq: [{ $substrBytes: ["$dateOfSale", 5, 2] }, month_num],
          },
        },
      ],
    })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      products,
      skip,
      page,
      limit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
      message: "Something went wrong",
      success: false,
    });
  }
});

export default productRouter;
