import dotenv from "dotenv";

dotenv.config();

const _Config = {
  port: process.env.PORT,
  db: process.env.MONGO_DB,
  nodeEnv: process.env.NODE_ENV,
};

export const configuration = Object.freeze(_Config);
