import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

if (!process.env.ACCESS_JWT_SECRET) {
  throw new Error("ACCESS_JWT_SECRET is not defined");
}

if (!process.env.REFRESH_JWT_SECRET) {
  throw new Error("REFRESH_JWT_SECRET is not defined");
}

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d",
};

export default config;
