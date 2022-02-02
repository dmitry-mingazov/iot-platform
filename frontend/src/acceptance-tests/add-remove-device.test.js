// Script Name: {katalon}
require('./login-test');

const puppeteer = require('puppeteer');

(async () => {
const browser = await puppeteer.launch({ headless: false, defaultViewport: null, slowMo: 50 });
const page = await browser.newPage();

await login(page, browser);

let element, formElement, tabs;
//add
await page.waitForXPath(`//div[@id='root']/div/div[2]/main/div/div/div[2]/button[2]`);
element = await page.$x(`//div[@id='root']/div/div[2]/main/div/div/div[2]/button[2]`);
	await element[0].click();
element = await page.$x(`//*[@aria-label="device name"]`);
	await element[0].click();
	await element[0].type(`pinco`);
element = await page.$x(`//*[@aria-label="device description"]`);
    await element[0].click();
	await element[0].type(`pallino`);
element = await page.$x(`//*[@aria-label="mqtt broker"]`);
	await element[0].click();
    await element[0].type(`broker bellissimo`);
element = await page.$x(`//*[@aria-label="mqtt port"]`);
	await element[0].click();
    await element[0].type(`42069`);
element = await page.$x(`//*[@aria-label="mqtt topic"]`);
    await element[0].click();
	await element[0].type(`frittomisto`);
element = await page.$x(`//button[@type='submit']`);
	await element[0].click();
await page.waitForNavigation({waitUntil: 'networkidle2'});
await page.waitForSelector(`.MuiCardActionArea-root`);
//remove
element = await page.$x(`//div[@id='root']/div/div[2]/main/div/div[2]/div/div`);
const devices = await page.$$(`.MuiCardActionArea-root`);
const num = devices.length;

	await devices[num-1].click();
element = await page.$x(`//ul[@id='composition-menu']/li[6]/div/span`);
	await element[0].click();
element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Cancel'])[1]/following::button[1]`);
	await element[0].click();
await page.waitForTimeout(2500);
await browser.close();
})();

