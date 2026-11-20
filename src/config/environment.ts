export const env = {
  baseUrl: process.env.BASE_URL ?? "https://www.cermati.com",
  headless: process.env.HEADLESS === "true",
  tags: process.env.TAGS ?? "",
};
