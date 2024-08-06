const puppeteer = require('puppeteer');
const PORT = process.env.NODE_ENV === 'production' ? 9990 : 8080;

describe('Page Home', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(`http://localhost:${PORT}`);
  });

  afterEach(async () => {
    await browser.close();
  });

  it('has rigth path', async () => {
    const fullUrl = page.url();
    const urlObject = new URL(fullUrl);
    const path = urlObject.pathname;
    expect(path).toBe('/');
  });

  it('has rigth title', async () => {
    const h1Element = await page.$('h1');
    const h1Text = await h1Element.evaluate((el) => el.textContent.trim());
    const rightTitle = 'Home Test Page';
    expect(h1Text).toBe(rightTitle);
  });

  it('has buttons for navigation', async () => {
    const buttonTexts = [
      'Go to Profile',
      'Go to Articles (is Private)',
      'Go to Login',
    ];
    const buttons = await page.$$('button');
    const buttonTextPromises = buttons.map((button) =>
      button.evaluate((el) => el.textContent.trim())
    );
    const foundButtonTexts = await Promise.all(buttonTextPromises);
    expect(buttonTexts.every((text) => foundButtonTexts.includes(text))).toBe(
      true
    );
  });

  it('is not logged to start', async () => {
    const pElementId = 'logged';
    const expectedText = 'logged: false';
    const pText = await page.$eval(`#${pElementId}`, (el) =>
      el.textContent.trim()
    );
    expect(pText).toBe(expectedText);
  });
});
