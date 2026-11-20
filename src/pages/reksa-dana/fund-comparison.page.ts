import { $, browser } from "@wdio/globals";
import BasePage from "../base.page.ts";
import { containsText } from "../../utils/xpath.ts";

class FundComparisonPage extends BasePage {
  readonly url = /\/reksadana\/bandingkan/;

  async open(slugs: string[]) {
    const query = slugs.map((slug, i) => `fund${i + 1}=${slug}`).join("&");
    await browser.url(`/reksadana/bandingkan?${query}`);
  }

  // the page always has 3 slots, unused ones come through as an empty `fundN=`
  async getFundSlugs() {
    const params = new URL(await browser.getUrl()).searchParams;
    return [...params.entries()]
      .filter(([key, slug]) => /^fund\d+$/.test(key) && slug !== "")
      .map(([, slug]) => slug);
  }

  fundName(name: string) {
    return $(containsText(name));
  }
}

export default new FundComparisonPage();
