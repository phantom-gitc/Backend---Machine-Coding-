import userModel from "../models/auth.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "./config.js";
import { generateTokens, setRefreshTokenInCookie, clearRefreshTokenFromCookie } from "../utils/auth.utils.js";



// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public

export const registerUser = (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name , email and password are required ",
            });
        }


        const isUserAlreadyExist = await userModel.findOne({ email: email.toLowerCase() })


        if (isUserAlreadyExist) {
            return res.status(409).json({
                message: "An account with this email already exist "
            })
        }



        // hashed the password 

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({

            name,
            email: email.toLowerCase(),
            password: hashedPassword

        })


        const { accessToken , refreshToken  } = generateTokens(user._id);


        user.refreshToken = refreshToken;
        await user.save();


        setRefreshTokenInCookie(res , refreshToken);


        return res.status(201).json({
            message : "User register sucessfully ." ,
            user : {
                id : user._id,
                name : user.name ,
                email : user.email,
            },
            accessToken , refreshToken
        })

    } catch (error) {

        return res.status(500).json({
            message : "Registrantion failed ",
            error : error.message
        })
     }
};


export const loginUser = (req , res )=>{

  try {
      const {email , password} = req.body;


    if(!email || !password){
        return res.status(400).json({
            message : "Email and password are required "
        })
    }


    // Find user by email 

    const user = await userModel.findOne({email :email.toLowerCase()}).select("+password +refreshToken");


    if(!user){{
        return res.status(401).json({
            message : "Invalid email or password "
        })
    }}


    // Compare password 

    const isMatch = await bcrypt.compare(password , user.password);



    if(!isMatch){
        return res.status(401).json({
            message : "Invalid email or password"
        })
    }

    const { accessToken , refreshToken} = generateTokens(user._id);



    // Store refresh token in  DB
    user.refreshToken = refreshToken ;
    await user.save();

    // Store refresh token in Cookies 

    setRefreshTokenInCookie(res , refreshToken);


    return res.status(200).json({
        message : "Login Sucessfully ",
        user : {
            id : user._id,
            name : user.name,
            email : user.email ,
        },
        accessToken , refreshToken
    })


  } catch (error) {
    

    return res.status(500).json({
        message : "Login Failed" ,
        error : error.message
    })
  }


}