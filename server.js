const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const compiler = webpack(webpackConfig);

const toDoController = require('./ToDoController');

mongoose.connect('mongodb://pamlam:ilovetesting@ds057476.mlab.com:57476/crud');
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

//using both to cover both GET and POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/www'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

const toDoRouter = express.Router();

//app.post('/login', userController.getUser, function (req, res) {
  // return res.redirect('/todo.html');
// })

toDoRouter.post('/create', toDoController.createToDo);

toDoRouter.get('/get', toDoController.getToDos);

toDoRouter.post('/update/:id', toDoController.updateToDo);

toDoRouter.delete('/delete/:id', toDoController.deleteToDo);

app.use('/todo', toDoRouter);

const server = app.listen(3000, () => {
  console.log('listening at http://localhost:3000');
});

module.exports = server;
