async function isAdmin(req, res, next) {
  try {
    console.log("req.user=", req.user);
    console.log("req=", req);
    if (req.user.status === "admin") {
      return next(); // allows to go to next only if user role = admin
    }
    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    next(error);
  }
}

module.exports = isAdmin;
