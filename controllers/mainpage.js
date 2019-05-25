const Task = require('../models/Task');

const loadMainpage = async (req, res) => {

  let doc = await Task.find({});

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
}

const addTask = (req, res) => {
  if (req.body.description) {

    const newTask = new Task({
      name: req.body.description,
      done: false
    })

    newTask.save()
      .then(result => {
        res.redirect('/');
      })
      .catch(err => {
        res.send('ooooopsie something went wrong');
      });
  } else {
    res.redirect('/');
  };
};

module.exports = { loadMainpage, addTask };