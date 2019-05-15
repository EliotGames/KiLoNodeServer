const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
  _id: String,
  name: String,
  currentWeight: Number,
  maxWeight: Number,
  alertEmptiness: Number,
  productName: String,
  userIds: Array
});

module.exports = mongoose.model('Device', deviceSchema);