# Component documentation

Two reusable, dependency-free filter components built on the shared tokens in
`quotemedia-styles.css`:

| Component | Files | Use it for |
|---|---|---|
| **Faceted filter** | `filing-filter.css`, `filing-filter.js` | Multi-select across grouped categories (filing types, sectors, screener criteria). |
| **Range filter** | `range-filter.css`, `range-filter.js` | A single criterion's value: preset ranges + a custom range / value / date range. |

Both are declarative: include the CSS + JS, then mark up a trigger with data
attributes. No build step or framework required.

```html
<link rel="stylesheet" href="quotemedia-styles.css" />
<link rel="stylesheet" href="filing-filter.css" />   <!-- and/or range-filter.css -->
<!-- triggers … -->
<script src="filing-filter.js"></script>             <!-- and/or range-filter.js -->
```

---

## 1. Faceted filter

A categorized multi-select. Renders three ways from one selection state:

| Viewport / input | Presentation |
|---|---|
| ≥ 768px | Anchored dropdown, two-column miller (categories ┃ options) |
| < 768px, pointer | Anchored dropdown, drill-down (category list → options → back) |
| < 768px, touch | Floating bottom sheet, same drill-down |

Selections apply **live** (the trigger updates as you toggle); the footer
**Search** button closes the panel, **Clear** empties the selection.

### Markup

The trigger is a chip. The component finds it via `data-qm-filter` and builds
the panel itself (appended to `<body>`).

```html
<div class="qm-filter">
  <div class="qm-chip" data-state="empty">
    <button class="qm-chip__main" type="button"
            data-qm-filter data-dataset="filings"
            aria-haspopup="dialog" aria-expanded="false">
      <span class="qm-chip__text" data-chip-text>Filing type</span>
      <span class="qm-chip__badge" data-chip-badge></span>
      <svg class="qm-chip__chev" viewBox="0 0 16 16" …><path d="M4 6l4 4 4-4"/></svg>
    </button>
  </div>
</div>
```

### Data attributes

| Attribute | On | Values | Default |
|---|---|---|---|
| `data-qm-filter` | trigger button | (presence) — marks the trigger | — |
| `data-dataset` | trigger button | a key in `DATASETS` (`filings`, `sectors`, `screener`) | `filings` |
| `data-narrow-nav` | trigger button | `drilldown` \| `accordion` | dataset's `narrow`, else `drilldown` |
| `data-qm-narrow-toggle` | a `<input type="checkbox">` | trigger id, or empty for all faceted filters | — |

### Datasets

Defined in the `DATASETS` registry in `filing-filter.js`:

```js
filings: {
  label: "Filing type",          // chip label / dialog title
  searchAll: "Search all filings",
  categories: FILING_CATEGORIES, // [{ id, name, items: [[code, label], …] }]
  defaultIndex: 2,               // category shown first on desktop
  mono: true,                    // option text in mono (codes) vs UI font (names)
  narrow: "drilldown",           // optional: default narrow nav
}
```

A **category** is `{ id, name, items }`; each **item** is `[code, label]`.
`code` is the shown text (plain), `label` is the description (kept for
`aria-label`/`title`). Item ids are `"<categoryId>:<code>"` and must be unique —
keep categories disjoint. Add a filter by adding a registry entry; no component
changes needed.

### Behaviors

- **Live selection** — toggling an option updates the committed selection
  immediately; counts, per-category badges, footer total, and chip all track.
- **Chip states** — `empty` (label + chevron), `single` (selected code),
  `multi` (label + count badge). The badge shows on hover/focus or while open.
- **Select all** — per category; reflects none / indeterminate (`mixed`) / all.
- **Search** appears only when its list exceeds **15 options**: the
  cross-category search (all items) on screen 1, and the in-category search per
  category on screen 2.
- **Narrow nav** — `drilldown` (push navigation) or `accordion` (expanding
  sections in one scroll). Switchable at runtime.

### JavaScript API

- Auto-boots on `DOMContentLoaded`; each instance is stored on the trigger as
  `trigger._qm`.
- Constructor exposed as `window.QMFilter` for manual mounting:
  `new QMFilter(triggerEl, { dataset, narrowNav })`.
