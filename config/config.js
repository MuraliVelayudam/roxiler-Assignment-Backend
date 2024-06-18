import dotenv from "dotenv";

dotenv.config();

const _Config = {
  port: process.env.PORT,
  db: process.env.MONGO_DB,
};

export const configuration = Object.freeze(_Config);
