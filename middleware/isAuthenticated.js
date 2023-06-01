const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

// This middleware check the JWT token sent on the request
async function isAuthenticated(req, res, next) {
  try {
    console.log("req.headers=", req.headers);
    // Getting the token from the request authorization headers
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }
    // Remove Bearer to verify the token
    token = token.replace("Bearer ", "");
    console.log(token);
    // Verification of the token
    const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
    });
    // Everything went well, trying to find the user in DB
    const user = await User.findById(payload._id);
    // Store the user on the request and go to the next middleware
    req.user = user;
    next();
  } catch (error) {
    // In case of error, go to error handler
    next(error);
  }
}

module.exports = isAuthenticated;
