
import connectMongo from "./src/mongo";
connectMongo();

import MovieEx from "./models/model";
import { resolve } from "path";
import { response } from "express";
import { request } from "http";

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');


const app = express();

app.use(express.static('public'))

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));



//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// movie create
app.post("/movie-create",(req,res) => {
  const payload = req.body;
  const movie = new MovieEx(payload);
  movie
    .save()
    .then(res.status(201).end())
    .catch((err) => {
      res.status(500).send({ message: err.message });
})
});

// get movie list
app.get("/list",async(req:Request,res:any)=>{
  MovieEx.find()
  .then((movies) => res.json(movies))
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
})
// get movie by id
 app.get("/byID",(req,res)=>{
  const id = req.query;
  MovieEx.findOne({ id: id })
    .then((movies) => res.json(movies))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
})
// update movie
app.put("update-movie",(req,res)=>{
  
})
// delete movie
// app.delete("delete-movie",()=>{

// })

// movie create multiple files

app.listen(process.env.port || "3000")
console.log(`App is start on port ${process.env.port}`);


