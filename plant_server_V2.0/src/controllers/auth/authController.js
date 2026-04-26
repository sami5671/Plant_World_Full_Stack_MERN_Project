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
    const { fullName, name, email, password, avatar, address, DOB } = req.body;
    const finalFullName = fullName || name;

    if (!finalFullName || !email || !password) {
      return apiResponse(res, 400, false, "Name, Email, and Password are required!");
    }

    // Create new user instance (password will be hashed by User model's pre-save hook)
    const newUser = new User({
      fullName: finalFullName,
      email,
      password,
      avatar,
      address,
      DOB,
    });

    const savedUser = await newUser.save();

    // Create a clean user object for the response
    const userObject = {
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      avatar: savedUser.avatar,
      address: savedUser.address,
      DOB: savedUser.DOB,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
    };

    return apiResponse(res, 201, true, "Successfully registered!", {
      user: userObject,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.code === 11000) {
      return apiResponse(res, 400, false, "Email already exists!");
    }
    return apiResponse(res, 500, false, "Unknown error during registration!");
  }
};

const login = async (req, res) => {
  try {
    console.log("login", req.body);
    const { email, password } = req.body;

    if (!email || !password) return apiResponse(res, 400, false, "Email and password are required!");

    const user = await User.findOne({ email });

    if (!user) return apiResponse(res, 404, false, "User not found!");

    if (!user.password) return apiResponse(res, 400, false, "Please login using social provider");

    console.log("Received password:", `"${password}"`); // debug
    console.log("Hashed password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return apiResponse(res, 401, false, "Invalid Email or Password!");

    const userObject = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      gender: user.gender,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };

    const token = jwt.sign(userObject, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    return apiResponse(res, 200, true, "Successfully logged in!", {
      user: userObject,
      token,
    });
  } catch (error) {
    console.error(error);
    return apiResponse(res, 500, false, "Unknown error during login!");
  }
};

const socialLogin = async (req, res, next) => {
  // console.log(req.body);
  try {
    const { fullName, email, gender, avatar, address, DOB, providerId, provider } = req.body;
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
