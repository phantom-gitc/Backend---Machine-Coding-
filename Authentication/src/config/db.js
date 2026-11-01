import dns from "dns";
import mongoose from "mongoose";
import config from "./config.js";
dns.setServers(["8.8.8.8" , "8.8.4.4"]);


const connectDB = async ()=>{
    try {
        
        mongoose.connect(config.MONGODB_URI);
        console.log("Connected to MongoDB ✅");
        
    } catch (error) {
        console.log("Error connecting to MongoDB ❌", error);
        process.exit(1);
    }
}

export default connectDB;