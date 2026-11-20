import { $, browser } from "@wdio/globals";
import BasePage from "../base.page.ts";

// product sections (Investasi, ...) are collapsible blocks in the page body:
// <div id="investments"><h4>Investasi</h4></div>
// <div class="Collapsible..."> <div id="mutualFund"><h4>Reksa Dana</h4> ... <button>Buka</button></div> </div>
const heading = (label: string) => `//h4[normalize-space(text())="${label}"]`;
const rowOf = (label: string) => `${heading(label)}/ancestor::div[@id][1]`;

class HomePage extends BasePage {
  async open() {
    await browser.url("/");
  }

  get searchButton() {
    return $('button[aria-label="Buka Pencarian"]');
  }

  get searchInput() {
    return $('input[name="term"]');
  }

  section(label: string) {
    return $(rowOf(label));
  }

  sectionItem(section: string, item: string) {
    return $(`${rowOf(section)}/following-sibling::div[1]${heading(item)}`);
  }

  sectionItemButton(item: string, button: string) {
    return $(`${rowOf(item)}//button[normalize-space(text())="${button}"]`);
  }

  async search(term: string) {
    await this.searchButton.waitForClickable();
    await this.searchButton.click();
    await this.searchInput.waitForDisplayed();
    await this.searchInput.setValue(term);
    await browser.keys("Enter");
  }
}

export default new HomePage();
