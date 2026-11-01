import express from "express";
import userRouter from "../routes/user.routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);

// Global Error Handler
app.use(errorMiddleware);

export default app;