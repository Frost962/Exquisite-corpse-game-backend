//importing the Express.js framework:
const express = require("express");

// creating a router to define routes and endpoints later
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isAdmin } = require("../middleware/isAdmin");

// importing the user model from the user.model.js file:
const User = require("../models/user.model");

// update user email or username if the user is Authenticated (isAuthenticated is a middleware function that checks if the user is authenticated):
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  // destructuring to extract the id property from the req.params object:
  const { id } = req.params;
  // destructuring to extract the email and userName properties from the req.body object:
  const { email, userName } = req.body;
  try {
    // db query to find 1 user with matching username
    const sameUser = await User.findOne({ userName: userName });
    // same but  searches for all users with a matching userName value in the database. For debugging purposes
    const userAgain = await User.find({ userName: userName });
    console.log("find:", userAgain, "findOne:", sameUser);
    // if a user with the same userName exists return error msg:
    if (sameUser) {
      return res
        .status(400)
        .json({ message: `user: ${userName} is not available` });
    }
    // else update the user with matching ID using email and username from the request body
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, userName: userName },
      // this line makes sure that we return the updated document:
      { new: true }
    );
    // sending a JSON response containing the updated user data to the client:
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// update one user's role if the user is authenticated & admin (isAdmin is a middleware used to restrict access to admins only):
router.patch("/role/:id", isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    // destructuring to get the users ID and role from the request parameters and body
    const { id } = req.params;
    const { role } = req.body;
    // db query to find a user with matching ID:
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
    console.log("There was a mistake when trying to update a users role");
  }
});

// delete a user by ID (admins only):
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    // query to find and delete a user with specified ID:
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    console.log("A user has been deleted:", deletedUser);
    // if there is no deletedUser, send a response with an error msg:
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
