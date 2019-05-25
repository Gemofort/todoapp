const Task = require('../models/Task');

const taskDelete = async (req, res) => {

  Task.deleteOne({ _id: req.params.id })
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      res.send('ooooopsie something went wrong');
    });
};

module.exports = { taskDelete };