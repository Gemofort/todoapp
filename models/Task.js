const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;