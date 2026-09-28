
import config from "./config.js";
import mongoose from "mongoose";


const connectDB = async () =>{

    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Mongo DB connected suceessfully ✅");
        
    } catch (error) {
        console.log("Failed to connect DB ❌",error);
        process.exit(1)
        
    }
}


export default connectDB ;