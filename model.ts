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

// export interface EImage{
//     url: string;
//     name: string;
//     size: string;
// }

type MovieDocument = IMovie & Document;
//type ImageDocument = Image & Document;

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

// const image_S = new Schema<ImageDocument>({
//     url: String,
//     name:{type: String, required: true},
//     size: String,

// })

export const Movie = model<MovieDocument>("movies",movieSchema)
// export const Image_e = model<ImageDocument>("images",image_S)