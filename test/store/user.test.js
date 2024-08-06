const puppeteer = require('puppeteer');
const PORT = process.env.NODE_ENV === 'production' ? 9990 : 8080;

describe('Store: User', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(`http://localhost:${PORT}/profile`);
  });

  afterEach(async () => {
    await browser.close();
  });

  test('Input changes store data and is reflected on the page', async () => {
    const legend = 'Raymond Roth';
    await page.type('#login-input', 'Raymond Roth', { delay: 50 }); // Typing with a delay between keystrokes
    const paragraphText = await page.$eval(
      '#store-user',
      (element) => element.textContent
    );

    expect(paragraphText).toBe(`Name in Store: ${legend}`);
  });

  test('Thunk works and can change store data', async () => {
    const legend = 'Joan Garriga';
    const thunkButtonText = 'Add user with thunk! -there is some added delay-';
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
      thunkButtonText
    );

    await new Promise((res) => setTimeout(res, 600));

    const paragraphText = await page.$eval(
      '#store-user',
      (element) => element.textContent
    );

    expect(paragraphText).toBe(`Name in Store: ${legend}`);
  });
});
