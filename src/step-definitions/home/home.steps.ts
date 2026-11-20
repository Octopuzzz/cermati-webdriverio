import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import HomePage from "../../pages/home/home.page.ts";

Given("I am on the Cermati homepage", async () => {
  await HomePage.open();
});

When("I expand the {string} section", async (section: string) => {
  await HomePage.section(section).click();
});

Then(
  "I should see {string} and {string} in the {string} section",
  async (first: string, second: string, section: string) => {
    await expect(HomePage.sectionItem(section, first)).toBeDisplayed();
    await expect(HomePage.sectionItem(section, second)).toBeDisplayed();
  },
);

When("I click {string} on {string}", async (button: string, item: string) => {
  await HomePage.clickAndSwitchToNewTab(
    HomePage.sectionItemButton(item, button),
  );
});
