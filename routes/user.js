const express = require("express");

const { createItem, loginUser, getAll, getById } = require("../controllers/user");

const router = express.Router();

router.post("/register", createItem);
router.post("/login", loginUser);
router.get("/", getAll);
router.get("/:id", getById);

module.exports = router;
