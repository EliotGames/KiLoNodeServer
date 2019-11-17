const Measure = require("../models/measure");

/*
  Gets all measures
  Method: GET
  Url: api/measure
*/
const getAll = async (req, res, next) => {
  try {
    const measures = await Measure.find().exec();

    res.json(measures);
  } catch (e) {
    next(e);
  }
};

/*
  Gets a last measure for device
  Method: GET
  Url: api/measure/:deviceId
*/
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
