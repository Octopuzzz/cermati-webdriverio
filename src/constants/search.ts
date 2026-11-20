export const SEARCH_CATEGORIES = [
  "Semua",
  "Kartu Kredit",
  "Pinjaman",
  "Simpanan",
  "Artikel",
  "Promo Kartu Kredit",
] as const;

export type SearchCategory = (typeof SEARCH_CATEGORIES)[number];
