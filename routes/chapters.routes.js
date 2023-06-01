const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/", async (req, res, next) => {
  try {
    const { creator, content, storyId } = req.body;
    const newChapter = { creator, content, storyId };
    await newChapter.create(newChapter);
    res.json(newChapter);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);
    res.json({ message: "Chapter Deleted" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
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

router.get(
  "/story/:storyId/chapters",
  isAuthenticated,
  async (req, res, next) => {
    const { storyId } = req.params;
    try {
      const chapters = await Chapter.find({ storyId: storyId });
      res.json(chapters);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
