// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1

const { chromium } = require("playwright");
const { expect, test } = require("playwright/test");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const ROWS_TO_CHECK = 100;
  let totalRowsSeen = 0;
  let prevTime = Date.now();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  const rows = await page.locator(".athing + tr > td.subtext span.age");
  const timeElements = await rows.all();
  while (totalRowsSeen < ROWS_TO_CHECK) {
    for (const rowElement of timeElements) {
      const timeStr = await rowElement.getAttribute("title");

      const date = Date.parse(timeStr);

      expect(date).toBeLessThanOrEqual(prevTime);

      totalRowsSeen += 1;

      if (totalRowsSeen == ROWS_TO_CHECK) {
        break;
      }

      prevTime = date;
    }
    const moreLink = await page.locator(".morelink").first();
    await moreLink.click();
  }

  console.log("totalRowsSeen", totalRowsSeen);
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();

module.exports = { sortHackerNewsArticles };
