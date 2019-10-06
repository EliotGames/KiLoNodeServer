const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: Number,
  email: String,
  phone: String,
  firstName: String,
  lastName: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
