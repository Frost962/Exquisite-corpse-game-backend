const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: {
    type: String, // not sure yet about that property
    required: true,
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contributors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
// we need a bit of code to push contributors in this array whenever a chapter is created if their id is not alrdy in it
// maybe we also need a 'first prompt' property for the starting sentence that directs chatgpt?

const Story = mongoose.model("Story", storySchema);

module.exports = Story;

/*   chapters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ], */
