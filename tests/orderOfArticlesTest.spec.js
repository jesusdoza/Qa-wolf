const { chromium } = require("playwright");
const { expect, test } = require("playwright/test");
const { sortHackerNewsArticles } = require("../index.js");

test("newest articles page", sortHackerNewsArticles);
