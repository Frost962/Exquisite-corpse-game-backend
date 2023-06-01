require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const chapterRoutes = require("./routes/chapters.routes");
const userRoutes = require("./routes/users.routes");
const storyRoutes = require("./routes/stories.routes");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/auth", authRoutes);
app.use("/chapters", chapterRoutes);
app.use("/stories", storyRoutes);
app.use("/users", userRoutes);

const test = [
  {
    userName: "MoeJa",
    role: "Admin",
  },
];

app.get("/test", (req, res) => {
  res.json(test);
});

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Fatal error your computer will explode in 5 secondes");
});
