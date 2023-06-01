// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const chapterRoutes = require("./routes/chapters.routes");
const userRoutes = require("./routes/users.routes");
const storyRoutes = require("./routes/stories.routes");

app.use(express.json());
app.use(cors({ origin: "*" }));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here

app.use("/auth", authRoutes);
app.use("/chapters", chapterRoutes);
app.use("/stories", storyRoutes);
app.use("/users", userRoutes);

const test = [
  {
    userName: "Moe",
    role: "Admin",
  },
];

app.get("/test", (req, res) => {
  res.json(test);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Fatal error your computer will explode in 5 seconds");
});

module.exports = app;
