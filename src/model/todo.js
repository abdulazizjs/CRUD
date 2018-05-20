const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  surname: {
    type: String,
    minlength: 1
  },
  status: {
    type: Boolean
  }
});

var Todo = mongoose.model('Todo', UserSchema);

module.exports = {Todo};
