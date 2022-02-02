// Script Name: {katalon}
require('./helpers');

const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({ headless: false, defaultViewport: null, slowMo: 50 });
const page = await browser.newPage();

await login(page);

let element, formElement, tabs;
//add
await addDevice(page);
//remove
await removeLastDevice(page);
await page.waitForTimeout(2500);
await browser.close();
})();

