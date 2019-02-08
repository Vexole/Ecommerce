const express = require('express'); // create routes
const morgan = require('morgan'); // middleware for route
const bodyParser = require('body-parser'); // data reader
const mongoose = require('mongoose'); // mongodb agent

const app = express();

app.use(bodyParser.json()); // readind data in json format
app.use(bodyParser.urlencoded({extended: false})); // read all data type
app.use(morgan('dev')); // log request in terminal


app.get('/', (req, res, next) => {
    res.send("First HTTP");
});

app.listen(3030, err => {
    console.log("Hello");
});