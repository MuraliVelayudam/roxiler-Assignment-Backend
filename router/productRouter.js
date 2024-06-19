import express from "express";
import { months } from "../constants.js";
import ProductModel from "./../model/productModel.js";

const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.send(`Welcome to roxiler Assignment Backend : ${new Date()}`);
});

// 1.An API to list the all transactions ----------------------------------------------------------------------
productRouter.get("/api/transaction", async (req, res) => {
  // pagination values will be like page = 1, per page = 10
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit);

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

//2.An API for statistics------------------------------------------------------

productRouter.get("/api/statistics", async (req, res) => {
  // search
  const search = req.query.search || "";

  //Month
  const monthInput = req.query.month;

  const month_num = months[monthInput.toLowerCase()];

  try {
    const statistics = await ProductModel.find({
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
    });

    // Computing Total sale amount of selected month------------------
    let totalSales = [];
    let soldItem = [];

    statistics.map((each) => {
      totalSales.push(Number(each.price));
      soldItem.push(each.sold);
    });

    const sale = totalSales.reduce(
      (acc, current_Value) => acc + current_Value,
      0
    );

    // Computing Total number of sold items of selected month-----

    let sold = 0;
    let notSold = 0;

    soldItem.forEach((eachItem) => {
      if (eachItem === true) {
        sold += 1;
        return sold;
      } else {
        notSold += 1;
        return notSold;
      }
    });

    res.status(200).json({
      success: true,
      message: "Fetch statistics successfully",
      sale_Statistics: Math.round(sale),
      sold: sold,
      notSold: notSold,
      totalItems: statistics.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
      message: "Internal Error",
      success: false,
    });
  }
});

// 3. An API for bar---------------------------------------
productRouter.get("/api/chart", async (req, res) => {
  // Month
  const monthInput = req.query.month || "january";

  const month_Num = months[monthInput.toLowerCase()];

  try {
    const barChartData = await ProductModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $substrBytes: ["$dateOfSale", 5, 2] }, month_Num],
          },
        },
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [
            "0",
            "101",
            "201",
            "301",
            "401",
            "501",
            "601",
            "701",
            "801",
            "901",
          ],
          default: "901-above",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    res.status(200).json({
      barChartData,
      message: "Fetched Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
      message: "Internal Error ",
      success: false,
    });
  }
});

// 4.An API for pie chart Find unique categories and number of items

productRouter.get("/api/pie", async (req, res) => {
  // Month

  const monthInput = req.query.month || "january";

  const month_Num = months[monthInput.toLowerCase()];

  try {
    const pie = await ProductModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $substrBytes: ["$dateOfSale", 5, 2] }, month_Num],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          itemCount: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          itemCount: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      pie,
      message: "successfully fetched data",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Internal error",
      success: false,
    });
  }
});

export default productRouter;
