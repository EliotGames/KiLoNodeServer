const express = require("express");

const { createItem, getAll, getById } = require("../controllers/product");

const router = express.Router();

router.post("/", createItem);
router.get("/", getAll);
router.get("/:id", getById);

module.exports = router;
