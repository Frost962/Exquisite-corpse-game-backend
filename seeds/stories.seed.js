const mongoose = require("mongoose");
require("dotenv").config();
require("../db/index");

const User = require("../models/user.model");
const Chapter = require("../models/chapter.model");
const Story = require("../models/story.model");

const seed = async () => {
  try {
    await Chapter.deleteMany();
    await Story.deleteMany();
    await User.deleteMany();

    const users = await User.create([
      {
        userName: "Aboy",
        email: "Aboy",
        password: "Aboy",
      },
      {
        userName: "Agirl",
        email: "Agirl",
        password: "Agirl",
      },
      {
        userName: "A",
        email: "A",
        password: "A",
      },
      {
        userName: "paul",
        email: "paul",
        password:
          "$2b$10$PkaZnaYHkiZs8DwH0ZlWYOu6pynmp90G2yXE.Y8CBK5KgFzW5DAg.",
      },
    ]);

    const stories = await Story.create([
      {
        title: "The great story",
        creator: users[2]._id,
        contributors: [users[0]._id, users[1]._id],
      },
      {
        title: "The greatest story",
        creator: users[1]._id,
        contributors: [users[0]._id, users[2]._id],
      },
      {
        title: "The even greater story",
        creator: users[0]._id,
        contributors: [users[2]._id, users[1]._id, "647f2d64e7cc9b28d5d1c438"],
      },
    ]);

    const chapters = await Chapter.create([
      {
        creator: users[0]._id,
        content:
          "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
        storyId: stories[0]._id,
      },
      {
        creator: users[1]._id,
        content: "bli bli bli bli bli bli bli bli bli bli bli bli",
        storyId: stories[2]._id,
      },
      {
        creator: users[2]._id,
        content:
          "ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble ble",
        storyId: stories[1]._id,
      },
    ]);

    console.log(
      `${users.length} users, ${stories.length} stories, and ${chapters.length} chapters have been created.`
    );

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
