import ProductModel from "./../model/productModel.js";

// 1.An API to list the all transactions

export const transaction = async (req, res) => {
  // pagination values will be like page = 1, per page = 10
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  //   Skip
  const skip = (page - 1) * limit;

  try {
    const products = await ProductModel.find().skip(skip).limit(limit);
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
      message: "Something went wrong",
      success: false,
    });
  }
};
