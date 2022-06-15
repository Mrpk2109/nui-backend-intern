import express from "express";
const router = express.Router();
import {viewMovie,findId, getMovie, deleteMovie, updateMovie, getPic} from "../controllers/movie.controller";
import verifyToken from "../middlewares/auth";


router.post("/movie-create",verifyToken,getMovie)
router.post("/movies",verifyToken,getPic)
router.get("/list", viewMovie)
router.get("/byID/:id", findId)
router.put("/update-movie",verifyToken,updateMovie)
router.delete("/delete-movie",verifyToken,deleteMovie)

export default router;