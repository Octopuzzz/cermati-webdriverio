import { env } from "./src/config/environment.ts";
import { TIMEOUT } from "./src/constants/timeouts.ts";
import { createReportDir, screenshotOnFailure } from "./src/support/hooks.ts";

export const config: WebdriverIO.Config = {
  runner: "local",
  specs: ["./src/features/**/*.feature"],
  maxInstances: 1,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--window-size=1440,900",
          "--lang=id-ID",
          ...(env.headless ? ["--headless=new"] : []),
        ],
      },
    },
  ],

  baseUrl: env.baseUrl,
  logLevel: "warn",
  waitforTimeout: TIMEOUT.default,
  connectionRetryTimeout: TIMEOUT.connectionRetry,
  connectionRetryCount: 2,

  framework: "cucumber",
  reporters: ["spec"],
  cucumberOpts: {
    require: ["./src/step-definitions/**/*.steps.ts"],
    timeout: TIMEOUT.step,
    tags: env.tags,
    failAmbiguousDefinitions: true,
  },

  onPrepare: createReportDir,
  afterStep: screenshotOnFailure,
};
