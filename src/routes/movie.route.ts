import express from "express";
const router = express.Router();
import {viewMovie,findId, getMovie, deleteMovie, updateMovie, getPic} from "../controllers/movie.controller";


router.post("/movies",getMovie)
router.post("/movies",getPic)
router.get("/list", viewMovie)
router.get("/byID/:id", findId)
router.put("/update-movie",updateMovie)
router.delete("/delete-movie",deleteMovie)

export default router;