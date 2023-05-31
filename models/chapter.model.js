const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  StoryId: {
    type: Number,
    required: true,
  },
});

const Chapter = mongoose.model("Chapter", ChapterSchema);

module.exports = Chapter;
