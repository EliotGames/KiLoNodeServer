const express = require("express");
const router = express.Router();
const HttpStatus = require("http-status-codes");
const Measure = require("../models/measure");

// Get all measures
const getAll = (req, res, next) => {
  Measure.find()
    .exec()
    .then(docs => {
      res.json(docs);
    })
    .catch(err => next(err));
};

module.exports = {
  getAll
}
