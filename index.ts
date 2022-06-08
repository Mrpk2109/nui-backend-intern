//import express
import express,{ Express,Request,Response } from "express";

//import connect mongodb
import connectMongo from "./connect/mongo";
connectMongo();

//import package
import fileUpload,{UploadedFile} from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors"

//import route
import router from "./routes/movie.route";

//import middleware
import { requestTime } from "./middlewares/date.middleware";
import { requestMethod } from "./middlewares/reqmeth.middleware";

//use express
const app:Express = express();

//use package
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("uploads"));
app.use(fileUpload());

//middleware
app.use(requestMethod)
app.use(requestTime)

//use route
app.use(router)

app.listen(process.env.port || "3000")
console.log(`App is start on port ${process.env.port}`);