const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  telegramId: {
    type: String,
    required: false, // only required for telegram users
    index: {
      unique: true,
      partialFilterExpression: { telegramId: { $type: 'string' } },
    },
    default: null,
   }
});

module.exports = mongoose.model('User', userSchema);