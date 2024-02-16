const puppeteer = require("puppeteer");

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

describe("Basic", () => {
  let browser;
  let page;

  beforeEach(async () => {
    console.log('holaaaaa')
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto("http://localhost:9990/");
  });

  afterEach(async () => {
    await browser.close();
  });

  it("selects by site code", async () => {
    // const rows = await page.$$(".row-container");
    // expect(rows.length).toBe(50);
    // const select = await page.$("select[name='site code']");
    // if (select) {
    //   select.select('my-site-code-2')
    //   await sleep(100)
    //   const rows = await page.$$(".row-container");
    //   expect(rows.length).toBe(1);
    // } else {
    //   throw new Error("Element not found");
    // }
    expect(true).toBe(3)
  });
});
