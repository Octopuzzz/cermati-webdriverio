import { Given, Then, DataTable } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import FundComparisonPage from "../../pages/reksa-dana/fund-comparison.page.ts";
import { FUND_CODE, type FundCategory } from "../../constants/fund.ts";

Given(
  "I open the fund comparison page with these funds:",
  async (table: DataTable) => {
    await FundComparisonPage.open(table.hashes().map((row) => row.slug));
  },
);

Then(
  "I should be on the fund comparison page with {int} funds",
  async (count: number) => {
    await FundComparisonPage.waitForUrl(FundComparisonPage.url);
    expect(await FundComparisonPage.getFundSlugs()).toHaveLength(count);
  },
);

Then(
  /^every compared fund should be a (Syariah|conventional) money market fund$/,
  async (category: FundCategory) => {
    for (const slug of await FundComparisonPage.getFundSlugs()) {
      expect(slug).toMatch(FUND_CODE[category]);
    }
  },
);

Then("I should see these fund names:", async (table: DataTable) => {
  for (const { name } of table.hashes()) {
    await expect(FundComparisonPage.fundName(name)).toBeDisplayed();
  }
});
