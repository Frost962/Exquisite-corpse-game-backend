const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

async function isAuthenticated(req, res, next) {
  try {
    console.log("req.headers=", req.headers);
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }
    token = token.replace("Bearer ", "");
    console.log(token);
    const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
    });
    const user = await User.findById(payload._id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = isAuthenticated;
