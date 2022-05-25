
import connectMongo from "./src/mongo";
connectMongo();

import MovieEx, { IMovie} from "./models/model";
import { Request ,Response} from "express";
import multer, { Multer } from "multer";
import fileUpload,{UploadedFile} from "express-fileupload";
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const UploadedFile = multer({dest: 'upload/'})

const app = express();

app.use(express.static('uploads'))
app.use(fileUpload())

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));


//add other middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

interface MovieRequest extends Request{
  body: IMovie;
}

// movie create
app.post("/movie-create",(req: any, res: any) => {
  const payload = req.body;
  console.log(payload)
  res.send()
//   const movie = new MovieEx(payload);
//   movie
//     .save()

//     .catch((err) => {
//       res.status(500).send({ message: err.message });
// })
});


// app.post("/movies",async(req: MovieRequest, res: Response)=>{
//   const image = req?.files?.image as UploadedFile;
//   const uploadPath = __dirname + "/uploads" + image.name;

//   image.mv(uploadPath,(err)=>{
//       if(err) console.log(err);
//   });

//   const data = {
//     ...req.body,
//     image:{
//       url: `http://localhost:${process.env.port}/${image.name}`,
//       size: image.size,
//       name: image.name,
//     },
//   };
//   res.send(data)
// })


// get movie list
app.get("/list",async(req: MovieRequest, res: Response)=>{
  MovieEx.find()
  .then((movies) => res.json(movies))
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
})
// get movie by id
 app.get("/byID/:id",async(req: MovieRequest, res: Response)=>{
  const id = await req.params.id;
  MovieEx.findById({ _id: id })
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
})
// update movie
app.put("/update-movie/:id",(req: MovieRequest, res: Response)=>{
  //const payload = req.params.id;
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
})
// delete movie
app.delete("/delete-movie/:id",(req: MovieRequest, res: Response)=>{
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
})

// movie create multiple files

app.listen(process.env.port || "3000")
console.log(`App is start on port ${process.env.port}`);


