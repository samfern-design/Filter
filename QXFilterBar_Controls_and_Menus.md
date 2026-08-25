# QX-FilterBar — Controls and Menus

A design brief for the Qmodii filter bar, covering two things: **what kind of control
each thing on the bar is**, and **what menu it opens into**. Everything here is read out
of a working prototype of four surfaces (screener, options chain, options analyzer,
performance matrix), so the "built" markers are inspectable rather than asserted.

**How to use this document.** Sections 1–2 are the model — read them first, because the
state lists only make sense once the three roles are clear. Sections 3–6 are the state
and scenario inventories, each row marked *built* (with the prototype flow that shows
it) or **NEEDS DESIGN**. Section 7 collects every unbuilt state into a prioritised list
of screens to design. Section 0 is the design system the output has to sit inside.

---

## 0. Design system constraints

Qmodii DS. Tokens live on a `.qx-root` scope, never on `:root`.

### Colour

| Role | Token | Value |
|---|---|---|
| Brand / primary | `--qx-brand-700` | `#0477D1` |
| Primary hover | `--qx-brand-600` | `#1D86D8` |
| Selected background | `--qx-brand-50` | `#F2F8FE` |
| Selected border | `--qx-brand-200` | `#A5D0F3` |
| Selected foreground | `--qx-brand-900` | `#002C5A` |
| Surface | `--qx-neutral-0` → `--qx-neutral-200` | `#FFFFFF`, `#F6F6F6`, `#EEEEEE`, `#E3E3E3` |
| Border | `--qx-neutral-200` / hover `-300` | `#E3E3E3` / `#A7A7A7` |
| Text | primary / secondary / muted | `#222222` / `#575757` / `#707070` |
| Up (one green only) | `--qx-up-500` | `#2B7F45` |
| Down (one red only) | `--qx-down-500` | `#D02A48` |
| Scrim | `--qx-mask-bg` | `rgba(0,0,0,.4)` |

There is exactly one green and one red. There is **no categorical colour ramp** — if a
design needs to distinguish more than two semantic states, it must do so with form, not
hue.

### Form

- **Radii** — 2px (`xs`), 4px (`sm`, the default for chips, buttons, menus), 8px (`lg`), pill (`full`)
- **Elevation is border-first.** Shadows only on things that float: `0 2px 6px rgba(0,0,0,.10), 0 1px 2px rgba(0,0,0,.06)` for a popover, `0 8px 24px rgba(0,0,0,.12)` for a panel, `0 -8px 28px rgba(0,0,0,.20)` for a bottom sheet. Never on a resting control.
- **No gradients** anywhere.

### Type and metrics

- Roboto. Base 14px / 20px, `font-variant-numeric: tabular-nums` throughout.
- Chips and buttons: **28px tall**, 13px text, 8px horizontal padding (buttons 10px), 6px internal gap. Compact density: 26px / 12.5px.
- Option rows: 13px, 6px × 8px padding, 8px gap.
- **Touch**: option and drill rows go to **44px minimum height** with 8px × 12px padding. The chip itself stays 28px and gets its 44px target from the row padding around it (10px × 12px), so the visual rhythm does not change between input modes.

### Motion

- 160ms standard, 120ms fast, `cubic-bezier(.4, 0, .2, 1)`.
- No bounce, no overshoot.
- **The surrounding tool never animates.** When a menu opens, only the menu moves.

---

## 1. Three control roles

The bar carries 37 controls across four surfaces. They look almost identical and behave
in three different ways.

- **Filter** — narrows a set. Has a state meaning *no constraint*, so setting it is news.
- **Parameter** — picks a value the surface is computed *from*. There is no "no constraint": every table needs a frequency, a year, a universe. It always carries a value, so a set value is not news.
- **Display control** — changes how the same rows are drawn. Not part of the question being asked.

### 1.1 The test

Two questions, asked in this order, classify every control.

```
A control on the bar
        │
        ├─ Is there a value that means "no constraint"?
        │        │
        │        └─ YES ─────────────────────────────► FILTER
        │                                              counted · cleared · accented · may withdraw
        └─ NO
                 │
                 ├─ Does it change the numbers, or only their presentation?
                 │        │
                 │        ├─ the numbers ────────────► PARAMETER
                 │        │                            not counted · not cleared · never accented · pinned
                 │        └─ presentation only ──────► DISPLAY CONTROL
                 │                                     not counted · not cleared · never accented · withdraws first
```

