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
    servers: [
      {
        url: "https://plant-server-v2-0.vercel.app",
        description: "Production server",
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
