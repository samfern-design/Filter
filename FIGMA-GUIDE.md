# Figma build guide — Filing-type filter

A component-by-component breakdown for rebuilding the filing-type filter in
Figma. Values are taken straight from the prototype (`quotemedia-styles.css`,
`filing-filter.css`). Build foundations first, then atoms → molecules →
organisms → the three assembled layouts.

The component renders three ways, all sharing one selection state:

| Mode | Trigger | Layout |
|---|---|---|
| **Desktop** (≥768px) | dropdown | two-column miller (categories ┃ items) |
| **Narrow + pointer** (<768px, mouse) | dropdown | single-column drill-down popover |
| **Touch** (<768px, coarse pointer) | bottom sheet | single-column drill-down, floating sheet |

---

## 1. Suggested Figma file structure

```
Pages
├─ 0 · Cover
├─ 1 · Foundations      (color / type / elevation / spacing / motion styles)
├─ 2 · Components       (the library — atoms → organisms)
├─ 3 · Layouts          (3 assembled frames: desktop / narrow / sheet)
└─ 4 · Flows & specs    (drill-down flow, states, redlines, a11y notes)
```

---

## 2. Foundations (create as Figma styles first)

### Color styles
| Style name | Hex | Use |
|---|---|---|
| `ground` | `#F6F8FB` | page background |
| `surface` | `#FFFFFF` | panels, sheets, cards |
| `surface-sunk` | `#F1F4F9` | left rail, hover wells |
| `text` | `#161B26` | primary text |
| `text-muted` | `#5B6472` | secondary text |
| `text-faint` | `#8A93A3` | placeholders, disabled, chevrons |
| `border` | `#E4E8EF` | hairlines, dividers |
| `border-strong` | `#CBD3DF` | input borders, handle |
| `accent` | `#0E63D6` | selection, focus, badges |
| `accent-press` | `#0A4FAC` | pressed / checked text |
| `accent-weak` | `#E7F0FC` | tinted selected wells, active chip |
| `scrim` | `#101623` @ 45% | sheet backdrop |

### Text styles
Two families: **UI sans** (system stack) and **Mono** (used for filing codes
and all counts — set with tabular figures).

| Style | Family | Size / line | Weight | Notes |
|---|---|---|---|---|
| `ui/xl` | Sans | 18 / 1.45 | 700 | sheet screen-1 title |
| `ui/lg` | Sans | 15 / 1.45 | 600 | screen-2 title, mobile rows |
| `ui/md` | Sans | 13 / 1.45 | 400–600 | body, rows, buttons |
| `ui/sm` | Sans | 12 | 400 | secondary |
| `ui/xs` | Sans | 11 | 700 | uppercase eyebrow (section header), tracking +0.06em |
| `mono/md` | Mono | 13 | 500/600 | filing code (plain) |
| `mono/sm` | Mono | 12 | 700 | counts / badges, tabular |
| `mono/xs` | Mono | 11 | 700 | badge numerals, tabular |

### Spacing scale
`4 · 8 · 12 · 16 · 20 · 24` — use as Auto Layout gap/padding tokens.

### Corner radius
`sm 6 · md 10 · lg 16` · pill `999`.

### Elevation (effect styles)
| Style | Value |
|---|---|
| `shadow/1` | `0 1 2 rgba(16,22,35,.06)` |
| `shadow/pop` | `0 12 32 rgba(16,22,35,.16)` + `0 2 6 rgba(16,22,35,.08)` (dropdown) |
| `shadow/sheet` | `0 -8 40 rgba(16,22,35,.22)` (bottom sheet) |

### Motion (document, even if Figma can't fully animate)
- **Drill-down (screen↔screen):** Material 3 *Shared axis X* — 30px slide + fade,
  emphasized easing `cubic-bezier(0.2,0,0,1)`, **300ms**.
