import { error } from "console";
import mongoose  from "mongoose";
import { exit } from "process";

const {MONGO_URI } = process.env;

exports.connect = () => {
    mongoose
    .connect(MONGO_URI)
    .then(()=> {
        console.log("Successfully connected to database");
        
    })
    .catch((error)=>{
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });
};