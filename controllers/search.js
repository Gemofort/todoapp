const Task = require('../models/Task');

const searchTasks = async (req, res) => {
  let doc = await Task.find({ name: new RegExp(req.body.name, "i") });

  let notDone = doc.filter((task) => {
    return !task.done;
  });

  let doneTasks = doc.filter((task) => {
    return task.done;
  });

  res.render('mainpage', {
    notDone,
    doneTasks
  });
};

module.exports = { searchTasks };