Question one is the only design judgement. Once a control's role is fixed, the four
behaviours follow and are not separately negotiable per control.

### 1.2 What follows from the role

| Behaviour | Filter | Parameter | Display control |
|---|---|---|---|
| Off state | Yes — *All*, or a named default | None — always carries a value | None |
| Counted in the All-filters badge | Yes, when set | No | No |
| Reset by Clear | Yes | No — would leave the table undefined | No — a view choice is not a filter |
| Accent when set | Yes — set is the exception | No — set is the norm | No |
| Withdraws under overflow | Yes, right to left, gated ones last | Never | First |
| Can empty the result | Yes | No | No |
| Per-option counts in the menu | Meaningful | Meaningless — every row is in scope | Meaningless |
| Can drive another control | Rare | Common | Rare |
| Can withhold its own options | No | Yes | No |
| Where it lives | The chip row | The chip row, or a sentence slot | Its own slot, or the action group |
| Count in the prototype | 27 | 7 | 3 |

### 1.3 The visual consequence

Four specimens. All 28px tall, 4px radius, 1px border, 13px Roboto, with a 10×6px
chevron at the trailing edge.

| Specimen | Label | Fill | Border | Text |
|---|---|---|---|---|
| Filter, unset | `Sector` | `#F6F6F6` | `#E3E3E3` | `#222222` |
| Filter, set | `Sector: Financials +2` | `#F2F8FE` | `#A5D0F3` | `#002C5A` |
| Parameter | `Total Return` | `#F6F6F6` | `#E3E3E3` | `#222222` |
| Display control | `Straddle` | `#F6F6F6` | `#E3E3E3` | `#222222` |

**The last two are pixel-identical, and that is correct.** Nothing on the surface
distinguishes a parameter from a display control, and nothing needs to — they differ
only in what the badge counts, what Clear touches, and the order they leave the bar in.
Do not invent a visual difference between them.

### 1.4 Where the roles blur

The single-select dropdown is the most common widget on the bar — **18 of 37 controls**
— and it lands on both sides of the line, **nine and nine**. Max spread, Min volume and
Deliverables are radio lists that filter. Frequency, Month and Universe are radio lists
that don't. Nothing about the widget predicts the behaviour.

One near-miss: *how* a control acts on data is a separate axis. Expiry, Strikes and Near
re-scope rows rather than testing them — the same mechanism the parameters use — but
each has an off state, so they are filters. **Classify on the off state, never on how
the value is applied.**

---

## 2. Five menus

Which menu opens is decided by the input mode and where the user clicked. **Never by the
filter.**

### 2.1 Which menu opens

Two overrides are checked first and short-circuit everything:

| Condition | Result |
|---|---|
| Bar is read-only | Nothing opens |
| Filter is gated | The Gate dialog |

Otherwise:

| | From a chip | From the All-filters trigger |
|---|---|---|
| **Pointer** | **Popover** — anchored under the chip, one control, its own Clear, non-modal, closes on outside click | **Drawer** — every control grouped, sections expand in place, modal with a scrim, Tab trapped |
| **Touch** | **Sheet, drilled** — level two, opened straight to that filter, Back returns to the list, no per-filter Clear | **Sheet, list** — level one, the filter list, state text on every row, modal with a scrim, Tab trapped |

Two consequences:

- A chip **never** gets its own popover on touch. The sheet is the only single-filter surface there.
- A withdrawn chip has no anchor, so its popover cannot open at all. The All-filters trigger is the only route to it.

### 2.2 Anatomy

Parts top to bottom. `[ ]` = always present, `( )` = conditional, `**` = the part that
differs most between containers.

```
POPOVER — 284px wide, clamped to the container
[ head · filter label                        ]
( search                                     )
[ option list — scrolls, 300px cap           ]   ← only this scrolls
( custom range, or the slider itself         )
( help text                                  )
**foot · Clear + Done                        **   ← Clear scopes to THIS filter

DRAWER · pointer — modal, scrim
[ head · All filters + hint + close          ]
[ group label → accordion rows → one open    ]
**foot · Clear all + Show 1,284 results      **

SHEET · level 1 — modal, scrim
( drag handle                                )
[ head · All filters + hint + close          ]
[ group label → drill rows, each a chevron   ]
**foot · Clear all + Show 1,284 results      **

SHEET · level 2 — modal, scrim
[ head · ‹ All filters · Sector · close      ]
( search                                     )
[ the same option list as the popover        ]
**foot · Clear all + Show 1,284 results      **   ← no per-filter Clear anywhere

GATE — 268px wide
[ PRO tag                                    ]
[ "Analyst rating is a Pro filter"           ]
[ what it unlocks; the other 13 are unaffected]
**Compare plans (primary) + Not now          **
```

