const express = require("express");

const { getAll } = require("../controllers/measure");

const router = express.Router();

router.get("/", getAll);

module.exports = router;
