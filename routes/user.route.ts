import express from "express";
const userRoute = express.Router();
import { regis,login, welcome } from "../controllers/user.controller";
import verifyToken  from "../middlewares/auth"

userRoute.post("/register",regis);
userRoute.post("/login",login);
userRoute.get("/welcome",verifyToken,welcome);
export default userRoute;