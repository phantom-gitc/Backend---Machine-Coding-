import config from "./env.js";
import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        
        await mongoose.connect(config.MONGO_URI);
        console.log("MongoDB connected Sucessfully ✅ ");
        
    } catch (error) {

        console.log("Failed to connect MongoDB ❌" , error);
        process.exit(1)
        
        
    }
}


export default connectDB ;