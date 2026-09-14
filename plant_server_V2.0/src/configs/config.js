const allowedOrigins = [
  "https://plant-world-v2.web.app",
  "https://plant-world-v2.firebaseapp.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
];

const config = {
  development: {
    corsOptions: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || process.env.CORS_ORIGINS?.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, true);
        }
      },
      credentials: true,
      optionSuccessStatus: 200,
    },
    databaseURI: process.env.DEV_DATABASE_URL,
  },
  production: {
    corsOptions: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || process.env.CORS_ORIGINS?.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, true);
        }
      },
      credentials: true,
      optionSuccessStatus: 200,
    },
    databaseURI: process.env.PROD_DATABASE_URL,
  },
};

module.exports = {
  config,
};

