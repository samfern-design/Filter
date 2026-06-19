# Responsive filing-type filter

A prototype of QuoteMedia's "Add filter" panel for SEC filing types.

- **≥ 768px** — anchored dropdown with the two-column miller layout
  (categories left, filing types right).
- **< 768px** — full-height bottom sheet with push-style drill-down
  (category list → item list → back) and a persistent footer.

Both layouts share one selection state, so resizing across the breakpoint
keeps your checks intact.

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
| `filing-filter.css` | The responsive component: dropdown + bottom sheet. |
| `filing-filter.js` | Component logic, selection state, and the filing-type data. |
| `index.html` | Demo harness that mounts the filter on an "Add filter" button. |

## Decisions on the spec's open questions (§10)

1. **Apply model** — toggles are *staged* while the panel is open;
   **Search** applies and closes. Re-opening restores the last applied
   selection. Dismissing discards staged edits.
2. **Search result grouping** — cross-category search returns a *flat list*,
   each result tagged with its category (per the spec's stated preference).
3. **Dismiss** — *cancel-on-dismiss*: ×, scrim tap, swipe-down, and Esc all
   close without applying.
4. **Framework** — plain HTML/CSS/JS (the repo had no framework).

## Accessibility

`role="dialog"` + `aria-modal`, focus trap, focus returned to the trigger on
close, keyboard-operable drill-down with a real back button, `role="checkbox"`
rows reporting `aria-checked` (`mixed` for indeterminate "Select all"), an
`aria-live` selection count, ≥44px tap targets, and `prefers-reduced-motion`
support.
