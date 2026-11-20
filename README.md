# cermati-wdio-bdd

End-to-end BDD tests for [cermati.com](https://www.cermati.com), written with **WebdriverIO + Cucumber + TypeScript**.

## Approach

**1. Selectors from the real DOM.** Every selector was checked against the live site before it went into a page object. For example, the search box is `button[aria-label="Buka Pencarian"]` + `input[name="term"]`, and the category counts are the `.badge` elements in the desktop sidebar (`ul.nav-stacked`). WebdriverIO's strict selector mode is on, so a selector that matches more than one element fails instead of clicking the wrong one.

**2. No hardcoded test data for live numbers.** The task example says 58 results; the site currently shows 57 (`0 + 7 + 0 + 25 + 25`). The test reads both the total and the category counts from the page and only asserts that they are consistent, so it keeps working as Cermati's content changes.

**3. Page Object Model, split by domain.**

- **Feature files** describe behaviour in plain language. No selectors or technical details.
- **Step definitions** are thin: they call page objects and make assertions.
- **Page objects** own the selectors and page actions. They extend `BasePage` (shared helpers such as `waitForUrl` and `clickAndSwitchToNewTab`) and are exported as a single shared instance.
- **Constants and config** hold timeouts, fund codes, search categories, and env vars, so nothing is a magic value.

Folders are grouped by domain (`home/`, `reksa-dana/`, `search-bca/`), so everything for one feature sits together.

**4. Debuggable failures.** Assertion messages show the actual vs. expected values, and a screenshot of every failed step is saved to `reports/screenshots/`.

### Assumptions

- The **"Semua"** category has an empty badge on the site; it is counted as **0** in the sum.
- Counts are read from the **desktop sidebar** (the browser runs at 1440×900); the mobile category list has no counts.
- In compare mode a fund is selected by clicking its **card**; the checkbox only displays the state (`pointer-events: none`).
- The comparison page always has 3 slots; empty `fundN=` URL params are not counted as funds.
- Tests run against the **production site**, so results depend on its availability and content.

## Setup

**Requirements:** Node.js 20+ and Google Chrome. WebdriverIO downloads the matching ChromeDriver automatically.

```bash
npm install
```

## Run

```bash
npm test                  # all scenarios, browser visible
npm run test:headless     # all scenarios, headless
npm run test:search       # @search      BCA search count check
npm run test:comparison   # @comparison  fund comparison page
npm run test:e2e          # @e2e         full user journeys
npm run test:smoke        # @smoke       fast checks, headless
```

Optional environment variables:

| Variable   | Default                   | Description                    |
| ---------- | ------------------------- | ------------------------------ |
| `BASE_URL` | `https://www.cermati.com` | Site under test                |
| `HEADLESS` | `false`                   | `true` to run Chrome headless  |
| `TAGS`     | _(all)_                   | Cucumber tag expression to run |

Example: `HEADLESS=true npm run test:search`

### Code quality

```bash
npm run typecheck      # TypeScript strict mode
npm run format         # format with Prettier
npm run format:check   # verify formatting (e.g. in CI)
npm run clean          # delete reports/
```

## Project structure

```
src/
├── config/
│   └── environment.ts              env vars (BASE_URL, HEADLESS, TAGS)
├── constants/
│   ├── fund.ts                     fund type codes (Syariah / conventional)
│   ├── search.ts                   search result categories
│   └── timeouts.ts
├── features/
│   ├── reksa-dana/
│   │   └── money-market-fund-comparison.feature
│   └── search-bca/
│       └── search-result-count.feature
├── pages/
│   ├── base.page.ts                shared page helpers
│   ├── home/
│   │   └── home.page.ts            header search, product sections
│   ├── reksa-dana/
│   │   ├── reksa-dana.page.ts      fund list, filter, compare
│   │   └── fund-comparison.page.ts
│   └── search-bca/
│       └── search-result.page.ts   total results, category counts
├── step-definitions/
│   ├── home/
│   ├── reksa-dana/
│   └── search-bca/
├── support/
│   └── hooks.ts                    screenshot on failure
└── utils/
    └── xpath.ts
```

### Naming conventions

| Item            | Convention                  | Example                                    |
| --------------- | --------------------------- | ------------------------------------------ |
| Files           | kebab-case + role suffix    | `search-result.page.ts`, `search.steps.ts` |
| Page classes    | PascalCase + `Page`         | `SearchResultPage`                         |
| Element getters | noun describing the element | `searchInput`, `submitCompareButton`       |
| Actions         | verb                        | `search()`, `applyFilter()`                |
| Data readers    | `get…`                      | `getTotalResults()`, `getCategoryCounts()` |
| Constants       | UPPER_SNAKE_CASE            | `SEARCH_CATEGORIES`, `TIMEOUT`             |
