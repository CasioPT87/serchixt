const puppeteer = require("puppeteer");

describe("Basic Test", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto("http://localhost:8080/shipments");
  });

  afterEach(async () => {
    await browser.close();
  });

  it("ul has all 3 li's", async () => {
    await new Promise(res => setTimeout(res, 6000))
    const liElements = await page.$$('ul li');
    expect(liElements.length).toBe(3)
  }, 10000);
});
