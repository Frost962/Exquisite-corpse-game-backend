// import the Mongoose library:
const mongoose = require("mongoose");

// creates a new Mongoose schema for the User model
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    // array of favorite stories associated with the user.
    // It uses a reference to the "Story" model. Each element in the array
    // is an ObjectId referencing a specific story document in the "Story" collection
    favStories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
  },
  {
    // adds two additional fields to the schema: createdAt and updatedAt.
    // These fields store the timestamp when the document was created and last updated
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
