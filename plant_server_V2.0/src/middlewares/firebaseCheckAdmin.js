const admin = require("../firebase/firebaseAdmin");

const checkFirebaseAdmin = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // console.log(decodedToken);

    // Now fetch full user record from Firebase
    const userRecord = await admin.auth().getUser(decodedToken.uid);

    // console.log(userRecord);

    // Check if the user has 'admin' in their custom claims
    if (userRecord.customClaims && userRecord.customClaims.admin === true) {
      next(); // Allow to continue
    } else {
      res
        .status(403)
        .send({ success: false, message: "Forbidden: You must be an admin." });
    }
  } catch (error) {
    console.error("Error verifying admin:", error);
    res
      .status(401)
      .send({ success: false, message: "Unauthorized: Invalid token." });
  }
};

module.exports = {
  checkFirebaseAdmin,
};