- **Sheet:** open slide-up 240ms ease-out; close 200ms ease-in; scrim fades.
- **Dropdown:** fade + scale(0.98→1), 140ms.
- **Chevron:** rotates 180° when open, 160ms.
- Respect `prefers-reduced-motion` → instant cross-fade.

### Breakpoint
`768px` is the layout switch; the narrow split below it is by input type
(`pointer: coarse`), not width.

---

## 3. Component inventory

### Atoms

**1 · Icon (set)**
Instance-swappable 16–18px icons: `chevron-right`, `chevron-left`,
`chevron-down`, `close`, `search`, `check`, `minus`. Keep on a 16/18 grid,
1.6–1.8 stroke.

**2 · Checkbox**
Custom 20×20, radius 5, 1.5px border.
- Variants: `unchecked` (border `border-strong`, surface fill) ·
  `checked` (fill `accent`, white check) · `indeterminate` (fill `accent`,
  white minus) · add `focus` overlay (2px `accent` ring, offset 2).
- Color is never the only signal — always paired with the glyph.

**3 · Count badge**
Pill, min 18–22 wide × 18–22 tall, radius 999, fill `accent`, text white
`mono/xs`, tabular. One component reused in chip, desktop rail, and mobile
category row.

**4 · Button**
Property `variant` = {`primary`, `ghost`, `outline`} × `state` =
{default, hover, disabled}. Height 40, radius 6, label `ui/md` 600.
- primary: fill `accent` / hover `accent-press` / white text
- ghost: transparent / hover `surface-sunk` / `text-muted`
- outline: `border-strong` border / `surface` fill
- disabled: 45% opacity.

**5 · Icon button**
40×40, radius 6, transparent → hover `surface-sunk`. For close / back.

**6 · Drag handle**
40×4 bar, radius 4, `border-strong`, centered; sheet-only.

**7 · Search field**
Height 40, radius 6, `border-strong` border → focus `accent`. Leading 16px
search icon, placeholder `text-faint`. States: default / focus / filled.

### Molecules

**8 · Filter chip (the trigger)** — the dropdown button.
- Property `state` = {`empty`, `single`, `multi`}; plus interaction
  {default, hover, focus, **open**}.
- Anatomy: `[ text ] [ count badge ] [ chevron ]`, height 38, radius 9.
  - empty → label "Filing type" + chevron; neutral (`surface`, `border-strong`).
  - single → selected code text; chip tinted (`accent-weak` fill, `accent`
    border, `accent-press` text).
  - multi → label + count **badge**; tinted.
- Badge visibility: hidden at rest; **shown on hover, focus, or when open**.
- Chevron always present; rotates when open.

**9 · Item row (filing type)**
- Height 44 (desktop) / 48 (touch), radius 6, full-width tap target.
- Anatomy: `[ checkbox ] [ code · mono/md plain text ] ( [ category tag ] )`.
  No description text, no code pill.
- Property `state` = {unchecked, checked} × {default, hover, pressed, focus}.
  - checked → code in `accent-press`, weight 600.
  - hover → `surface-sunk`; pressed → `accent-weak`.
- Boolean property `showCategory` for the search-result variant
  (category tag = `ui/xs` uppercase `text-faint`, right-aligned).

**10 · Select-all row**
Same row frame, `ui/md` 600 label "Select all" + right-aligned total count.
Property `state` = {none, indeterminate, all} driving the checkbox glyph.

**11 · Category row — desktop rail**
Height 38, radius 6. `[ name (truncates) ] ( [ count badge ] ) [ chevron ]`.
- Property `state` = {default, hover, active}.
- active → `surface` fill + `shadow/1` + 3px `accent` left accent bar + visible
  chevron + bold name. Chevron hidden until active.
- Boolean `hasCount` → show badge.

**12 · Category row — mobile / drill-down (screen 1)**
Height 48, `ui/lg`. `[ name ] ( [ count badge ] ) [ chevron-right ]`.
Property `state` = {default, pressed}; boolean `hasCount`.

