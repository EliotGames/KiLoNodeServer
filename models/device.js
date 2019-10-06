const mongoose = require("mongoose");

const {
  REGEX_MAC_ADRESS,
  REGEX_NO_SPECIAL_CHARACTERS
} = require("../helpers/consts");
const { getIdValue } = require("../helpers/db");

const deviceSchema = mongoose.Schema({
  _id: {
    type: String,
    minlength: 5,
    default: getIdValue
  },
  mac: {
    type: String,
    required: true,
    unique: true,
    match: REGEX_MAC_ADRESS
  },
  name: {
    type: String,
    match: REGEX_NO_SPECIAL_CHARACTERS
  },
  currentWeight: {
    type: Number,
    min: 0
  },
  ownerId: {
    type: Number,
    required: true,
    ref: "User"
  },
  productId: {
    type: Number,
    ref: "Product"
  },
  maxWeight: {
    type: Number,
    min: 0
  },
  zeroWeight: {
    type: Number,
    default: 0,
    min: 0
  },
  alertOn: {
    type: Number,
    default: 20,
    min: 0,
    max: 100
  },
  lastCheck: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Device", deviceSchema);
