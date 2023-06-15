const mongoose = require('mongoose');

// Define the todo schema
const todoschema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  }
});

// Define the user schema
const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  todos: [todoschema]
});

// Create the models
const Todo = mongoose.model('Todo', todoschema);
const User = mongoose.model('User', userschema);

module.exports = {
  Todo,
  User
};
