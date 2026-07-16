# Portfolio tool — Qmodii Design System prototype

A working prototype of QMOD's **Portfolio** tool (Adnan's lab,
`lab.c1.quotemedia.com/adnan/portfolio`), rebuilt entirely on the **Qmodii
Design System**. Two goals:

1. **Validate** that the Qmodii DS covers what these portfolio/market-data
   projects need — and surface the gaps where it doesn't (see below).
2. Give the devs a **concrete reference** for how the real DS components compose
   into this tool.

Every control on the page is a real Qmodii component (`DataTable`, `AreaChart`,
`TimeHorizon`, `Paginator`, `Card`, `TabMenu`, `ToggleButton`, `Select`,
`Button`, `Tag`, `Chip`, `Tooltip`, `Drawer`, `InputText`, `InputNumber`,
`DatePicker`, `Checkbox`, `Change`, `Divider`, `Message`) read off
`window.QmodiiDesignSystem_e89f18`. Data is illustrative/mock.

## Run

No build step. Either open `portfolio.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000/portfolio.html
```

It is **fully self-contained / offline-capable** — React 18.3.1, ReactDOM, and
Babel standalone 7.29.0 are vendored under `qmodii-ds/vendor/`, so no CDN is
needed. The only network dependency is the **Roboto / Roboto Mono** webfonts,
which the DS's `tokens/fonts.css` pulls from Google Fonts; offline they fall
back to the system sans-serif (structure/spacing are unaffected).

Deep-link params (used for review, harmless otherwise):
`?tab=Holdings`, `?group=Sector`, `?stats=1`, `?drawer=1`, `?mode=Features`.

## Files

| Path | Purpose |
|---|---|
| `portfolio.html` | The prototype — page chrome + the React app (inline `text/babel`). Portfolio-specific layout is an inline `<style>` block using **only DS tokens**. |
| `qmodii-ds/styles.css`, `qmodii-ds/tokens/` | The Qmodii DS token layer, vendored from the design-system package. |
| `qmodii-ds/_ds_bundle.js` | The compiled Qmodii React components (`window.QmodiiDesignSystem_e89f18`). |
| `qmodii-ds/vendor/` | React, ReactDOM, Babel standalone (same versions the DS's own `*.card.html` demos use), vendored for offline use. |

> Note: this is separate from the older filing-filter prototypes in this repo
> (`index.html`, `filter-prototype.html`, …), which use the standalone
> `quotemedia-styles.css` (`--qm-*`) lab stylesheet. This prototype deliberately
> uses the **Qmodii DS** instead.

## Tabs (all 10)

Four are rebuilt from Adnan's screenshots; the other six are designed to match a
QMOD portfolio (most are `DataTable`s with different column sets).

| Tab | Built from | Key DS components |
|---|---|---|
| **Overview** | screenshot | `DataTable` (fundamental columns, `change` Chg/%Chg, dividend "D" badge), Sector grouping + Sum/Avg/Min/Max/Median stat rows |
| **Holdings** | screenshot | `DataTable` (cost / shares / market value / gain-loss), `ToggleButton` All/Gainers/Losers/Dividends |
| **Charts** | screenshot | `Card` grid, directional sparklines, `TimeHorizon`, `Paginator`, `Change` |
| **Performance** | designed | `AreaChart` (portfolio value), `TimeHorizon`, per-holding returns `DataTable` |
| **Trading** | designed | trade-blotter `DataTable`, `Tag` buy/sell, `Button` |
| **Dividends** | designed | income `Card` + ex/pay-date `DataTable` |
| **Ownership** | designed | `Card` grid with institutional / insider meters + top holders |
| **Technicals** | designed | `DataTable` (RSI, MAs, MACD `Tag`, 52-week range meter, beta) |
| **Profile** | designed | `Select` picker, `Card`, `Chip`, `Divider`, `Change` |
| **Custom** | designed | Overview grid + `Menu`/`Checkbox` column toggle |
| Add/Edit Holdings | screenshot | `Drawer` + editable grid of `InputText`/`InputNumber`/`DatePicker` + `Button`s |

## Design-system coverage & gaps (the validation result)

**Covered cleanly — no gap.** The bulk of the tool maps 1:1 onto DS components:
the quote/holdings grids (`DataTable` with `change` columns for auto green/red
gain-loss, `numeric` + Roboto Mono alignment, `rowHeader` symbols, sort / resize
/ reorder / sticky), the market controls (`TimeHorizon`, `Paginator`,
`ToggleButton`, `Select`), containers and nav (`Card`, `TabMenu`, `Divider`),
feedback (`Tag` incl. buy/sell, `Chip`, `Tooltip`, `Message`), forms
(`InputText`, `InputNumber`, `DatePicker`, `Checkbox`, `Button`), the `Change`
delta, and the `Drawer`.

**Gaps found — built here as faithful approximations; recommend adding to the DS:**

| # | Gap | Where it bites | Approximation used | Suggested DS change |
|---|---|---|---|---|
| 1 | **`DataTable` has no row grouping** (no group-header rows) | Overview / Custom "group by Sector/Industry/…" | Hand-built table using the `--table-*` tokens: one charcoal group-header bar per group | Add a `groupBy` (or grouped-data) mode with styled group-header rows |
| 2 | **`DataTable` has no aggregate / footer rows** | The Sum/Avg/Min/Max/Median stat rows under each group | Computed stat rows appended per group, styled amber via `render` | Add per-group / table `summary` rows (footer) with an aggregate API |
| 3 | **`AreaChart` is brand-blue only** — no color/direction prop | Charts cards color the line green/red by direction | Hand-built directional SVG sparkline for the cards; the real `AreaChart` is used (correctly, blue) on Performance | Add `color` / `variant='auto'` (green up, red down) to `AreaChart` / `LineChart` |
| 4 | **No dark theme implemented** | The moon toggle in the header | Toggle renders but is inert (labeled as such) | Implement the dark + QuoteStream token modes already present in the Figma export |
| 5 | **No checkbox-dropdown / multi-check overlay** | The Stats menu and the Custom "Columns" menu | Built from `Button` + a small popover of `Checkbox`es | Add a checkbox `Menu`/multiselect-overlay variant |
| 6 | **`DataTable` is read-only** (no editable cells) | The Add/Edit-Holdings editor grid | Editor grid composed by hand from `InputText`/`InputNumber`/`DatePicker` | Add an editable/input cell mode (or an official editable-grid component) |

Minor deltas worth noting: the DS `Change` component renders positives without a
leading `+` and negatives as `- 12.34` (a space after the sign); the lab shows
`+12.34` / `-12.34`. Cosmetic, but flag if exact parity is required.
