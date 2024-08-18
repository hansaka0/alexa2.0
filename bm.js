const puppeteer = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
//puppeteer.use(StealthPlugin());
let browser = null;

const launchBrowser = async () => {
  if (browser) {
    return browser; // Return existing browser instance
  }
  
  browser = await puppeteer.launch({ 
    headless: false, 
    userDataDir: './myUserDataDir',
    devtools: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-features=IsolateOrigins,site-per-process']
  });

  return browser;
};

const closeBrowser = async () => {
  if (browser) {
    await browser.close();
    browser = null; // Clear the browser instance
  }
};

module.exports = { launchBrowser, closeBrowser };
