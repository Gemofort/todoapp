const Task = require('../models/Task');

const delDone = async (req, res) => {

  Task.deleteMany({ done: true })
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      res.send('ooooopsie something went wrong');
    });
};

module.exports = { delDone };