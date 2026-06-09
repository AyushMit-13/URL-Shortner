const express = require("express");
const { readUrls } = require("./services/fileService");
const urlRoutes = require("./routes/urlRoutes");
const rateLimit = require("express-rate-limit");
const app = express();




app.use(express.json());
const shortenLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    message: "Maximum 5 URLs allowed per hour",
  },
});


app.use("/shorten", shortenLimiter);
app.use("/", urlRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "URL Shortener API is running",
  });
});

app.get("/test", (req, res) => {
  const urls = readUrls();
  res.json(urls);
});

module.exports = app;