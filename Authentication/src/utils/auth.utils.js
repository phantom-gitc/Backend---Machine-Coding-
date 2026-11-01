import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "./config.js";

// Generate Access token

export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, config.ACCESS_JWT_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRY,
  });
};

// Generate refresh token

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, config.REFRESH_JWT_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRY,
  });
};

// generate both access and Refresh token

export const generateTokens = (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

// Cookie options for refresh token

export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Set refresh token in cookie

export const setRefreshTokenInCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, cookieOptions);
};

// Clear refresh token from cookie

export const clearRefreshTokenFromCookie = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};
