const { default: mongoose } = require("mongoose");
const { apiResponse } = require("../../helpers");
const User = require("../../models/users");

const getUserProfile = async (req, res) => {
  const userId = req.params.id;
  //   console.log(userId);
  try {
    const user = await User.findOne({ _id: userId }).select("-password"); // Exclude password for security
    // console.log(user);
    if (!user) {
      return apiResponse(res, 404, false, "User not found", []);
    } else {
      return apiResponse(res, 200, true, "User fetched successfully", user);
    }
  } catch (error) {
    return apiResponse(res, 500, false, "Server Error", []);
  }
};

const updateUserProfile = async (req, res) => {
  const {
    id,
    fullName,
    email,
    alternativeEmail,
    primaryNumber,
    alternativeNumber,
    occupation,
    gender,
    DOB,
    address,
    role,
    biography,
    avatar,
  } = req.body;

  try {
    if (!id) {
      return apiResponse(res, 400, false, "User ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse(res, 400, false, "Invalid User ID");
    }

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (alternativeEmail) updateData.alternativeEmail = alternativeEmail;
    if (primaryNumber) updateData.primaryNumber = primaryNumber;
    if (alternativeNumber) updateData.alternativeNumber = alternativeNumber;
    if (occupation) updateData.occupation = occupation;
    if (gender) updateData.gender = gender;
    if (DOB) updateData.DOB = DOB;
    if (address) updateData.address = address;
    if (role) updateData.role = role;
    if (avatar) updateData.avatar = avatar;
    if (biography) updateData.biography = biography;

    const updatedProfileInfo = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedProfileInfo) {
      return apiResponse(res, 404, false, "User not found");
    }

    return apiResponse(
      res,
      200,
      true,
      `${updatedProfileInfo.fullName} profile updated successfully`,
      updatedProfileInfo
    );
  } catch (error) {
    if (error.code === 11000) {
      return apiResponse(
        res,
        400,
        false,
        "Duplicate field value entered",
        error.keyValue
      );
    }
    return apiResponse(
      res,
      500,
      false,
      "Error updating Profile",
      error.message
    );
  }
};

const updatePassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  try {
    if (!id || !oldPassword || !newPassword) {
      return apiResponse(res, 400, false, "All fields are required");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return apiResponse(res, 400, false, "Invalid User ID");
    }

    const user = await User.findById(id);
    if (!user) {
      return apiResponse(res, 404, false, "User not found");
    }

    // ✅ Check old password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return apiResponse(res, 400, false, "Old password is incorrect");
    }

    // ✅ Save new password (will be hashed by pre('save'))
    user.password = newPassword;
    await user.save();

    return apiResponse(res, 200, true, "Password updated successfully");
  } catch (error) {
    return apiResponse(res, 500, false, "Server Error", error.message);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  updatePassword,
};
