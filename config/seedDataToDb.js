import { configuration } from "./config.js";
import ProductModel from "../model/productModel.js";

const URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const seedDataToDb = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Failed to fetch Data");
    }
    const data = await response.json();

    data.forEach((item) => {
      const product = new ProductModel({
        title: item?.title,
        price: item?.price,
        description: item?.description,
        category: item?.category,
        image: item?.image,
        sold: item?.sold,
        dateOfSale: item?.dateOfSale,
      });

      product.save();
    });

    if (configuration.nodeEnv === "development") {
      console.log("Successfully Seed Data into Database");
    }
  } catch (error) {
    console.error(error);
  }
};

export default seedDataToDb;
