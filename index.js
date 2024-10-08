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
  let prevDate = Date.now();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  while (totalRowsSeen < ROWS_TO_CHECK) {
    const articles = await page.locator(".athing").all();
    const spanWithTimeList = await page.locator(
      ".athing + tr > td.subtext span.age"
    );

    const timeElements = await spanWithTimeList.all();

    // for (const row of timeElements) {
    for (let i = 0; i < timeElements.length; i++) {
      const row = timeElements[i];
      const title = await articles[i].innerText();

      if (totalRowsSeen == ROWS_TO_CHECK) {
        break;
      }
      // <span class="age" title="2024-09-06T02:08:46.000000Z"><a href="item?id=41462225">6 minutes ago</a></span>
      const timeStr = await row.getAttribute("title");

      const date = Date.parse(timeStr);

      expect(date, `article ${title}`).toBeLessThanOrEqual(prevDate);

      totalRowsSeen += 1;

      prevDate = date;
    }

    //each page only holds 30 items go to next page
    const moreLink = await page.locator(".morelink").first();

    await moreLink.click();
    await page.waitForLoadState("domcontentloaded");
  }

  // console.log("totalRowsSeen", totalRowsSeen);
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();

module.exports = { sortHackerNewsArticles };
