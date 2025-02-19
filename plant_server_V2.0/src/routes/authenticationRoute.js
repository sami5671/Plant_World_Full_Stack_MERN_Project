// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  signUp,
  login,
  socialLogin,
} = require("../controllers/auth/authController");

// signUp route
router.post("/signup", signUp);

// login route
router.post("/login", login);

// social login route
router.post("/socialLogin", socialLogin);

// logout route

module.exports = router;
