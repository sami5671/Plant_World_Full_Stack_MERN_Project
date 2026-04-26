// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  signUp,
  login,
  socialLogin,
} = require("../controllers/auth/authController");
const { createJWT } = require("../middlewares/authMiddlewares");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */

// jwt
router.post("/jwt", createJWT);

// signUp route
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/signup", signUp);

// login route
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);

// social login route
router.post("/socialLogin", socialLogin);

// logout route

module.exports = router;
