const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const url = "mongodb://localhost:27017";
const nameDB = "beatles_db";
const app = express();
const port = 3000;
app.use('/', express.static('.'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//Appeals
app.get("/appeals", function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) return console.log(err);
        dbClient = client;
        app.locals.collection = client.db(nameDB).collection("appeals");
        const collection = req.app.locals.collection;
        collection.find().toArray(function (err, appeals) {
            if (err) return console.log(err);
            res.send(appeals)
            dbClient.close();
        });
    });
});

app.post("/appeals", function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) return console.log(err);
        dbClient = client;
        app.locals.collection = client.db(nameDB).collection("appeals");
        if (!req.body) return res.sendStatus(400);
        const collection = req.app.locals.collection;
        collection.insertOne(req.body, function (err, result) {
            if (err) return console.log(err);
            dbClient.close();
        });
    });
});

//News
app.get("/news", function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) return console.log(err);
        dbClient = client;
        app.locals.collection = client.db(nameDB).collection("news");
        const collection = req.app.locals.collection;
        collection.find().toArray(function (err, news) {
            if (err) return console.log(err);
            res.send(news)
            dbClient.close();
        });
    });
});

app.post("/news", function (req, res) {
    mongoClient.connect(url, function (err, client) {
        if (err) return console.log(err);
        dbClient = client;
        app.locals.collection = client.db(nameDB).collection("news");
        if (!req.body) return res.sendStatus(400);
        const collection = req.app.locals.collection;
        collection.insertOne(req.body, function (err, result) {
            if (err) return console.log(err);
            dbClient.close();
        });
    });
});

app.listen(port, function () {
    console.log("Listening at port", port);
});


