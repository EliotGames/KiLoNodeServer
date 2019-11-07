const express = require("express");

const { getAll, getLastMeasureOfDevice } = require("../controllers/measure");

const router = express.Router();

router.get("/", getAll);
router.get("/:deviceId", getLastMeasureOfDevice);

module.exports = router;
