const { readUrls, writeUrls } = require("../services/fileService");
const { generateShortCode } = require("../services/shortCodeService");

function createShortUrl(req, res) {
  const { url } = req.body;

  try {
  new URL(url);
} catch {
  return res.status(400).json({
    message: "Invalid URL",
  });
}

  const urls = readUrls();

  const shortCode = generateShortCode();

  const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 7);

const newUrl = {
  shortCode,
  originalUrl: url,
  clicks: 0,
  createdAt: new Date().toISOString(),
  expiryDate: expiryDate.toISOString(),
};

  urls.push(newUrl);

  writeUrls(urls);

  res.status(201).json({
    shortCode,
    shortUrl: `http://localhost:3000/${shortCode}`,
  });
}

function redirectUrl(req, res) {
  const { shortCode } = req.params;

  const urls = readUrls();

  const urlEntry = urls.find(
    (url) => url.shortCode === shortCode
  );

  if (!urlEntry) {
    return res.status(404).json({
      message: "Short URL not found",
    });
  }
  if (new Date() > new Date(urlEntry.expiryDate)) {
  return res.status(410).json({
    message: "Short URL has expired",
  });
}

  urlEntry.clicks += 1;

  writeUrls(urls);

  res.redirect(urlEntry.originalUrl);
}
function getUrlDetails(req, res) {
  const { shortCode } = req.params;

  const urls = readUrls();

  const urlEntry = urls.find(
    (url) => url.shortCode === shortCode
  );

  if (!urlEntry) {
    return res.status(404).json({
      message: "Short URL not found",
    });
  }

  res.json(urlEntry);
}
function deleteUrl(req, res) {
  const { shortCode } = req.params;

  const urls = readUrls();

  const filteredUrls = urls.filter(
    (url) => url.shortCode !== shortCode
  );

  if (filteredUrls.length === urls.length) {
    return res.status(404).json({
      message: "Short URL not found",
    });
  }

  writeUrls(filteredUrls);

  res.json({
    message: "Deleted successfully",
  });
}



module.exports = {
  createShortUrl,
  redirectUrl,
  getUrlDetails,
  deleteUrl,
};