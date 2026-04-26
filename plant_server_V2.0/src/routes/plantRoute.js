// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { addPlant, addTrendingPlant } = require("../controllers/admin/PlantController");
const { getAllPlants, getPlantById } = require("../controllers/plants/plantsController");
const { verifyToken } = require("../middlewares/authMiddlewares");
const { verifyRoles } = require("../middlewares/verifyRolesMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Plant:
 *       type: object
 *       required:
 *         - name
 *         - newPrice
 *         - stock
 *         - color
 *         - plantType
 *         - material
 *         - category
 *         - description
 *         - userId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the plant
 *         name:
 *           type: string
 *           description: The name of the plant
 *         previousPrice:
 *           type: number
 *         newPrice:
 *           type: number
 *         stock:
 *           type: number
 *         color:
 *           type: string
 *         plantType:
 *           type: string
 *         material:
 *           type: string
 *         category:
 *           type: string
 *         description:
 *           type: string
 *         trending:
 *           type: boolean
 *         userId:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               publicId:
 *                 type: string
 *               url:
 *                 type: string
 */

/**
 * @swagger
 * tags:
 *   name: Plants
 *   description: The plants managing API
 */

// open routes

/**
 * @swagger
 * /plant/getAllPlants:
 *   get:
 *     summary: Returns the list of all the plants
 *     tags: [Plants]
 *     responses:
 *       200:
 *         description: The list of the plants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plant'
 */
router.get("/getAllPlants", getAllPlants);

/**
 * @swagger
 * /plant/getPlantById/{id}:
 *   get:
 *     summary: Get the plant by id
 *     tags: [Plants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The plant id
 *     responses:
 *       200:
 *         description: The plant description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *       404:
 *         description: The plant was not found
 */
router.get("/getPlantById/:id", getPlantById);

// admin routes

/**
 * @swagger
 * /plant/addPlant:
 *   post:
 *     summary: Add a new plant
 *     tags: [Plants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plant'
 *     responses:
 *       201:
 *         description: The plant was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *       500:
 *         description: Some server error
 */
router.post("/addPlant", verifyToken, verifyRoles(["admin", "moderator"]), addPlant);

/**
 * @swagger
 * /plant/addTrendingPlant/{id}:
 *   patch:
 *     summary: Update a plant to be trending
 *     tags: [Plants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The plant id
 *     responses:
 *       200:
 *         description: The plant was updated
 *       404:
 *         description: The plant was not found
 *       500:
 *         description: Some error happened
 */
router.patch("/addTrendingPlant/:id", verifyToken, verifyRoles(["admin", "moderator"]), addTrendingPlant);

module.exports = router;
