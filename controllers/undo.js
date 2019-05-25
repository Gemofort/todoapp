const Task = require('../models/Task');

const undoDone = async (req, res) => {
  let doc = await Task.findOne({ _id: req.params.id });

  doc.done = false;
  doc.save()
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      res.send('ooooopsie something went wrong');
    });
};

module.exports = { undoDone };