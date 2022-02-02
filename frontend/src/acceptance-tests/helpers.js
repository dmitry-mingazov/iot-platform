const puppeteer = require('puppeteer');

login = async (page) => {
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

addDevice = async (page) => {
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
}

removeLastDevice = async (page) => {
await page.waitForSelector(`.MuiCardActionArea-root`);
	const devices = await page.$$(`.MuiCardActionArea-root`);
	const num = devices.length;

	await devices[num-1].click();
element = await page.$x(`//ul[@id='composition-menu']/li[6]/div/span`);
	await element[0].click();
element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Cancel'])[1]/following::button[1]`);
	await element[0].click();
}

importDeviceToNR = async (page) => {
	await page.goto(`http://localhost:4000/`, { waitUntil: 'networkidle2' });
	await page.waitForSelector(`.MuiCardActionArea-root`);
	const devices = await page.$$(`.MuiCardActionArea-root`);
	const num = devices.length;

	await devices[num-1].click();
element = await page.$x(`//ul[@id='composition-menu']/li[3]/div/span`);
	await element[0].click();
element = await page.$x(`//*[@id="label"]`);
	await element[0].click();
element = await page.$x(`//*[@id="label"]`);
	await element[0].type(`gabibbo`);
element = await page.$x(`//*[@id="comment"]`);
	await element[0].type(`gabibbonw`);
element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Cancel'])[1]/following::button[1]`);
	await element[0].click();
element = await page.$x(`//div[@id='root']/div/div[2]/header/div/div/div`);
	await element[0].click();
element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Flows'])[1]/following::*[name()='svg'][1]`);
	await element[0].click();
element = await page.$x(`//div[@id='root']/div/div/div/ul/div[2]/div[2]/span`);
	await element[0].click();


	await page.waitForXPath(`//*[@aria-label="edit"]`)
const flows = await page.$$(`[aria-label="edit"]`);
	await flows[0].click();
element = await page.$x(`//*[@id="name"]`);
	await element[0].click();
element = await page.$x(`//*[@id="name"]`);
	await element[0].click({ clickCount: 3 })
	await element[0].type(`francescototti`);
element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Cancel'])[1]/following::button[1]`);
	await element[0].click();
}
};


