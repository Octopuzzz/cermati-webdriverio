import { $, $$ } from "@wdio/globals";
import BasePage from "../base.page.ts";
import type { SearchCategory } from "../../constants/search.ts";

const SIDEBAR_CATEGORY = "ul.nav-stacked li a";

class SearchResultPage extends BasePage {
  readonly url = /\/cari\?/;

  get resultSummary() {
    return $(
      '//div[contains(normalize-space(.), "hasil dari pencarian") and strong][last()]',
    );
  }

  get totalResults() {
    return this.resultSummary.$("./strong[1]");
  }

  category(label: SearchCategory) {
    return $(
      `//ul[contains(@class, "nav-stacked")]//a[normalize-space(text())="${label}"]`,
    );
  }

  async getTotalResults() {
    return toCount(await this.totalResults.getText());
  }

  async getCategoryCounts() {
    const counts: Partial<Record<SearchCategory, number>> = {};
    for (const link of await $$(SIDEBAR_CATEGORY).getElements()) {
      const badge = await link.$(".badge").getText();
      const text = (await link.getText()).trim();
      const label = text.slice(0, text.length - badge.length).trim();
      counts[label as SearchCategory] = toCount(badge);
    }
    return counts;
  }
}

// "Semua" has an empty badge, so an empty count is 0
function toCount(text: string) {
  const digits = text.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

export default new SearchResultPage();
