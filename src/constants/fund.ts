export type FundCategory = "Syariah" | "conventional";

export const FUND_CODE: Record<FundCategory, RegExp> = {
  Syariah: /\d{2}mms/,
  conventional: /\d{2}mmc/,
};
