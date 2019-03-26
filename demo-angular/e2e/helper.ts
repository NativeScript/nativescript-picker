import { AppiumDriver, SearchOptions, Direction, UIElement } from "nativescript-dev-appium";
import { runType } from "nativescript-dev-appium/lib/parser";

export const QUEUE_WAIT_TIME: number = 600000; // Sometimes SauceLabs threads are not available and the tests wait in a queue to start. Wait 10 min before timeout.

export async function navigateBackToHome(driver: AppiumDriver, view?: string) {
    let location = view !== undefined ? view : "PickerField - Angular";
    let homeTitle = await driver.findElementByTextIfExists(location, SearchOptions.exact);
    while (homeTitle === undefined) {
        await driver.navBack();
        await driver.wait(1000);
        homeTitle = await driver.findElementByTextIfExists(location, SearchOptions.exact);
    }
}

export async function navigateBackToView(driver: AppiumDriver, view: string) {
    await navigateBackToHome(driver, view);
}

export async function scrollToElement(driver: AppiumDriver, element: string, direction: Direction = Direction.down) {
    let listView: UIElement;
    if (driver.isAndroid) {
        listView = await driver.findElementByClassName("android.widget.FrameLayout");
    }
    else {
        listView = await driver.findElementByClassName("XCUIElementTypeTable");
    }
    const listItem = await listView.scrollTo(
        direction,
        () => driver.findElementByText(element, SearchOptions.contains),
        600
    );
    return listItem;
}

export async function scrollToElementInListView(driver: AppiumDriver, element: string, direction: Direction = Direction.down) {
    let listView: UIElement;
    if (driver.isAndroid) {
        listView = await driver.findElementByClassName("android.widget.ListView");
    }
    else {
        listView = await driver.findElementByClassName("XCUIElementTypeTable");
    }
    const listItem = await listView.scrollTo(
        direction,
        () => driver.findElementByText(element, SearchOptions.contains),
        600
    );
    return listItem;
}

export async function swipe(driver: AppiumDriver, item: any, direction: Direction) {
    const rectangle = await item.getRectangle();
    const centerX = rectangle.x + rectangle.width / 2;
    const centerY = rectangle.y + rectangle.height / 2;
    let swipeX;
    if (direction === Direction.right) {
        const windowSize = await driver.driver.getWindowSize();
        swipeX = windowSize.width - 10;
    } else if (direction === Direction.left) {
        swipeX = 10;
    }

    if (driver.isAndroid) {
        const wd = driver.wd();
        const action = new wd.TouchAction(driver.driver);
        action.press({ x: centerX, y: centerY })
            .wait(200)
            .moveTo({ x: swipeX, y: centerY })
            .release();
        await action.perform();
    }
    else {
        await driver.driver.execute('mobile: dragFromToForDuration', {
            duration: 2.0,
            fromX: centerX,
            fromY: centerY,
            toX: swipeX,
            toY: centerY
        });
    }
}

export async function swipeToElement(driver: AppiumDriver, element: string, direction: Direction = Direction.down) {
    let listView;
    if (driver.isAndroid) {
        listView = await driver.findElementByClassName("android.widget.FrameLayout");
    }
    else {
        listView = await driver.findElementByClassName("XCUIElementTypeCollectionView");
    }

    let item = await driver.findElementByTextIfExists(element, SearchOptions.exact);
    while (item === undefined) {
        await listView.swipe(direction);
        await driver.wait(500);
        item = await driver.findElementByTextIfExists(element, SearchOptions.contains);
    }
    return item;
}