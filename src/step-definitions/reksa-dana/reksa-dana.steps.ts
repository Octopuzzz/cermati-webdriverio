import { When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import ReksaDanaPage from "../../pages/reksa-dana/reksa-dana.page.ts";

Then("I should be on the Reksa Dana landing page", async () => {
  await ReksaDanaPage.waitForUrl(ReksaDanaPage.landingUrl);
});

When("I open the {string} category", async (category: string) => {
  await ReksaDanaPage.clickAndSwitchToNewTab(ReksaDanaPage.category(category));
});

Then("I should see the money market fund list", async () => {
  await ReksaDanaPage.waitForUrl(ReksaDanaPage.moneyMarketUrl);
  await expect(ReksaDanaPage.moneyMarketHeading).toBeDisplayed();
});

When("I filter the funds by {string}", async (filter: string) => {
  await ReksaDanaPage.applyFilter(filter);
  await ReksaDanaPage.waitForUrl(ReksaDanaPage.moneyMarketUrl);
});

When("I start comparing funds", async () => {
  await ReksaDanaPage.compareModeButton.click();
});

When("I select the first {int} funds to compare", async (count: number) => {
  for (let i = 0; i < count; i++) {
    await ReksaDanaPage.selectProduct(i);
  }
});

When("I submit the comparison", async () => {
  await ReksaDanaPage.clickAndSwitchToNewTab(ReksaDanaPage.submitCompareButton);
});
