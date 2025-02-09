// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getAllUsers } = require("../controllers/admin/UsersController");

// get all users
router.get("/users", getAllUsers);

// export
module.exports = router;
