const puppeteer = require('puppeteer');

login = async (page, browser) => {
await page.goto('http://localhost:4000');
let element, formElement, tabs;
await page.waitForXPath(`//*[@id="username"]`);
element = await page.$x(`//*[@id="username"]`);
	await element[0].click();
element = await page.$x(`//*[@id="username"]`);
	await element[0].type(`${process.env.EMAIL}`);
element = await page.$x(`//*[@id="password"]`);
	await element[0].click();
element = await page.$x(`//*[@id="password"]`);
	await element[0].type(`${process.env.PASSWORD}`);
element = await page.$x(`//*[@name="action"]`);
	await element[0].click();
await page.waitForNavigation();

};


