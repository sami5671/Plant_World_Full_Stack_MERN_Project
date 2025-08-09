// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal imports
const User = require("../../models/users");
const { apiResponse } = require("../../helpers");

// User registration(signUp)
const signUp = async (req, res, next) => {
  // console.log(req.body);
  try {
    // Validate request body
    const { fullName, email, password, avatar, address, DOB } = req.body;

    if (!fullName || !email || !password) {
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
      fullName,
      email,
      password: hashedPassword,
      avatar,
      address,
      DOB,
    });

    await newUser.save();

    // Find user after saving
    const user = await User.findOne({ email });
    return apiResponse(res, 200, true, "Successfully registered!", {
      user,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return apiResponse(res, 500, false, "Unknown error during registration!");
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return apiResponse(res, 404, false, "User not found!!");
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return apiResponse(res, 401, false, "Invalid Email or Password!!");
    } else {
      const userObject = {
        userId: user._id,
        userName: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
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

const socialLogin = async (req, res, next) => {
  // console.log(req.body);
  try {
    const {
      fullName,
      email,
      gender,
      avatar,
      address,
      DOB,
      providerId,
      provider,
    } = req.body;
    const user = await User.findOne({ $or: [{ email }, { providerId }] });

    if (!user) {
      // Create new user instance
      const newUser = new User({
        fullName,
        email,
        gender,
        avatar,
        address,
        DOB,
        providerId,
        provider,
      });
      await newUser.save();
      // find existing user
      const userObject = await User.findOne({
        $or: [{ email }, { providerId }],
      });
      return apiResponse(res, 200, true, "Successfully signed In!", userObject);
    } else {
      return apiResponse(res, 200, true, "Successfully signed In!", user);
    }
  } catch (error) {
    return apiResponse(res, 400, false, "Error signing In", error);
  }
};
module.exports = {
  signUp,
  login,
  socialLogin,
};
