const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

// update user email username
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { email, userName } = req.body;
  try {
    const sameUser = await User.findOne({ userName: userName });
    const userAgain = await User.find({ userName: userName });
    console.log("find:", userAgain, "findOne:", sameUser);
    if (sameUser) {
      return res
        .status(400)
        .json({ message: `user: ${userName} is not available` });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, userName: userName },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// update role
router.patch("/role/:id", isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// delete user
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    console.log("A user has been deleted:", deletedUser);
    if (!deletedUser) {
      return res.status(404).json({
        message: `Could not match any document with the id ${req.params.id}`,
      });
    }
    res.json({ message: `deleted document with id ${req.params.id}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
