//Require Dependencies:-
//imports the Express.js framework, creates a router, the router object will be used to define the routes for handling various requests.
const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middleware/jwt.middleware");
const { isAdmin } = require("../middleware/isAdmin");

//Require Models and Middleware:
//imports the Story model, the Story model represents the structure of a story in the application.
//The isAuthenticated middleware is used to check if a user is authenticated before allowing access to certain routes.
const Story = require("../models/story.model");
const Chapter = require("../models/chapter.model");

//Create a New Story:
//When a POST request is made to this route, it expects a JSON payload containing title,
//creator, and contributors properties in the request body.
router.post("/", isAuthenticated, async (req, res, next) => {
  const { title } = req.body;
  try {
    // Create a new story using the Story model and provided data
    const createdStory = await Story.create({
      title,
      creator: req.payload._id,
    });
    // Send a JSON response with the created story
    res
      .status(201)
      .json({ message: "You just started a story", story: createdStory });
  } catch (error) {
    next(error);
  }
});

//Delete a Story:
//This code defines a DELETE route at the path "/:id" of the router.
//It expects an id parameter in the URL.
//This route also requires the user to have administrative privileges (assumed isAdmin middleware is defined elsewhere).

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    // Find and delete a story by ID
    const deletedStory = await Story.findByIdAndDelete(req.params.id);
    const deletedChapter = await Chapter.deleteMany({ storyId: req.params.id });
    console.log("A story has been deleted:", deletedStory);
    if (!deletedStory) {
      // If no story is found, send a 404 response with an error message
      return res.status(404).json({
        message: `Could not match any document with the id ${req.params.id}`,
      });
    }
    // Send a JSON response with a success message
    res.json({ message: `deleted story with id ${req.params.id}` });
  } catch (error) {
    next(error);
  }
});

router.get("/", getAllStories);

async function getAllStories(req, res, next) {
  try {
    // Find all stories
    const allStories = await Story.find().populate("creator contributors");
    // Send a JSON response with all stories
    res.json(allStories);
  } catch (error) {
    next(error);
  }
}

router.get("/:id", async (req, res, next) => {
  try {
    // Find a story by ID
    const oneStory = await Story.findById(req.params.id);
    // Send a JSON response with the found story
    res.json(oneStory);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId", isAuthenticated, async (req, res, next) => {
  const { userId } = req.params;
  try {
    // Find stories where the user is the creator or a contributor
    const stories = await Story.find({
      $or: [{ creator: userId }, { contributors: userId }],
    })
      .populate("creator", "userName")
      .populate("contributors", "userName")
      .then((stories) => {
        res.json(stories);
      });

    // Send a JSON response with the found stories
    res.json(stories);
  } catch (error) {
    next(error);
  }
});

router.get("/:storyId", isAuthenticated, async (req, res, next) => {
  const { storyId } = req.params;
  try {
    const chapters = await Chapter.find({ storyId: storyId }).sort("createdAt");
    res.json(chapters);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