The popover's head and foot are pinned; only its list scrolls, so Done never scrolls
away. The drawer's accordion rows each carry their own state text, so the panel reads as
an inventory before anything is opened.

The hint in the drawer and sheet head reads `14 filters · 8 not on the bar · 3 applied`.

**The one real inconsistency.** A popover's Clear clears that one filter. The drill-down
borrows the *panel's* footer, so `Clear all` is the only Clear a touch user can reach —
there is no way to empty a single filter except unticking its options one at a time.
Either the drill head gains its own Clear, or the panel footer becomes context-sensitive
at level two.

### 2.3 Six bodies

What fills a menu is decided by the control's kind, and it is the same fill in every
container.

| Kind | Body | Selection | Examples |
|---|---|---|---|
| Multi | Checkbox rows, search when long | `listbox`, multi-selectable | Sector, Strategy, Index membership |
| Choice, with an off state | Radio rows; the first row **is** the off state, named not blank | `All`, `Spot (311.51)` | Strikes, Near, Max spread |
| Choice, mandatory | Radio rows only. No off row, no Clear in the footer | Always exactly one | Frequency, Year, Universe, View |
| Choice, with descriptions | Two-line rows: option name over an explanatory sublabel | Always exactly one | Analysis — seven named metrics |
| Range | Preset radios, then a *Custom range* pair of number inputs | A preset or a typed pair, never both | Market cap, P/E, Volume |
| Slider | Preset radios, then the track with a numeric box per thumb. With no presets the list is absent and the menu is only the control | A preset or a dragged value | Min probability (one thumb), Days to exp (two) |

The slider is why a menu cannot simply be "a list of options" — it is the one control
with no option list to fall back on. Presets sit on top so it reads like its neighbours,
but the control underneath is a range input, and that is what a keyboard user lands on.

---

## 3. Filter chip states

15 states, 11 built.

| State | What changes | Status |
|---|---|---|
| Unset | Label only, neutral border, chevron. No accent, no value | `default` |
| Set — one value | Accent fill and border; label becomes `Sector: Financials` | `filtered` |
| Set — several values | First value plus an overflow count `+2`. Never a bare number | `ch-liq` |
| Set — range, both bounds | Both ends in the label: `10–25` | `an-dual` |
| Set — range, one bound | Direction word carries it: `over $10B`, `Over 80%` | `an-slider` |
| Hover | Border steps to the stronger neutral; fill unchanged | every flow |
| Focus visible | 2px accent ring, offset. Independent of hover and of open | every flow |
| Open | `aria-expanded`, chevron rotated, popover anchored or sheet raised | `popover` |
| Gated | Lock replaces the chevron; the click opens the upgrade gate, not the option list | `gated` |
| Read-only | Value visible, chevron gone, not focusable. For shared and embedded views | `readonly` |
| Withdrawn | Not on the bar at all; its value lives in the badge count and the panel | `overflow`, `hidden` |
| Loading its options | Chip live and clickable, option list a skeleton. Today only the result count skeletons | **NEEDS DESIGN** |
| Disabled by a dependency | Nothing to choose until a parent is set — a sector filter before an exchange | **NEEDS DESIGN** |
| Sole cause of an empty result | The bar goes empty today, but no chip is blamed. Attribution is the missing half | **NEEDS DESIGN** |
| Invalid value | A custom range entered backwards, a bound outside the field. No error state exists | **NEEDS DESIGN** |

## 4. Parameter states

11 states, 9 built. Three have no filter equivalent — coupled, options withheld, and the
control appearing and disappearing.

| State | What changes | Status |
|---|---|---|
| Rest | Always carries a value, so it never accents. The value *is* the label | `pm-default` |
| Hover / focus / open | Identical to the filter chip. Same component, same affordances | `pm-chip` |
| Mandatory | No Clear in the menu footer. Re-picking the current value is a no-op, not a toggle-off | `pm-chip` |
| Coupled — driven | Its value was set by another control. Analysis writes Calculation and Data | `pm-custom` |
| Options withheld | Options removed because another control makes them meaningless, plus a line saying why | `pm-daily` |
| Appears / disappears | The control itself is conditional: Month exists only at daily frequency | `pm-daily` |
| Sentence slot | Label suppressed, value inline in prose. The word in the sentence is the trigger | `pm-default` |
| Sentence wraps | Prose breaks over two or three lines. No trigger to fall back on, so it must wrap | `pm-wrap`, `pm-mob` |
| Long option list | Search inside the menu. Near carries 41 strikes, past what a radio list should hold | `ch-near` |
| One option | Nothing to choose. Show the value, drop the chevron, or hide it — undecided | **NEEDS DESIGN** |
| Loading its options | The list is a fetch. A parameter with no value cannot render the surface at all | **NEEDS DESIGN** |

