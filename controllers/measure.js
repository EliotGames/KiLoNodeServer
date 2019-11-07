const express = require("express");
const router = express.Router();
const HttpStatus = require("http-status-codes");
const Measure = require("../models/measure");

// Get all measures
const getAll = async (req, res, next) => {
  try {
    const measures = await Measure.find().exec();

    res.json(measures);
  } catch (e) {
    next(e);
  }
};

const getLastMeasureOfDevice = async (req, res, next) => {
  const { deviceId } = req.params;

  try {
    const lastMeasure = await Measure.findOne({ deviceId }).sort("-date");

    res.json(lastMeasure);
  } catch (error) {
    next(e);
  }
};

module.exports = {
  getAll,
  getLastMeasureOfDevice
};
