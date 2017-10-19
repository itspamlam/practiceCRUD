const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const toDoController = require('./ToDoController');

mongoose.connect('mongodb://pamlam:ilovetesting@ds057476.mlab.com:57476/crud');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

//using both to cover both GET and POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/www'));

const toDoRouter = express.Router();

toDoRouter.post('/create', toDoController.createToDo);

toDoRouter.get('/get', toDoController.getToDos);

toDoRouter.patch('/:id', toDoController.updateToDo);

toDoRouter.delete('/delete/:id', toDoController.deleteToDo);

app.use('/todo', toDoRouter);

const server = app.listen(3000, () => {
  console.log('listening at http://localhost:3000');
});

module.exports = server;
