// models/Todo.js
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
});

const ProjectSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  name: {
      type: String,
      required: true
    },
  todos: [TodoSchema]
});
  
module.exports = mongoose.model('Todo', TodoSchema);
module.exports = mongoose.model('Project', ProjectSchema);
