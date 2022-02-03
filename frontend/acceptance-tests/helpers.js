require('expect-puppeteer');


login = async (page) => {
	await page.goto('http://localhost:4000');
	let element, formElement, tabs;
	await page.waitForXPath(`//*[@id="username"]`);
	element = await page.$x(`//*[@id="username"]`);
	       await element[0].click();
	element = await page.$x(`//*[@id="username"]`);
	       await element[0].type(`${process.env.REACT_APP_TEST_EMAIL}`);
	element = await page.$x(`//*[@id="password"]`);
	       await element[0].click();
	element = await page.$x(`//*[@id="password"]`);
	       await element[0].type(`${process.env.REACT_APP_TEST_PASSWORD}`);
	element = await page.$x(`//*[@name="action"]`);
	       await element[0].click();
	await page.waitForNavigation();
}

addDevice = async (page, deviceName) => {
	let element;
	await page.waitForXPath(`//div[@id='root']/div/div[2]/main/div/div/div[2]/button[2]`);
element = await page.$x(`//div[@id='root']/div/div[2]/main/div/div/div[2]/button[2]`);
	await element[0].click();
element = await page.$x(`//*[@aria-label="device name"]`);
	await element[0].click();
	await element[0].type(deviceName);
element = await page.$x(`//*[@aria-label="device description"]`);
    await element[0].click();
	await element[0].type(`pallino`);
element = await page.$x(`//*[@aria-label="mqtt broker"]`);
	await element[0].click();
    await element[0].type(`bestbroker`);
element = await page.$x(`//*[@aria-label="mqtt port"]`);
	await element[0].click();
    await element[0].type(`451`);
element = await page.$x(`//*[@aria-label="mqtt topic"]`);
    await element[0].click();
	await element[0].type(`kitchen`);
element = await page.$x(`//button[@type='submit']`);
	await element[0].click();
	await page.waitForNavigation({timeout: 5000, waitUntil: 'domcontentloaded'});
}

removeLastDevice = async (page) => {
	let element;
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
	let element;
	await page.waitForSelector(`.MuiCardActionArea-root`);
	const devices = await page.$$(`.MuiCardActionArea-root`);
	const num = devices.length;
	await devices[num-1].click();
element = await page.$x(`//*[@value="Import to Node-Red"]`);
	await element[0].click(); 
	await page.waitForXPath(`//*[@id="label"]`);
element = await page.$x(`//*[@id="label"]`);
	await element[0].click();
element = await page.$x(`//*[@id="label"]`);
	await element[0].type(`Nome azzeccato`);
element = await page.$x(`//*[@id="comment"]`);
	await element[0].type(`Descrizione esaustiva`);
element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Cancel'])[1]/following::button[1]`);
	await element[0].click();

}

editFlow = async (page) => {
	let element;
	await page.waitForXPath(`//*[@aria-label="edit"]`)
		await page.$$eval(`[aria-label="edit"]`, list => list[0].click());
	element = await page.$x(`//*[@id="name"]`);
		await element[0].click();
	element = await page.$x(`//*[@id="name"]`);
		await element[0].click({ clickCount: 3 })
		await element[0].type(`edited flow description at ${Date.now()}`);
	element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Cancel'])[1]/following::button[1]`);
		await element[0].click();
}

openDashboard = async (page) => {
	let element;
	await page.waitForNavigation({waitUntil: 'load'})
	element = await page.$x(`//*[@id="root"]/div/div[2]/main/div/div[1]/div[1]/button`);
	await element[0].click();
	await page.waitForTimeout(3000);
}

goToDevicesPage = async (page) => {
	let element;
	element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Flows'])[1]/following::*[name()='svg'][1]`);
	await element[0].click();
	await page.waitForXPath(`//*[@id="root"]/div/div[1]/div/ul/div[1]/div[2]/span`);
    element = await page.$x(`//*[@id="root"]/div/div[1]/div/ul/div[1]/div[2]/span`);
	await element[0].click();
}

goToFlowsPage = async (page) => {
	let element;
	await page.waitForXPath(`(.//*[normalize-space(text()) and normalize-space(.)='Flows'])[1]/following::*[name()='svg'][1]`);
element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Flows'])[1]/following::*[name()='svg'][1]`);
	await element[0].click();
	await page.waitForXPath(`//div[@id='root']/div/div/div/ul/div[2]/div[2]/span`);
element = await page.$x(`//div[@id='root']/div/div/div/ul/div[2]/div[2]/span`);
	await element[0].click();
}