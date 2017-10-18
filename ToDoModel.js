const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema({
  todo: { type: String, required: true },
});

const ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = ToDo;
