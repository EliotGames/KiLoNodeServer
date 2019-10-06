const express = require("express");

const {
  createItem,
  getAll,
  getById,
  updateItem,
  getConnectionStatus,
  updateConnectionStatus
} = require("../controllers/device");

const router = express.Router();

router.post("/", createItem);
router.get("/", getAll);
router.get("/:id", getById);
router.patch("/:id", updateItem);
router.get("/:id/lastCheck", getConnectionStatus);
router.patch("/:id/lastCheck", updateConnectionStatus);

module.exports = router;
