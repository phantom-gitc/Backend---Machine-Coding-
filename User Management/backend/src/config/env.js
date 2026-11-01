import dotenv from "dotenv";
dotenv.config();



if(!process.env.MONGO_URI){
    throw new Error("Missing MONGO_URI variable")
}

const config = {

    MONGO_URI : process.env.MONGO_URI,
    PORT : process.env.PORT || 3000,
    
}

export default config