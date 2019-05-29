import { AppiumDriver, createDriver, SearchOptions, Direction, UIElement } from "nativescript-dev-appium";
import { expect } from "chai";
import { isSauceLab, runType } from "nativescript-dev-appium/lib/parser";
import { navigateBackToHome, scrollToElement, scrollToElementInListView, QUEUE_WAIT_TIME } from "./helper";
const fs = require('fs');
const addContext = require('mochawesome/addContext');
const rimraf = require('rimraf');

const isSauceRun = isSauceLab;

describe("Picker", () => {
    let driver: AppiumDriver;

    before(async function () {
        this.timeout(QUEUE_WAIT_TIME);
        driver = await createDriver();
        driver.defaultWaitTime = 15000;
        let dir = "mochawesome-report";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        rimraf('mochawesome-report/*', function () { });
    });

    after(async () => {
        if (isSauceRun) {
            driver.sessionId().then(function (sessionId) {
                console.log("Report https://saucelabs.com/beta/tests/" + sessionId);
            });
        }
        await driver.quit();
        console.log("Quit driver!");
    });

    afterEach(async function () {
        if (this.currentTest.state && this.currentTest.state === "failed") {
            let png = await driver.logScreenshot(this.currentTest.title);
            fs.copyFile(png, './mochawesome-report/' + this.currentTest.title + '.png', function (err) {
                if (err) {
                    throw err;
                }
                console.log('Screenshot saved.');
            });
            addContext(this, './' + this.currentTest.title + '.png');
        }
    });

    const gettingStarted = "Getting Started";
    let field: UIElement;
    describe(gettingStarted, () => {
        it("Navigate to Getting started example", async () => {
            const getStarted = await scrollToElement(driver, gettingStarted);
            await getStarted.click();
            field = await driver.findElementByText("Click here");
            expect(field).to.exist;
        });

        it("Click field and select item", async function () {
            this.timeout(QUEUE_WAIT_TIME);
            await field.click();
            const itemText = "Item 30";
            const item30 = await scrollToElement(driver, itemText);
            await item30.click();
            const title = await driver.findElementByText(gettingStarted);
            expect(title).to.exist;
            const item = await driver.findElementByText(itemText);
            expect(item).to.exist;
        });

        it("Click field and cancel selection", async () => {
            let item30 = await driver.findElementByText("Item 30");
            await item30.click();
            const cancel = await driver.findElementByAccessibilityId("Close");
            await cancel.click();
            item30 = await driver.findElementByText("Item 30");
            expect(item30).to.exist;
        });
    });

    const styling = "Styling";
    describe(styling, () => {
        it("Navigate to Styling example", async () => {
            await navigateBackToHome(driver);
            const stylingExample = await scrollToElement(driver, styling);
            await stylingExample.click();
            field = await driver.findElementByText("This is hint");
            expect(field).to.exist;
        });

        it("Click field and select item", async () => {
            await field.click();
            const itemText = "Item 6";
            const item6 = await scrollToElementInListView(driver, itemText);
            await item6.click();
            const title = await driver.findElementByText(styling);
            expect(title).to.exist;
            const item = await driver.findElementByText(itemText);
            expect(item).to.exist;
        });
    });

    const valueApis = "Value APIs";
    describe(valueApis, () => {
        it("Navigate to Value APIs example", async () => {
            await navigateBackToHome(driver);
            const valueExample = await scrollToElement(driver, valueApis);
            await valueExample.click();
            field = await driver.findElementByText("Click here");
            expect(field).to.exist;
        });

        it("Click field and select item", async () => {
            await field.click();
            const itemText = "Item 1";
            const item1 = await scrollToElement(driver, itemText);
            await item1.click();
            const title = await driver.findElementByText(valueApis);
            expect(title).to.exist;
            const description = await driver.findElementByText("Description 1");
            expect(description).to.exist;
        });
    });

    const reactive = "Reactive forms";
    describe(reactive, () => {
        it("Navigate to Value APIs example", async () => {
            await navigateBackToHome(driver);
            const reactiveExample = await scrollToElement(driver, reactive);
            await reactiveExample.click();
            field = await driver.findElementByText("select a movie");
            expect(field).to.exist;
        });

        it("Click field and select item", async () => {
            await field.click();
            const itemText = "The Wizard of Oz";
            const item1 = await scrollToElementInListView(driver, itemText);
            await item1.click();
            const title = await driver.findElementByText("Reactive Forms");
            expect(title).to.exist;
            const pickedItem = await driver.findElementByText(itemText);
            expect(pickedItem).to.exist;
        });
    });
});