**13 · Section header — desktop right pane**
`[ TITLE · ui/xs uppercase ] ……… [ N items · mono/sm muted ]`, bottom border.

**14 · Screen header — drill-down / sheet**
- `screen-1`: `[ title "Filing type" · ui/xl ] …… [ close icon-button ]`.
- `screen-2`: `[ back icon-button ] [ category title · ui/lg ] …… [ N items ]`.
Height ~52.

**15 · Footer bar**
Top border, `surface`, height ~64, space-between.
`[ "N selected" / "None selected" · live region ] …… [ actions ]`.
- Property `screen` = {1, 2}: screen-1 → Clear (ghost) + Search (primary);
  screen-2 → Done (primary).
- Property `primaryEnabled` = {true,false} (disabled at zero).

**16 · Empty state**
Centered, min-height 160: muted "No filings match '[query]'" + "Clear search"
(outline button). Property for the query text.

### Organisms

**17 · Category list screen** = screen header + search field + scrollable
list of category rows (#12). Used by both narrow modes.

**18 · Item list screen** = screen header (screen-2) + search field +
Select-all row + scrollable item rows. Used by both narrow modes.

**19 · Search results screen** = search field + flat list of item rows with
`showCategory=true`, or the empty state.

**20 · Desktop miller body** = left rail (category rows #11, scrolls) ┃ right
pane (section header + scrollable item list). 200px ┃ fill, 1px divider.

### Containers (assembled layouts — page 3)

**21 · Dropdown popover (desktop miller)**
560 × 440, radius `md`, `shadow/pop`, border. Contains #20 + footer (#15).
Anchored below the trigger.

**22 · Dropdown popover (narrow drill-down)**
~380 × 440, radius `md`, `shadow/pop`. Contains the active screen (#17/#18) +
footer. No drag handle, no scrim. Anchored below the trigger.

**23 · Bottom sheet (touch)**
Floating: 14px inset on all sides + safe area, radius `lg`, `shadow/sheet`,
scrim behind. Drag handle + active screen + footer. Near-full height.

---

## 4. Component-property cheat sheet

| Component | Variant props | Boolean / text / instance props |
|---|---|---|
| Checkbox | state | — |
| Button | variant, state | label (text) |
| Filter chip | state, interaction | label (text), count (text), icon (swap) |
| Item row | state, interaction | showCategory (bool), code (text), tag (text) |
| Select-all row | state | total (text) |
| Category row (desktop) | state | hasCount (bool), name (text), count (text) |
| Category row (mobile) | state | hasCount (bool), name (text), count (text) |
| Footer | screen, primaryEnabled | count label (text) |
| Empty state | — | query (text) |

---

## 5. Build order

1. Color / text / effect styles + spacing & radius tokens.
2. Icons, Checkbox, Count badge, Button, Icon button, Search field, Drag handle.
3. Chip, Item row, Select-all row, both Category rows, headers, Footer, Empty state.
4. Screens (category list, item list, search results) + desktop miller body.
5. Three containers, then place into the three layout frames at the breakpoints.
6. Flow page: category → item → back (shared-axis), and a states sheet
   (empty/single/multi chip; none/indeterminate/all select-all; checked rows;
   active category; disabled primary; empty search).

---

## 6. Accessibility to annotate in Figma

- Panel = modal dialog: `role="dialog"`, `aria-modal`, labelled
  "Filing type filter"; trap focus; return focus to the chip on close.
- Every toggle row is a checkbox reporting state; Select-all reports
  `mixed` when indeterminate.
- Real back button (never gesture-only). Tap targets ≥ 44×44.
- Footer count in an `aria-live="polite"` region.
- Visible focus ring (2px `accent`, offset 2) on every interactive element.
- Color is never the sole indicator — pair with glyph/text.
- Long names truncate to one line (ellipsis); full text in `title`/`aria-label`.
