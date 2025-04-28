// external imports
const admin = require("../../firebase/firebaseAdmin");
const { apiResponse } = require("../../helpers");

// internal imports
const User = require("../../models/users");

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUser = async (req, res, next) => {
  const { uid, userId } = req.params;

  try {
    await admin.auth().deleteUser(uid);
    await User.findByIdAndDelete(userId);
    return apiResponse(res, 200, true, `${userId} User Delete Successfully`);
  } catch (error) {
    return apiResponse(res, 500, false, "Error deleting User.");
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
