const Task = require('../models/Task');

const taskDone = async (req, res) => {
  let doc = await Task.findOne({ _id: req.params.id });

  doc.done = true;
  doc.save()
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      res.send('ooooopsie something went wrong');
    });
};

module.exports = { taskDone };