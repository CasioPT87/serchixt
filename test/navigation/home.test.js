const puppeteer = require('puppeteer');
const PORT = process.env.NODE_ENV === 'production' ? 9990 : 8080;

describe('Navigation: Home', () => {
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

  it('goes to profile', async () => {
    const buttonText = 'Go to Profile';
    await page.$$eval(
      'button',
      (buttons, buttonText) => {
        const button = buttons.find(
          (button) => button.textContent.trim() === buttonText
        );
        if (button) {
          button.click();
        } else {
          throw new Error(`Button with text "${buttonText}" not found.`);
        }
      },
      buttonText
    );

    const fullUrl = page.url();
    const urlObject = new URL(fullUrl);
    const path = urlObject.pathname;
    expect(path).toBe('/profile');
  });

  it('can NOT got to archives if not logged', async () => {
    const pElementId = 'logged';
    const expectedText = 'logged: false';
    const pText = await page.$eval(`#${pElementId}`, (el) =>
      el.textContent.trim()
    );

    expect(pText).toBe(expectedText);

    const buttonText = 'Go to Articles (is Private)';
    await page.$$eval(
      'button',
      (buttons, buttonText) => {
        const button = buttons.find(
          (button) => button.textContent.trim() === buttonText
        );
        if (button) {
          button.click();
        } else {
          throw new Error(`Button with text "${buttonText}" not found.`);
        }
      },
      buttonText
    );

    const fullUrl = page.url();
    const urlObject = new URL(fullUrl);
    const path = urlObject.pathname;
    expect(path).toBe('/');
    expect(path).not.toBe('/articles');
  });
});
