import { Schema, model, Document } from "mongoose";
import { type } from "os";

interface Image{
    url: string;
    name: string;
    size: string;
}

export interface IMovie{
    name: string;
    details: string;
    price: number;
    image: Image;
}

type MovieDocument = IMovie & Document;

const imageSchema = new Schema<Image>(
    {
        url: String,
        name: String,
        size: Number, 
    },
    {
        _id: false,
    }
);

const movieSchema = new Schema<MovieDocument>({
    name:{ type: String, required: true},
    details: String,
    image: imageSchema,
});


export const Movie = model<MovieDocument>("movies",movieSchema)
