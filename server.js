const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var db, collection;
const url = "mongodb+srv://burhanali:2short2me@cluster0.e7moc1a.mongodb.net/companyInfo?retryWrites=true&w=majority";
const dbName = "companyInfo";

app.listen(7500, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db();
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("results")
    .find()
    .toArray((err, allDocuments) => {
      if (err) return console.log(err);
      res.render("index.ejs", { companyInfo : allDocuments });
    });
});

app.post("/saveCompanyInfo", (req, res) => {
  db.collection("results").insertOne(
    {businessName: req.body.businessname,addLocation: req.body.location,servicesProvided: req.body.services, addComments: req.body.comments},
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});
app.delete("/delete", (req, res) => {
  db.collection("results").findOneAndDelete(
    { businessName: req.body.deleteBusinessName,addLocation: req.body.deleteLocation,servicesProvided: req.body.deleteServices, addComments: req.body.deleteComments},
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});
