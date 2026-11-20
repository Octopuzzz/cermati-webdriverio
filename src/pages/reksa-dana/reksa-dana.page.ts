import { $, $$, browser, expect } from "@wdio/globals";
import BasePage from "../base.page.ts";
import { TIMEOUT } from "../../constants/timeouts.ts";

// In compare mode (toolbar "Bandingkan") a fund is selected by clicking its card.
// The checkbox on the card only shows the state, it has `pointer-events: none`.
const PRODUCT_CARD = ".product-item-card";
const PRODUCT_CHECKBOX = ".product-checkbox input";

class ReksaDanaPage extends BasePage {
  readonly landingUrl = /\/reksadana\/?(\?|#|$)/;
  readonly moneyMarketUrl = /\/reksadana\/pasar-uang/;

  category(label: string) {
    return $(`//a[.//*[normalize-space(text())="${label}"]]`);
  }

  get moneyMarketHeading() {
    return $('//h1[normalize-space()="Reksa Dana Pasar Uang"]');
  }

  get filterButton() {
    return $(
      '//button[contains(@class, "btn-tertiary") and normalize-space()="Filter"]',
    );
  }

  get applyFilterButton() {
    return $('//button[normalize-space()="Terapkan"]');
  }

  get compareModeButton() {
    return $(
      '//button[contains(@class, "btn-tertiary") and normalize-space()="Bandingkan"]',
    );
  }

  get submitCompareButton() {
    return $(
      '//button[contains(@class, "btn-action") and normalize-space()="Bandingkan"]',
    );
  }

  filterOption(label: string) {
    return $(
      `//label[contains(@class, "checkbox-kit") and normalize-space()="${label}"]`,
    );
  }

  async applyFilter(label: string) {
    await this.filterButton.click();
    await this.filterOption(label).waitForClickable();
    await this.filterOption(label).click();
    await this.applyFilterButton.click();
  }

  async selectProduct(index: number) {
    await browser.waitUntil(
      async () => (await $$(PRODUCT_CARD).length) > index,
      {
        timeout: TIMEOUT.default,
        timeoutMsg: `Product #${index + 1} did not load`,
      },
    );

    const card = $$(PRODUCT_CARD)[index];
    await card.click();
    await expect(card.$(PRODUCT_CHECKBOX)).toBeSelected();
  }
}

export default new ReksaDanaPage();
