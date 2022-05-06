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