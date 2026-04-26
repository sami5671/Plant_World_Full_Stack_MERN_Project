// External imports
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv/config");

// Internal imports
const connectToDatabase = require("./database");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { apiResponse } = require("../helpers");
const { config } = require("../configs/config");
const authenticationRoute = require("../routes/authenticationRoute");
const plantRoute = require("../routes/plantRoute");
const userRoute = require("../routes/usersRoute");
const adminRoute = require("../routes/adminRoute");
const subscriberRoute = require("../routes/subscriberRoute");
const swaggerSpec = require("./swagger");

// Create app instance
const app = express();
const env = process.env.NODE_ENV || "development";

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "'unsafe-inline'"],
        styleSrc: ["'self'", "https://cdnjs.cloudflare.com", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        connectSrc: ["'self'", "https://plant-server-v2-0.vercel.app", "http://localhost:8000"],
      },
    },
  }),
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(config[env].corsOptions));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// Connect to MongoDB
connectToDatabase(config[env].databaseURI);

// routing setup
app.use("/auth", authenticationRoute);
app.use("/user", userRoute);
app.use("/plant", plantRoute);
app.use("/admin", adminRoute);
app.use("/subscriber", subscriberRoute);

// Swagger UI CDN-based HTML
const swaggerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Plant World API Documentation</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: "/api-docs.json",
        dom_id: '#swagger-ui',
        validatorUrl: null,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout",
      });
    };
  </script>
</body>
</html>
`;

app.get("/api-docs", (req, res) => {
  res.send(swaggerHtml);
});

// Route to get the Swagger JSON spec
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Home route
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Plant World!" });
});

// 404 route
app.use((req, res, next) => {
  return apiResponse(res, 404, false, "This route does not exist!");
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
