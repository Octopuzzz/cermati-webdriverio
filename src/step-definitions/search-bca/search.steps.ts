import { When, Then, DataTable } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import HomePage from "../../pages/home/home.page.ts";
import SearchResultPage from "../../pages/search-bca/search-result.page.ts";
import type { SearchCategory } from "../../constants/search.ts";

When("I search for {string} from the header", async (term: string) => {
  await HomePage.search(term);
});

Then(
  "I should be on the search result page for {string}",
  async (term: string) => {
    await SearchResultPage.waitForUrl(SearchResultPage.url);
    await expect(SearchResultPage.resultSummary).toHaveText(
      expect.stringContaining(`"${term}"`),
    );
  },
);

Then("I should see these search categories:", async (table: DataTable) => {
  for (const { category } of table.hashes()) {
    await expect(
      SearchResultPage.category(category as SearchCategory),
    ).toBeDisplayed();
  }
});

Then(
  "the sum of the category counts should equal the total results",
  async () => {
    const total = await SearchResultPage.getTotalResults();
    const counts = await SearchResultPage.getCategoryCounts();
    const sum = Object.values(counts).reduce((acc, count) => acc + count, 0);

    expect(sum).toBe(total);
  },
);
