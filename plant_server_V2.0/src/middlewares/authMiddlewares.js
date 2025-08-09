const jwt = require("jsonwebtoken");

const createJWT = async (req, res) => {
  try {
    const user = req.body; // This should contain at least email or user id
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token: token });
  } catch (error) {
    console.error("JWT creation failed:", error);
    res.status(500).send({ error: "Token creation failed" });
  }
};

const verifyToken = (req, res, next) => {
  console.log("inside verify token", req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "forbidden-access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "forbidden-access" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = {
  createJWT,
  verifyToken,
};
