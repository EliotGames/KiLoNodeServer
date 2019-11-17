const express = require("express");

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;
