const express = require("express");
const router = express.Router();

const {
  createShortUrl,
  redirectUrl,
  getUrlDetails,
  deleteUrl,
} = require("../controllers/urlController");

const { readUrls } = require("../services/fileService");

// TEST ROUTE
router.get("/urls", (req, res) => {
  res.json(readUrls());
});

router.post("/shorten", createShortUrl);

router.get("/url/:shortCode", getUrlDetails);

router.delete("/url/:shortCode", deleteUrl);

// KEEP THIS LAST
router.get("/:shortCode", redirectUrl);

module.exports = router;