const ToDo = require('./ToDoModel');

const ToDoController = {

  createToDo(req, res) {
    console.log(req);
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

  updateToDo(req, res) {
    ToDo.findOneAndUpdate({ _id: req.params._id })
      .then((updatedDoc) => {
        if (!updatedDoc) res.status(500).send('Not found');
        res.status(200).send(updatedDoc);
      })
      .catch((err) => res. status(500).send());
  },

  deleteToDo(req, res) {
    console.log(req.params);
    ToDo.findOneAndRemove({ _id: req.params.id })
      .then((deletedDoc) => {
        if (!deletedDoc) res.status(418).send('Not found');
        res.status(200).send(deletedDoc);
      })
      .catch(() => res.status(500).send());
  },
};

module.exports = ToDoController;
