import fs from "fs";
import { browser } from "@wdio/globals";

const SCREENSHOT_DIR = "./reports/screenshots";

export function createReportDir() {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

export async function screenshotOnFailure(
  step: { text: string },
  scenario: { name: string },
  result: { passed: boolean },
) {
  if (result.passed) return;

  const toFileName = (text: string) =>
    text.replace(/[^a-z0-9]+/gi, "_").slice(0, 60);
  const fileName = `${Date.now()}_${toFileName(scenario.name)}_${toFileName(step.text)}.png`;
  await browser.saveScreenshot(`${SCREENSHOT_DIR}/${fileName}`);
}