## 5. Display control states

6 states, 5 built.

| State | What changes | Status |
|---|---|---|
| Rest / hover / focus / open | Identical to a parameter. Deliberately so | `ch-stack` |
| Segmented | Two or three options shown at once instead of behind a chevron — Table / Cards | `an-cards` |
| In the chip row | Rides with the filters by product decision, still uncounted and uncleared | `ch-stack` |
| In its own slot | Outside the bar's accounting entirely | `an-cards`, `pm-highlight` |
| Beside what it drives | Placed next to the thing it changes rather than with the filters | `pm-highlight` |
| Remembered | A view choice probably should survive a reload; a filter probably shouldn't | **NEEDS DESIGN** |

## 6. Menu and bar states

### 6.1 Inside the menu — content

15 states, 11 built.

| State | What it looks like | Status |
|---|---|---|
| Off state selected | The named first row is on. The resting state of every filter, not an empty menu | `ch-chip` |
| One selected | Radio filled, or one box checked | `popover` |
| Several selected | Multiple boxes checked; selection order is not preserved or shown | `filtered` |
| Every option selected | Identical result to selecting none, and no different treatment. Worth a decision | **NEEDS DESIGN** |
| Searching, with matches | List narrows live; selections outside the match set stay set but are not visible | `ch-near` |
| Searching, no match | One inert row: *No match for "xyz"*. Footer stays live | `ch-near` |
| Long list | List scrolls to a 300px cap; head and footer pin | `default`, `pm-chip` |
| Options with descriptions | Two-line rows. Taller list, so fewer visible before scrolling | `pm-chip` |
| Options withheld | Rows removed because another control makes them meaningless, plus a reason line | `pm-daily` |
| Help text | A sentence under the list, above the footer. Explains a term or a restriction | `ch-panel` |
| Preset chosen | A radio is on and the custom inputs sit empty beneath it | `an-slider` |
| Custom typed | Inputs carry values and every preset radio is off. Mutually exclusive by construction | `an-dual` |
| No options at all | A list whose source is empty. Renders as nothing today | **NEEDS DESIGN** |
| Invalid custom range | Min above max, or a bound outside the field. No validation, no message | **NEEDS DESIGN** |
| Loading its options | The list is a fetch. Menu opens into an empty box today | **NEEDS DESIGN** |

### 6.2 Placement — popover only

The panel is edge-anchored and has none of these. Values below are measured, not
assumed: every chip on all four surfaces, at eleven widths.

| State | Rule | Status |
|---|---|---|
| Below the chip | Default. 10px below the trigger, left edges flush | every flow |
| Flipped above | Taken when the menu does not fit below but does fit above. In practice only controls that sit *below* the bar ever flip | `pm-highlight` |
| Shifted horizontally | Held at least 10px inside the container. Highlighting shifts 204px left of its anchor to stay in | `pm-highlight` |
| Clamped and scrolling | Fits neither way: stays below, max-height set to the space available, floor 180px | code path, no flow |
| Narrowed | Width is 284px or the container minus 20, whichever is smaller | code path, no flow |
| Anchor lost | The chip was withdrawn while open — the menu closes rather than re-anchoring | **NEEDS DESIGN** |

Placement measures the **component's container**, not the viewport — the same rule the
bar uses for collapse. A filter bar embedded in a 700px widget on a 1600px screen flips
and clamps against the widget.

Two findings worth acting on:

1. **The clamp and narrow paths never fire.** Clamping needs a container too short for the menu either way; narrowing needs one under 304px, and the narrowest breakpoint is 360px. Either the supported minimum is wrong, or these rules are speculative.
2. **The popover's CSS width (272px) is dead** — placement overwrites it with 284px on every open. A developer reading the stylesheet gets the wrong number.

### 6.3 Entry, dismissal, focus

12 behaviours, 11 built. These are what testing catches and static comps never do.

