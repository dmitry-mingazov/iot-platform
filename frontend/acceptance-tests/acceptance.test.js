/* eslint-disable no-undef */
/**
 * @jest-environment puppeteer
 */
require('./helpers');

//const puppeteer = require('puppeteer');
beforeAll(async () => {
    await login(page);
});

describe("APP", () => {
    jest.setTimeout(120000);
test("import device to Node-RED and edit its flow description", async (done) => {
    await goToDevicesPage(page);
    await addDevice(page, 'XTP Device');
    await importDeviceToNR(page);
    await goToFlowsPage(page);
    await editFlow(page);
    await page.waitForTimeout(2500);
    done();
}, 120000);

test("add and remove a device", async (done) => {
    await goToDevicesPage(page);
    await addDevice(page, 'Temp-AB1');
    await removeLastDevice(page);
    await page.waitForTimeout(2500);
    done();
}, 120000);

test("import a device to Node-RED and verify it gets a dashboard entry", async (done) => {
    let devName = `HM-LA2 ${Date.now()}`;
    await goToDevicesPage(page);
    await addDevice(page, devName);
    await importDeviceToNR(page);
    await goToDevicesPage(page);
    await openDashboard(page);
    const found = (await page.content()).match(new RegExp(`${devName}`,"gi")).length > 0;
    expect(found).toBe(true);
    await page.waitForTimeout(2500);
    done();
}, 120000);
});



