const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://pamlam:ilovetesting@ds057476.mlab.com:57476/crud');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

// const http = require('http'); WHAT IS THIS FOR?!?
// const server = http.createServer(app);

const bodyParser = require('body-parser');

// app.use(bodyParser.JSON

app.use(express.static(__dirname + '/www'));


const server = app.listen(3000, () => {
  console.log('listening at http://localhost:3000');
});

module.exports = server;