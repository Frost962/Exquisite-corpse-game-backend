const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      chapters: [{
        type: mongoose.Schema.Types.ObjectId, // An array of Chapter IDs
        ref: 'Chapter',
      }],
      user: {
        type: mongoose.Schema.Types.ObjectId, // User who started the story
        ref: 'User',
        required: true,
      },
    });
    
    const Story = mongoose.model("Story", storySchema);
    
        Chapter Model: Contains a User reference to know who wrote the chapter and a Story reference to know which story the chapter belongs to.
    
    javascript
    
    const chapterSchema = new mongoose.Schema({
      content: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story',
        required: true,
      },
    });
    
    const Chapter = mongoose.model("Chapter", chapterSchema);
    
    These models will help you keep track of which user wrote which chapter and in which story, as well as which stories are favorited by which users. Of course, you can add additional fields to these schemas as your project's requirements grow.
    

const Story = mongoose.model("Chapter", storySchema);

module.exports = Story;
