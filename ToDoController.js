const ToDo = require('./ToDoModel');

const ToDoController = {

  createToDo(req, res) {
    ToDo.create(req.body)
      .then(doc => res.status(200).send(doc))
      .catch(() => res.status(500).send());
  },

  getToDos(req, res) {
    ToDo.find(req.query, (err, found) => {
      if (found) {
        res.send(found);
      } else {
        res.send(err);
      }
    });
  },

  deleteToDo(req, res) {
    ToDo.findOneAndRemove({ _id: req.params._id })
      .then((deletedDoc) => {
        if (!deletedDoc) res.status(418).send('Not found');
        res.status(200).send(updatedDoc);
      })
      .catch(() => res.status(500).send());
  },
};

module.exports = ToDoController;
