const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { getIdValue } = require("../helpers/db");
const {
  REGEX_NO_SPECIAL_CHARACTERS,
  REGEX_EMAIL,
  REGEX_PHONE_NUMBER
} = require("../helpers/consts");

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      minlength: 5,
      default: getIdValue
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: REGEX_EMAIL
    },
    phone: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
      match: REGEX_PHONE_NUMBER
    },
    firstName: {
      type: String,
      match: REGEX_NO_SPECIAL_CHARACTERS
    },
    lastName: {
      type: String,
      match: REGEX_NO_SPECIAL_CHARACTERS
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", function(next) {
  const user = this;

  bcrypt.hash(user.password, +process.env.SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });

});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
