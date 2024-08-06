const puppeteer = require('puppeteer');
const PORT = process.env.NODE_ENV === 'production' ? 9990 : 8080;

describe('Navigation: Articles (is Private)', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(`http://localhost:${PORT}/articles`);
  });

  afterEach(async () => {
    await browser.close();
  });

  it('can NOT access page as it is not logged in', async () => {
    const fullUrl = page.url();
    const urlObject = new URL(fullUrl);
    const path = urlObject.pathname;
    expect(path).toBe('/');
    expect(path).not.toBe('/articles');
  });

  it('can access page IF IT IS logged in', async () => {
    // when we start it should be redirected to home, as we are not logged in
    const goToLoginButtonText = 'Go to Login';
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
      goToLoginButtonText
    );

    const authButtonText = 'authentication!!!';
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
      authButtonText
    );

    await new Promise((res) => setTimeout(res, 1000));

    const goToArticlesButtonText = 'Go to Articles!!!';
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
      goToArticlesButtonText
    );

    const fullUrl = page.url();
    const urlObject = new URL(fullUrl);
    const path = urlObject.pathname;
    expect(path).not.toBe('/');
    expect(path).toBe('/articles');
  });

  it('can NOT access page IF closes season', async () => {
    // when we start it should be redirected to home, as we are not logged in
    const goToLoginButtonText = 'Go to Login';
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
      goToLoginButtonText
    );

    const authButtonText = 'authentication!!!';
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
      authButtonText
    );

    await new Promise((res) => setTimeout(res, 1000));

    const deleteSeasonButtonText = 'delete season!!!';
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
      deleteSeasonButtonText
    );

    const goToArticlesButtonText = 'Go to Articles!!!';
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
      goToArticlesButtonText
    );

    const fullUrl = page.url();
    const urlObject = new URL(fullUrl);
    const path = urlObject.pathname;
    expect(path).not.toBe('/');
    expect(path).toBe('/articles');
  });
});
