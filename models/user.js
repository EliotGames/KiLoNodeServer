const mongoose = require("mongoose");

const {
  REGEX_NO_SPECIAL_CHARACTERS,
  REGEX_EMAIL,
  REGEX_PHONE_NUMBER
} = require("../helpers/consts");

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      minlength: 5
    },
    email: {
      type: String,
      required: true,
      match: REGEX_EMAIL
    },
    phone: {
      type: String,
      required: true,
      unique: true,
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
      required: true,
      minlength: 6
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
