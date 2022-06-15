import express,{Request,Response} from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user.model"
require("dotenv").config();




const app = express();

const bodyParser = require('body-parser')

export const regis = async(req:Request,res:Response)=>{
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        
       const encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
}

export const login = async(req:Request, res:Response)=>{
    //Our login logic starts here
    try{
        //Get user input
        const {email,password}=req.body;

        //Validate if user input
        if(!(email&&password)){
            res.status(400).send("All input is required");
        }
        //Validate id user exist in our database
        const user = await User.findOne({ email });

        if(user && (await bcrypt.compare(password,user.password))){
            //Crate token
            const token = jwt.sign(
                {user_id: user._id,email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            //save user token
            user.token = token;

            //user
            return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    }catch (err){
        console.log(err);
    }
}

export const welcome = (req:Request,res:Response)=>{
  res.status(200).send("welcome 🙌");
}

export default exports;