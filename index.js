const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url,(err,db)=>{
    if(err) throw err;
    let dbo = db.db("mydb");
    let myquery = { name : "20Scoops CNX",adress : "123/45"}
    let newvalues = {$set: {name : "Miler",adress : "99/88"} }
    dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 Document updated!");
        db.close();
      });
})

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// app.post('/upload-avatar', async (req, res) => {
//   try {
//       if(!req.files) {
//           res.send({
//               status: false,
//               message: 'No file uploaded'
//           });
//       } else {
//           //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//           let avatar = req.files.avatar;
          
//           //Use the mv() method to place the file in upload directory (i.e. "uploads")
//           avatar.mv('./uploads/' + avatar.name);

//           //send response
//           res.send({
//               status: true,
//               message: 'File is uploaded',
//               data: {
//                   name:  avatar.name,
//                   mimetype: avatar.mimetype,
//                   size: avatar.size
//               }
//           });
//       }
//   } catch (err) {
//       res.status(500).send(err);
//   }
// });


// upload multiple files
app.post('/upload-photos', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          let data = []; 
  
          //loop all files
          _.forEach(_.keysIn(req.files.photos), (key) => {
              let photo = req.files.photos[key];
              
              //move photo to upload directory
              photo.mv('./uploads/' + photo.name);

              //push file details
              data.push({
                  name: photo.name,
                  mimetype: photo.mimetype,
                  size: photo.size
              });
          });
  
          //return response
          res.send({
              status: true,
              message: 'Files are uploaded',
              data: data
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

app.use(express.static('uploads'));

//start app 
const port = process.env.PORT || 3000;

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);