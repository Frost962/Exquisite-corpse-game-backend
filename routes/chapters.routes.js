const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isAdmin } = require("../middleware/isAdmin.js");
const express = require("express");
const router = express.Router();
const Chapter = require("../models/chapter.model.js");
const Story = require("../models/story.model.js");

router.post("/:storyId/", isAuthenticated, async (req, res, next) => {
  try {
    const { content } = req.body;
    const { _id } = req.payload;
    const { storyId } = req.params;
    const newChapter = { creator: _id, content, storyId };
    const createdChapter = await Chapter.create(newChapter);
    const updatedStory = await Story.findByIdAndUpdate(storyId, {
      $addToSet: {
        contributors: _id,
      },
    });
    res.json(createdChapter);
  } catch (error) {
    next(error);
  }
});

router.get("/:storyId", isAuthenticated, async (req, res, next) => {
  try {
    const { storyId } = req.params;
    const chapters = await Chapter.find({ storyId });
    res.json(chapters);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ message: "Chapter Deleted" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", isAdmin, async (req, res, next) => {
  try {
    const { content } = req.body;
    const updatedChapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    res.json(updatedChapter);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
