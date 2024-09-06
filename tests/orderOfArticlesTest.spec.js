const { chromium } = require("playwright");
const { expect, test } = require("playwright/test");
const { sortHackerNewsArticles } = require("../index.js");

test(
  "newest articles page should be in order from newest to oldest",
  sortHackerNewsArticles
);
