const express = require('express'); // create routes
const morgan = require('morgan'); // middleware for route
const bodyParser = require('body-parser'); // data reader
const mongoose = require('mongoose'); // mongodb agent
const cors = require('cors'); // adding cors npm install cors --save

const config = require('./config'); // db configuration

const app = express();

mongoose.connect(config.database, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to database');
    }
})

app.use(bodyParser.json()); // readind data in json format
app.use(bodyParser.urlencoded({extended: false})); // read all data type
app.use(morgan('dev')); // log request in terminal
app.use(cors()); 

app.get('/', (req, res, next) => {
    res.send("First HTTP");
});

app.listen(config.port, err => {
    console.log("Hello World");
});