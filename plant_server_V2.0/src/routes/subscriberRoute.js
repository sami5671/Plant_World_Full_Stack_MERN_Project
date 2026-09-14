const express = require("express");
const router = express.Router();
const { subscribe, getAllSubscribers } = require("../controllers/subscriberController");

/**
 * @swagger
 * tags:
 *   name: Newsletter
 *   description: Newsletter subscription management
 */

/**
 * @swagger
 * /subscriber/subscribe:
 *   post:
 *     summary: Subscribe to the newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: Subscribed successfully
 *       400:
 *         description: Email already exists or invalid
 *       500:
 *         description: Server error
 */
router.post("/subscribe", subscribe);

/**
 * @swagger
 * /subscriber/all:
 *   get:
 *     summary: Get all subscribers
 *     tags: [Newsletter]
 *     responses:
 *       200:
 *         description: List of all subscribers
 *       500:
 *         description: Server error
 */
router.get("/all", getAllSubscribers);

module.exports = router;
