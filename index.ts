import express,{ Express,Request,Response } from "express";
import connectMongo from "./src/mongo";
connectMongo();
import fileUpload,{UploadedFile} from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors"



const app:Express = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(express.static("uploads"));
app.use(fileUpload());
import router from "./src/routes/movie.route";


app.use((req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  })

app.use(router)

app.listen(process.env.port || "3000")
console.log(`App is start on port ${process.env.port}`);