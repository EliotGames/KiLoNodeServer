const express = require("express");

const { getAllMeasures, getLastMeasureOfDevice } = require("../controllers/measure.controller");

const router = express.Router();

router.get("/", getAllMeasures);
router.get("/:deviceId", getLastMeasureOfDevice);

module.exports = router;
