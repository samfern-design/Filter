# Responsive filing-type filter

A prototype of QuoteMedia's "Add filter" panel for SEC filing types.

- **≥ 768px** — anchored dropdown with the two-column miller layout
  (categories left, filing types right).
- **< 768px, touch device** — floating bottom sheet with push-style drill-down
  (category list → item list → back) and a persistent footer.
- **< 768px, pointer device** — the same drill-down flow, but skinned as an
  anchored dropdown (desktop look) rather than a bottom sheet.

The narrow split is by input type (`pointer: coarse`), not just width: phones
get the sheet, a narrowed desktop window gets the dropdown. All three modes
share one selection state, so resizing or switching between them keeps your
checks intact.

## Run

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

Resize the window across 768px (with the panel open) to watch the layout
swap while the selection holds.

## Files

| File | Purpose |
|---|---|
| `quotemedia-styles.css` | Shared design tokens + base primitives (the lab stylesheet). |
| `filing-filter.css` | The responsive component: dropdown + drill-down + bottom sheet. |
| `filing-filter.js` | The data-driven component, plus both datasets (filings + sectors). |
| `index.html` | Filing-type demo (`data-dataset="filings"`). |
| `sector.html` | Industry/sector demo (`data-dataset="sectors"`). |
| `screener.html` | Market-screener "Add filter criteria" demo (`data-dataset="screener"`). |
| `range-filter.css` / `range-filter.js` | Companion **range-filter editor** (single criterion: presets + manual From/To). |
| `range.html` | Range-editor demo (P/E, dividend yield, market cap chips). |
| `optionschain.html` | **Options-chain filter row** (Expiry, Strikes, Near money %, Near, Min volume, Min open interest, Max spread, Contract type). |

## Range-filter editor (companion component)

A separate, single-criterion value editor for the screener: a chip opens a
dropdown (or compact bottom sheet on touch) with a searchable list of preset
ranges (single-select) and a **Manual setup** screen for a custom From/To. The
header carries a help (?) and a remove (trash) action. Triggers opt in with
`data-qm-range` and pick a metric with `data-filter` (`pe`, `yield`, `mktcap`,
plus the options-chain set: `nearmoney`, `near`, `minvol`, `minoi`, `maxspread`,
`contracttype`, `strikes`, `expiry`), defined in the `RANGE_FILTERS` registry in
`range-filter.js`. Each entry's `custom` controls the manual screen: `range`
(From/To, default), `single` (one value), `dates` (date range), or `none`
(presets-only, no Custom button). `data-default="<preset id>"` pre-selects a
value.

```html
<button data-qm-range data-filter="pe" …>P/E ▾</button>
```

## One component, multiple datasets

The component is data-driven. A trigger opts in with `data-qm-filter` and picks
a dataset with `data-dataset`:

```html
<button data-qm-filter data-dataset="sectors" …>…</button>
```

At small breakpoints, navigation between groups can be either **drill-down**
(push: group list → option list → back) or **accordion** (expanding sections
in one scroll). Set it per trigger with `data-narrow-nav` (or per dataset via
`narrow:`), default `drilldown`:

```html
<button data-qm-filter data-dataset="screener" data-narrow-nav="accordion" …>…</button>
```

Datasets live in the `DATASETS` registry in `filing-filter.js`
(`filings` = SEC filing types, `sectors` = GICS industries, `screener` =
market-screener criteria grouped by type). Each sets its
label, search placeholder, categories, default category, and whether option
text renders in mono (codes) or the UI font (names). Add a new filter by
adding a dataset entry — no component changes needed.

## Decisions on the spec's open questions (§10)

1. **Apply model** — selections apply **live** as you toggle, so the chip and
   all counts update immediately (not gated behind **Search**). **Search**
   simply closes the panel; **Clear** empties the selection.
2. **Search result grouping** — cross-category search returns a *flat list*,
   each result tagged with its category (per the spec's stated preference).
3. **Dismiss** — because selections apply live, closing (×, scrim, swipe-down,
   Esc) keeps them rather than cancelling.
4. **Framework** — plain HTML/CSS/JS (the repo had no framework).

## Accessibility

`role="dialog"` + `aria-modal`, focus trap, focus returned to the trigger on
close, keyboard-operable drill-down with a real back button, `role="checkbox"`
rows reporting `aria-checked` (`mixed` for indeterminate "Select all"), an
`aria-live` selection count, ≥44px tap targets, and `prefers-reduced-motion`
support.
