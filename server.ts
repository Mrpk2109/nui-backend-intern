import connectMongo from "./src/mongo";
connectMongo();

import MovieEx, { IMovie } from "./models/model";

import express, {Express, Request ,Response} from "express";
import fileUpload,{UploadedFile} from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors"



const app:Express = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static("uploads"));
app.use(fileUpload());

app.use((req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

// movie create /.then
app.post("/movie-create",(req:any, res:any) => {
  const payload = req.body;
  const movie = new MovieEx(payload);
  // console.log(price);
  
  movie
    .save()
    .then(res.status(201).end())
    .catch((err) => {
      res.status(500).send({ message: err.message });
})
});
//movie create /async await
// app.post("/movie-create",async(req: Request,res: Response) => {
//   const payload = req.body;
//   const movie = await MovieEx.create(payload);
//   res.send(movie);
// })
interface MovieRequest extends Request{
  body: IMovie;
}
//create picture and data .then
app.post("/movies",(req: Request, res: any)=>{
  const image = req?.files?.image as UploadedFile;
  
  const uploadPath = __dirname + "/uploads/" + image.name;

  image.mv(uploadPath,(err)=>{
      if(err) console.log(err);
  });
  const data = {

    ...req.body,
    price : req.body.price / 30 + "Dollars",
    image:{
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
  })
})

// //create picture and data async await
// app.post("/movies",async(req:Request,res:Response)=>{
//   const image = req?.files?.image as UploadedFile;
//   const uploadPath = __dirname + "/uploads/" + image.name;

//   image.mv(uploadPath,(err)=>{
//     if(err) console.log(err);
// });
// const data = {

//   ...req.body,
//   price : req.body.price / 30 + "Dollars",
//   image:{
//     url: `http://localhost:${process.env.port}/${image.name}`,
//     size: image.size,
//     name: image.name,
//   },
 
// };
//   const movie = await MovieEx.create(data)
//   res.send(movie)
// })

// get movie list .then
app.get("/list",(req: MovieRequest, res: Response)=>{
  MovieEx.find()
  .then((movies) => res.json(movies))
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
})
// // get movie list async await
// app.get("/list",async (req:MovieRequest,res:Response)=>{
//   try{
//     const find = await MovieEx.find()
//     res.send(find)
//   }catch(err) {
//     res.status(500).send({ message: err });
//   }

  
// })

// get movie by id
 app.get("/byID/:id",(req: MovieRequest, res: Response)=>{
  res.send('USER')
  const id = req.params.id;
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

app.listen(process.env.port || "3000")
console.log(`App is start on port ${process.env.port}`);
