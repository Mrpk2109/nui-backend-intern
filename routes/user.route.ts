import express from "express";
const router = express.Router();
import { regis,login } from "../controllers/user.controller";

router.post("/register",regis);
router.post("/login",login);

export default router;