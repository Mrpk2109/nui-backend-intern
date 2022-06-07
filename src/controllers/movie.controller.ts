
import MovieEx,{ IMovie } from "../../models/model";
import express, {Express, Request ,Response} from "express";
import {UploadedFile} from "express-fileupload";



export const viewMovie = (req:Request,res:Response)=>{
    MovieEx.find()
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export const findId = (req:Request,res:Response)=>{
    const id = req.params.id;
  MovieEx.findById({ _id: id })
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export const getMovie = (req,res)=>{
    const payload = req.body;
    const movie = new MovieEx(payload);
    console.log(payload);
    movie
      .save()
      .then(res.status(201).end())
      .catch((err) => {
        res.status(500).send({ message: err.message });
  })
}

export const getPic =  (req: Request, res: any) => {
    const image = req?.files?.image as UploadedFile;

    const uploadPath = __dirname + "/uploads/" + image.name;

    image.mv(uploadPath, (err) => {
        if (err)
            console.log(err);
    });
    const data = {
        ...req.body,
        price: req.body.price / 30 + "Dollars",
        image: {
            url: `http://localhost:${process.env.port}/${image.name}`,
            size: image.size,
            name: image.name,
        },
    };
    const movie = MovieEx.create(data);
    movie
        .then(res.send(movie))
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

export const updateMovie = (req:Request,res:Response)=>{
    const movie = MovieEx.findByIdAndUpdate(req.params.id, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update movie`
        });
      } else {
        res.send({
          message: "Tutorial was update successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not update movie with id=${req.params.id}`
      })
      });  
}

export const deleteMovie = (req:Request,res:Response)=>{
    const id =  req.params.id;
  MovieEx.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
}

export default exports;