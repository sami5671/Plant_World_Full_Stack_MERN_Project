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
  //   console.log(req.body);

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
  } = req.body;

  try {
    if (!id) {
      return apiResponse(res, 400, false, "User ID is required");
    } else {
      const updatedProfileInfo = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            fullName: fullName,
            email: email,
            alternativeEmail: alternativeEmail,
            primaryNumber: primaryNumber,
            alternativeNumber: alternativeNumber,
            occupation: occupation,
            gender: gender,
            DOB: DOB,
            address: address,
            role: role,
            biography: biography,
          },
        },
        { new: true }
      );

      return apiResponse(
        res,
        200,
        true,
        `${fullName} profile updated successfully`
      );
    }
  } catch (error) {
    return apiResponse(res, 500, false, "Error updating Profile");
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
