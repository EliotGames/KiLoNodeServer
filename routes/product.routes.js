const express = require("express");

const { createItem, getAll, getById } = require("../controllers/product.controller");

const router = express.Router();

router.post("/", createItem);
router.get("/", getAll);
router.get("/:id", getById);

module.exports = router;
