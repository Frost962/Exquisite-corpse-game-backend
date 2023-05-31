const express = require("express");
const router = express.Router();

const Story = require("../models/story.model");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/", isAuthenticated, async (req, res, next) => {
  const { title, creator, contributors } = req.body;
  try {
    console.log(req.body);
    const createdStory = await Story.create({ title, creator });
    res
      .status(201)
      .json({ message: "You just started a story", story: createdStory });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.id);
    console.log("A story has been deleted:", deletedStory);
    if (!deletedStory) {
      return res.status(404).json({
        message: `Could not match any document with the id ${req.params.id}`,
      });
    }
    res.json({ message: `deleted story with id ${req.params.id}` });
  } catch (error) {
    next(error);
  }
});

router.get("/", getAllStories);

async function getAllStories(req, res, next) {
  try {
    const allStories = await Story.find();
    res.json(allStories);
  } catch (error) {
    next(error);
  }
}

router.get("/:id", async (req, res, next) => {
  try {
    const oneStory = await Story.findById(req.params.id);
    res.json(oneStory);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId", isAuthenticated, async (req, res, next) => {
  const { userId } = req.params;
  try {
    // Fetch the stories where the user is the creator or a contributor
    const stories = await Story.find({
      $or: [{ creator: userId }, { contributors: userId }],
    });

    // Send these stories back as a res
    res.json(stories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
