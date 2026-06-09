const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/urls.json");

// Read URLs from file
function readUrls() {
  const data = fs.readFileSync(filePath, "utf8");

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

// Write URLs to file
function writeUrls(urls) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(urls, null, 2)
  );
}

module.exports = {
  readUrls,
  writeUrls,
};