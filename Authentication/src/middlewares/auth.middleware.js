import userModel from "../models/auth.models.js";
import jwt from "jsonwebtoken";
import config from "./config.js";

// Middleware to verify access token

export const authenticate = async (req, res, next) => {
  try {

    // Get access token from headers

    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token required ",
      });
    }

    // Extract token and verify

    const token = authHeaders.split(" ")[1];

    const decoded = jwt.verify(token, config.ACCESS_JWT_SECRET);

    // Chcek if user exist

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User no longer exist",
      });
    }

    // Attach user to request and proceed 
    req.user = user;
    next();

  } catch (error) {

    if(error.name ==="TokenExpiredError"){
        return res.status(401).json({
            message : "Access token expired ",
            code : "TOKEN_EXPIRED"
        })
    }

    return res.status(401).json({
        message : "Invalid token"
    })
  }
};
