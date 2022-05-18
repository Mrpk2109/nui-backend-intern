import mongoose,{ Mongoose } from "mongoose";
const movieSchema = new mongoose.Schema({
    name: String,
    url: String,
    size: Number,
})
const MovieEx = mongoose.model("obj",movieSchema);
export default MovieEx;