| Moment | Behaviour | Status |
|---|---|---|
| Menu opens | The menu animates in; nothing else does. The surrounding tool never moves or fades | `drawer` |
| Section expands | The entry transition does not replay — only the section opens | `drawer` |
| Drill forward | Level two slides in from the leading edge | `drill` |
| Drill back | Level one returns from the opposite direction, so the gesture reads as reversal | `drill` |
| Focus on open | Search field, else the first option, else the slider, else the first button | `popover` |
| Focus on close | Returns to the originating chip — or to the All-filters trigger if that chip has since been withdrawn | `overflow` |
| Arrow keys | Move between options inside whichever menu is open. They do not wrap at the ends | `popover`, `drawer` |
| Escape | Closes the popover, or the panel. From level two it closes the sheet outright rather than stepping back | `drill` |
| Back | The only way to step from level two to level one without losing the sheet | `drill` |
| Click outside | Closes the popover. The originating chip is exempt, so its own click toggles instead of closing and reopening | `popover` |
| Scrim | Tapping it closes the panel. On the drawer and the sheet, never on a popover | `sheet` |
| Tab | Trapped inside the panel, which is modal. **Not** trapped in the popover, which is not — and nothing closes it on the way out, so Tab leaves an orphaned menu open behind the focus ring | **NEEDS DESIGN** |

### 6.4 Bar scenarios

19 scenarios, 16 built. Composition-level — these break layouts, not components.

| Scenario | What it tests | Status |
|---|---|---|
| Nothing set | The resting bar. Badge absent, Clear absent | `default` |
| Some set | State in the labels, mixed accent, badge counting only what is set | `filtered` |
| Overflow → menu | Chips withdraw right to left into All filters; trigger width reserved in advance | `overflow`, `squeezed` |
| Overflow → wrap | Nothing withdraws; row height moves and the bar costs a fixed line | `wrap` |
| Overflow → scroll | Whole line scrolls, chevrons on both edges, a partial chip as the signal | `scroll` |
| Everything withdrawn | Trigger and Clear only. The overflow menu becomes the sole route to every control | `hidden`, `an-mob` |
| Zero promoted | No chips authored at all — every filter behind the trigger by design, not by width | `zero` |
| Empty result | Bar stays fully interactive; the result surface carries the empty state | `empty`, `ch-empty`, `an-empty` |
| Loading | Bar live while the result is not. Filters remain settable during the fetch | `loading` |
| Read-only | A shared or embedded view: values legible, nothing operable | `readonly` |
| Entitlement mix | Gated chips among ungated ones, and gated ones held visible longest under squeeze | `gated` |
| Touch — sheet | Bottom sheet instead of an anchored popover; 44px targets throughout | `sheet` |
| Touch — drill-down | Level two, Back returns to the filter list, Esc closes the sheet outright | `drill` |
| Pointer — drawer | Sections expand in place; expanding does not replay the open animation | `drawer` |
| Sentence form | No trigger, no badge — every control mandatory and inline in prose | `pm-default` |
| Action group collapse | Actions fold to one overflow before any filter is touched | `actions` |
| Restored from a link | A filter set arriving from a URL or a saved screen, before the user touches anything | **NEEDS DESIGN** |
| Stale restored value | A saved set naming an option that no longer exists — a delisted symbol, a retired sector | **NEEDS DESIGN** |
| Undo after Clear | Clear discards several filters in one click and there is no way back | **NEEDS DESIGN** |

---

## 7. What to design

Every **NEEDS DESIGN** row above, grouped and ranked by how much rework the answer
causes later.

### Priority 1 — the menu assumes its options exist

Four gaps are one gap. As soon as any filter's options come from a request rather than a
constant, every menu needs these, and the footer has to stay honest while they show.

1. **Loading a menu's options** — a skeleton option list. The chip stays live and clickable; the footer's result count and Done stay usable. Applies to filters and parameters alike, but a parameter with no value cannot render its surface at all, so it needs a second state: what the *table* shows while its parameter is unresolved.
2. **No options at all** — an empty list with a reason, not a blank box. E.g. symbols before a universe resolves.
3. **Options failed to load** — not currently in the inventory at all, and it needs to be: a retry, and what the chip looks like meanwhile.
4. **Invalid custom range** — min above max, or a bound outside the field. Needs an inline message inside the menu and a decision on whether Done stays enabled.

### Priority 2 — keyboard and touch correctness

