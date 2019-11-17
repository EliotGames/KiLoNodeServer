const express = require("express");

const {
  createDevice,
  updateCurrentDeviceWeight,
  getAllDevices,
  getDeviceById,
  updateDevice,
  getDeviceConnectionStatus,
  updateDeviceConnectionStatus
} = require("../controllers/device.controller");

const router = express.Router();

router.post("/", createDevice);
router.patch("/:id/weight", updateCurrentDeviceWeight);
router.get("/", getAllDevices);
router.get("/:id", getDeviceById);
router.patch("/:id", updateDevice);
router.get("/:id/lastCheck", getDeviceConnectionStatus);
router.patch("/:id/lastCheck", updateDeviceConnectionStatus);

module.exports = router;
