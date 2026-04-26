const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Plant World API Documentation",
      version: "1.0.0",
      description: "API documentation for the Plant World Full Stack MERN Project",
      contact: {
        name: "Developer",
      },
    },
    tags: [
      { name: "Authentication", description: "User authentication and registration" },
      { name: "Plants", description: "The plants managing API" },
      { name: "Users", description: "User operations including cart, payments, and profile" },
      { name: "Admin", description: "Admin-only operations" },
    ],
    servers: [
      {
        url: "https://plant-server-v2-0.vercel.app",
        description: "Production server",
      },
      {
        url: "http://localhost:8080",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(process.cwd(), "/src/routes/*.js")], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
