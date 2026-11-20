import { browser } from "@wdio/globals";
import type { ChainablePromiseElement } from "webdriverio";
import { TIMEOUT } from "../constants/timeouts.ts";

export default class BasePage {
  async clickAndSwitchToNewTab(element: ChainablePromiseElement) {
    const handlesBefore = await browser.getWindowHandles();

    await element.waitForClickable();
    await element.click();

    // some links open in a new tab, some don't
    try {
      await browser.waitUntil(
        async () =>
          (await browser.getWindowHandles()).length > handlesBefore.length,
        { timeout: TIMEOUT.newTab },
      );
    } catch {
      return;
    }

    const handlesAfter = await browser.getWindowHandles();
    const newTab = handlesAfter.find(
      (handle) => !handlesBefore.includes(handle),
    );
    if (newTab) await browser.switchToWindow(newTab);
  }

  async waitForUrl(pattern: RegExp, timeout = TIMEOUT.default) {
    let currentUrl = "";
    try {
      await browser.waitUntil(
        async () => {
          currentUrl = await browser.getUrl();
          return pattern.test(currentUrl);
        },
        { timeout },
      );
    } catch {
      throw new Error(
        `Expected URL to match ${pattern}, but got ${currentUrl}`,
      );
    }
  }
}
