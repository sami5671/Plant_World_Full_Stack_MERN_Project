// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal imports
const User = require("../../models/users");
const { apiResponse } = require("../../helpers");

// User registration(signUp)
const signUp = async (req, res, next) => {
  try {
    // Validate request body
    const { name, email, password, role, avatar, mobile } = req.body;

    if (!name || !email || !password) {
      return apiResponse(
        res,
        400,
        false,
        "Name, Email, and Password are required!"
      );
    }

    // Hash password with proper validation
    const saltRounds = 10; // Recommended value for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      avatar,
      mobile,
    });

    await newUser.save();

    // Find user after saving
    const user = await User.findOne({ email });

    if (!user) {
      return apiResponse(res, 500, false, "User creation failed!");
    }

    // Construct user object (avoid sending password)
    const userObject = {
      userId: user._id,
      userName: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      mobile: user.mobile,
      createdAt: user.createdAt,
    };

    // Generate token
    const token = jwt.sign(userObject, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || "7d", // Default expiry if missing
    });

    return apiResponse(res, 200, true, "Successfully registered!", {
      user: userObject,
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return apiResponse(res, 500, false, "Unknown error during registration!");
  }
};

const login = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return apiResponse(res, 404, false, "User not found!!");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return apiResponse(res, 401, false, "Invalid Email or Password!!");
    } else {
      console.log("else block");
      const userObject = {
        userId: user._id,
        userName: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        mobile: user.mobile,
        createdAt: user.createdAt,
      };

      // Generate token
      const token = jwt.sign(userObject, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      // Set cookie
      res.cookie(process.env.COOKIE_NAME, token, {
        maxAge: parseInt(process.env.JWT_EXPIRY, 10), // Ensure maxAge is a number
        httpOnly: true,
        signed: true,
      });

      return apiResponse(res, 200, true, "Successfully logged in!!", {
        data: userObject,
        token,
      });
    }
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    return apiResponse(res, 500, false, "Unknown error during login!!");
  }
};

module.exports = {
  signUp,
  login,
};
