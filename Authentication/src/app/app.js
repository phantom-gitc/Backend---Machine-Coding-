import express from "express";
import authRouter from "../routes/auth.routes.js";



// Initialize express app

const app = express();

// Middleware
app.use(express.json());
app.use("/api/auth", authRouter);





export default app;