- Instance method: `setNarrowNav("drilldown" | "accordion")` — re-renders live.

---

## 2. Range filter

A single-criterion editor: a searchable list of preset ranges (single-select)
plus a **Custom** screen. Dropdown on pointer devices, compact bottom sheet on
touch. Selecting a preset applies live and closes.

### Markup

```html
<button class="qm-rf-chip" type="button" data-qm-range data-filter="pe"
        aria-haspopup="dialog" aria-expanded="false">
  <span class="qm-rf-chip__text" data-rf-text>P/E</span>
  <svg class="qm-rf-chip__chev" viewBox="0 0 16 16" …><path d="M4 6l4 4 4-4"/></svg>
</button>
```

### Data attributes

| Attribute | On | Values | Default |
|---|---|---|---|
| `data-qm-range` | trigger button | (presence) — marks the trigger | — |
| `data-filter` | trigger button | a key in `RANGE_FILTERS` (`pe`, `yield`, `mktcap`, `nearmoney`, `expiry`) | `pe` |
| `data-default` | trigger button | a preset id, `first`, or `empty` | `empty` |

### Filter definitions

Defined in the `RANGE_FILTERS` registry in `range-filter.js`:

```js
pe: {
  label: "P/E",                  // chip label
  title: "Price to earnings ratio",
  help: "Share price ÷ earnings per share.",   // ? tooltip
  unit: "",                      // "%", "$" (magnitude), or ""
  step: 1,                       // numeric input step
  custom: "range",               // "range" | "single" | "dates"
  default: "first",              // optional preselection
  presets: [
    { id: "25-35", label: "25 to 35", desc: "High", from: 25, to: 35 },
    …
  ],
}
```

**Preset** = `{ id, label, desc?, from, to }`. `null` bound = open-ended
(`from:50,to:null` → "50+"; `from:null,to:5` → "≤5"). A **categorical** preset
(e.g. expiry's "Weeklies") simply omits `from`/`to` and shows its `label`.

**Custom modes:**
- `range` — From / To number inputs.
- `single` — one Value input (stored as `from === to`).
- `dates` — From / To with an inline range **calendar** (month nav,
  Monday-first grid, two-click range selection).

### Behaviors

- **Single-select**, applies live and closes; the checkmark marks the current
  choice when reopened.
- **Custom** is saved into the list under a "Custom" heading (deduped),
  selectable later, each with its own delete (trash) control.
- **Search** appears only when presets + customs exceed **15**.
- The chip shows `Label Value` (e.g. `P/E 25–35`, `Near money 5%`,
  `Expiry Jun 19 – Sep 30, 2026`) and stays neutral (no active tint).

### JavaScript API

- Auto-boots on `DOMContentLoaded`; instance stored on `trigger._qm`.
- Constructor exposed as `window.QMRangeFilter`:
  `new QMRangeFilter(triggerEl, { filter, default })`.

---

## 3. Shared foundations

All visual values come from `quotemedia-styles.css` (`:root` custom
properties) — color, type (UI sans + tabular mono), spacing, radius, elevation,
breakpoint. Both components reuse its primitives (`.qm-btn`, `.qm-icon-btn`,
`.qm-search`, `.qm-check`). See `FIGMA-GUIDE.md` for the full token tables.

## 4. Accessibility

- Panel is a modal dialog (`role="dialog"`, `aria-modal`), labelled by the
  filter title; focus is trapped while open and returned to the trigger on
  close (faceted filter).
- Options report state: faceted rows are `role="checkbox"` with `aria-checked`
  (`mixed` for indeterminate Select all); range presets are `role="radio"`.
- Keyboard-operable throughout; the drill-down has a real **back** button
  (shown only on the drilled-in step), never gesture-only.
- The faceted footer count is an `aria-live="polite"` region.
- Tap targets ≥ 44×44; visible focus ring on every control; `[hidden]` is
  enforced over component display rules; `prefers-reduced-motion` drops
  slide/expand animations to instant/cross-fade.

## 5. Demos & bundling

Per-component demos: `index.html` (filings), `sector.html`, `screener.html`,
`range.html`; combined gallery: `all.html`. The `*-prototype.html` files are
single-file builds with the CSS and JS inlined — open any directly, no server
needed.
