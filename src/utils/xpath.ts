export const containsText = (text: string) =>
  `//*[contains(normalize-space(text()), "${text}")]`;