5. **Tab out of a popover.** The clearest bug in the set. Non-modal is right; nothing closing it on the way out is not. Needs a rule for whether leaving a menu commits or discards.
6. **Per-filter Clear on touch.** The drill-down borrows the panel's footer, so `Clear all` is the only Clear in reach. Either the drill head gains a Clear (smaller) or the footer goes context-sensitive at level two (more consistent with the popover).
7. **Disabled by a dependency.** A chip with nothing to choose until a parent is set. Needs both the chip treatment and what its menu says if opened.

### Priority 3 — state the user can't see

8. **Which filter emptied the result.** The bar goes empty but blames nothing. Needs attribution — most likely on the chip, possibly in the empty state.
9. **Search hides selected rows.** A user can be four selections deep and see none of them. Needs selected-first ordering, or a count of hidden selections. Only bites on long lists — Sector, Near, Index membership.
10. **Every option selected.** Identical in effect to selecting none. Decide whether it reads as filtered or unfiltered, on the chip and in the menu.

### Priority 4 — persistence and recovery

11. **Restored from a link or a saved screen.** A filter set the user did not just set. Does it announce itself?
12. **Stale restored value.** A saved set naming an option that no longer exists.
13. **Undo after Clear.** Clear discards several filters at once with no way back.
14. **Remembered display choices.** A view choice probably should survive a reload; a filter probably shouldn't. Currently unspecified for both.

### Priority 5 — edges

15. **A parameter with one option.** Show the value, drop the chevron, or hide the control.
16. **Anchor lost.** Resizing while a popover is open can withdraw its chip. Closing is defensible; handing off to the panel drilled to that filter is better and costs one branch.

---

## 8. Open questions the model exposes

Not gaps — decisions where the prototype picked one answer and the other is still
arguable.

1. **A filter sitting on its default value.** Strikes defaults to ±5 and can return to *All*. Is ±5 "set"? Today it accents and counts, so the chain bar opens with a filter already lit. Treating an untouched default as unset is more truthful to the user, but then the chip's accent stops tracking its value.
2. **Whether display controls belong on the bar at all.** The chain's View rides in the chip row; the analyzer's Table/Cards sits in its own slot. Both work, and the inconsistency is a per-surface product decision rather than a rule. Pick one before a fifth surface arrives.
3. **Where a long list stops being a dropdown.** Near carries 41 strikes behind a single-select. Search patches it, but a searchable single-select over a continuous numeric field is a different component — probably a combobox with a typed value. Somewhere between 8 and 41 options the radio list is the wrong answer.
4. **Two accounting rules that left the spec.** Per-option match counts and the live result count in the bar were both removed at the team's direction. Both were the spec's compensation for not being able to see into a filter before opening it, so the selection count in the menu is now the only feedback before applying. Worth watching in testing rather than assuming settled.

---

## Appendix A — the 37 controls by role

**Filters (27)**
Screener: Exchange, Sector, Market cap, P/E, Dividend yield, Analyst rating *(gated)*,
Price, Day change, Volume, Beta, Short interest, Country, Currency, Index membership.
Chain: Expiry, Strikes, Near, Near money, Min volume, Max spread, Min open interest,
Deliverables.
Analyzer: Market view, Strategy, Min probability, Days to exp.
Matrix: Symbols *(own row, empty means none)*.

**Parameters (7)**
Matrix: Analysis, Calculation, Data, Frequency, Month, Year, Universe.

**Display controls (3)**
Chain: View. Analyzer: Table/Cards. Matrix: Highlighting.

## Appendix B — prototype flows referenced

Screener: `default`, `overflow`, `filtered`, `squeezed`, `wrap`, `scroll`, `hidden`,
`popover`, `drawer`, `sheet`, `drill`, `gated`, `actions`, `compact`, `loading`,
`readonly`, `empty`, `zero`.
Chain: `ch-side`, `ch-chip`, `ch-liq`, `ch-near`, `ch-exp`, `ch-monthly`, `ch-panel`,
`ch-stack`, `ch-mob`, `ch-empty`.
Analyzer: `an-table`, `an-slider`, `an-dual`, `an-bull`, `an-cards`, `an-squeeze`,
`an-mob`, `an-empty`.
Matrix: `pm-default`, `pm-chip`, `pm-total`, `pm-vola`, `pm-volume`, `pm-custom`,
`pm-daily`, `pm-annual`, `pm-quarter`, `pm-highlight`, `pm-universe`, `pm-compare`,
`pm-wrap`, `pm-mob`, `pm-one`, `pm-none`.
