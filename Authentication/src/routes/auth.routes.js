import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers";

const authRouter = Router();



// Routes
authRouter.post("/register" ,registerUser );
authRouter.post('/login')



export default authRouter;