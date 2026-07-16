/* @ds-bundle: {"format":4,"namespace":"QmodiiDesignSystem_e89f18","components":[{"name":"AreaChart","sourcePath":"components/data/AreaChart.jsx"},{"name":"CandlestickChart","sourcePath":"components/data/CandlestickChart.jsx"},{"name":"Change","sourcePath":"components/data/Change.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"LineChart","sourcePath":"components/data/LineChart.jsx"},{"name":"Paginator","sourcePath":"components/data/Paginator.jsx"},{"name":"SymbolTag","sourcePath":"components/data/SymbolTag.jsx"},{"name":"TimeHorizon","sourcePath":"components/data/TimeHorizon.jsx"},{"name":"Chip","sourcePath":"components/feedback/Chip.jsx"},{"name":"Message","sourcePath":"components/feedback/Message.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"DatePicker","sourcePath":"components/forms/DatePicker.jsx"},{"name":"FacetedMultiSelect","sourcePath":"components/forms/FacetedMultiSelect.jsx"},{"name":"InputNumber","sourcePath":"components/forms/InputNumber.jsx"},{"name":"InputText","sourcePath":"components/forms/InputText.jsx"},{"name":"ListItem","sourcePath":"components/forms/ListItem.jsx"},{"name":"RadioButton","sourcePath":"components/forms/RadioButton.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"ToggleButton","sourcePath":"components/forms/ToggleButton.jsx"},{"name":"ToggleSwitch","sourcePath":"components/forms/ToggleSwitch.jsx"},{"name":"Accordion","sourcePath":"components/surfaces/Accordion.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Dialog","sourcePath":"components/surfaces/Dialog.jsx"},{"name":"Divider","sourcePath":"components/surfaces/Divider.jsx"},{"name":"Drawer","sourcePath":"components/surfaces/Drawer.jsx"},{"name":"Menu","sourcePath":"components/surfaces/Menu.jsx"},{"name":"TabMenu","sourcePath":"components/surfaces/TabMenu.jsx"},{"name":"Tabs","sourcePath":"components/surfaces/Tabs.jsx"}],"sourceHashes":{"components/data/AreaChart.jsx":"c489d89f2873","components/data/CandlestickChart.jsx":"79cbdc9bc65d","components/data/Change.jsx":"c05afafcc441","components/data/DataTable.jsx":"78e5a31a2218","components/data/LineChart.jsx":"1c8ee59f54fc","components/data/Paginator.jsx":"23b92c722062","components/data/SymbolTag.jsx":"2f86e7ddaf43","components/data/TimeHorizon.jsx":"5feb57f25306","components/feedback/Chip.jsx":"d51c04a0fe3e","components/feedback/Message.jsx":"b9684fc7bb26","components/feedback/Tag.jsx":"86e441104170","components/feedback/Tooltip.jsx":"590d90e38292","components/forms/Button.jsx":"9f3a0ecf5a5c","components/forms/Checkbox.jsx":"972a7f934f0b","components/forms/DatePicker.jsx":"019ffbd7013f","components/forms/FacetedMultiSelect.jsx":"7a82538686f3","components/forms/InputNumber.jsx":"4be27cd8ed10","components/forms/InputText.jsx":"86253a319294","components/forms/ListItem.jsx":"8a3ff7a360ff","components/forms/RadioButton.jsx":"f1052f634ed2","components/forms/Select.jsx":"8dafa03d8008","components/forms/ToggleButton.jsx":"26fbeb812e95","components/forms/ToggleSwitch.jsx":"c923ab1528b4","components/surfaces/Accordion.jsx":"b8ea2d54dfe1","components/surfaces/Card.jsx":"7fef6e4fd5e2","components/surfaces/Dialog.jsx":"99fd221b8030","components/surfaces/Divider.jsx":"3637ff54294c","components/surfaces/Drawer.jsx":"4ea05af9d92d","components/surfaces/Menu.jsx":"9254a5cf0ca1","components/surfaces/TabMenu.jsx":"93560ee68aec","components/surfaces/Tabs.jsx":"3c124f5f44ae"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.QmodiiDesignSystem_e89f18 = window.QmodiiDesignSystem_e89f18 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data/AreaChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii AreaChart — a brand-coloured line with a soft gradient fill beneath it.
 * The classic price/performance sparkline-style chart. Fully token-driven
 * (--chart-area-*, --chart-grid-line, --chart-axis-line, --chart-tick-*).
 *
 * Data: an array of numbers, or {x,y} / {label,value} objects. The X axis is
 * evenly spaced by index; labels (if present) render along the bottom.
 */
const num = d => typeof d === 'number' ? d : d.y ?? d.value ?? 0;
const lbl = d => d && typeof d === 'object' ? d.label ?? d.x ?? null : null;
function niceTicks(min, max, count) {
  if (min === max) {
    const p = Math.abs(min) || 1;
    min -= p * 0.1;
    max += p * 0.1;
  }
  const span = max - min,
    step0 = span / count,
    mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag,
    step = (norm >= 5 ? 5 : norm >= 2 ? 2 : norm >= 1 ? 1 : 0.5) * mag;
  const lo = Math.floor(min / step) * step,
    hi = Math.ceil(max / step) * step,
    out = [];
  for (let v = lo; v <= hi + step * 0.5; v += step) out.push(+v.toFixed(6));
  return {
    ticks: out,
    lo,
    hi
  };
}
function AreaChart({
  data = [],
  width = 640,
  height = 260,
  showGrid = true,
  showAxis = true,
  showDot = true,
  valueFormat,
  xLabels = true,
  padding,
  style,
  ...rest
}) {
  const uid = React.useId().replace(/:/g, '');
  const vals = data.map(num);
  const pad = {
    top: 12,
    right: 14,
    bottom: xLabels ? 28 : 12,
    left: 44,
    ...(padding || {})
  };
  const iw = width - pad.left - pad.right,
    ih = height - pad.top - pad.bottom;
  const fmt = valueFormat || (v => v.toLocaleString(undefined, {
    maximumFractionDigits: 2
  }));
  if (!vals.length) return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width,
      height,
      ...style
    }
  }, rest));
  const {
    ticks,
    lo,
    hi
  } = niceTicks(Math.min(...vals), Math.max(...vals), 4);
  const x = i => pad.left + (vals.length === 1 ? iw / 2 : i / (vals.length - 1) * iw);
  const y = v => pad.top + ih - (v - lo) / (hi - lo) * ih;
  const linePts = vals.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const areaPath = `M ${x(0)},${y(vals[0])} ` + vals.map((v, i) => `L ${x(i)},${y(v)}`).join(' ') + ` L ${x(vals.length - 1)},${pad.top + ih} L ${x(0)},${pad.top + ih} Z`;
  const lastI = vals.length - 1;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: `0 0 ${width} ${height}`,
    width: width,
    height: height,
    role: "img",
    style: {
      display: 'block',
      maxWidth: '100%',
      background: 'var(--chart-bg)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `area-${uid}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--chart-area-fill-top)",
    stopOpacity: "var(--chart-area-opacity)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--chart-area-fill-bottom)",
    stopOpacity: "0"
  }))), showGrid && ticks.map((t, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: pad.left,
    x2: pad.left + iw,
    y1: y(t),
    y2: y(t),
    stroke: "var(--chart-grid-line)",
    strokeWidth: "var(--chart-grid-line-width)"
  })), showAxis && ticks.map((t, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: pad.left - 8,
    y: y(t),
    textAnchor: "end",
    dominantBaseline: "middle",
    fill: "var(--chart-tick-color)",
    fontSize: "var(--chart-tick-size)"
  }, fmt(t))), /*#__PURE__*/React.createElement("path", {
    d: areaPath,
    fill: `url(#area-${uid})`
  }), /*#__PURE__*/React.createElement("polyline", {
    points: linePts,
    fill: "none",
    stroke: "var(--chart-area-stroke)",
    strokeWidth: "var(--chart-line-width)",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), showDot && /*#__PURE__*/React.createElement("circle", {
    cx: x(lastI),
    cy: y(vals[lastI]),
    r: "var(--chart-dot-radius)",
    fill: "var(--chart-area-stroke)",
    stroke: "var(--chart-bg)",
    strokeWidth: "1.5"
  }), xLabels && data.map((d, i) => {
    const L = lbl(d);
    if (L == null || data.length > 8 && i % Math.ceil(data.length / 8) !== 0 && i !== lastI) return null;
    return /*#__PURE__*/React.createElement("text", {
      key: i,
      x: x(i),
      y: height - 8,
      textAnchor: "middle",
      fill: "var(--chart-tick-color)",
      fontSize: "var(--chart-tick-size)"
    }, L);
  }));
}
Object.assign(__ds_scope, { AreaChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/AreaChart.jsx", error: String((e && e.message) || e) }); }

// components/data/CandlestickChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii CandlestickChart — OHLC candles. Up (close ≥ open) uses the green
 * candle tokens, down uses the red tokens. Body fill/border and wick are all
 * token-driven (--chart-candle-*). Candle width + gap come from tokens too.
 *
 * Data: array of { o, h, l, c, label? } (or open/high/low/close). X is evenly
 * spaced by index.
 */
const pick = (d, keys) => {
  for (const k of keys) if (d[k] != null) return d[k];
  return 0;
};
const O = d => pick(d, ['o', 'open']);
const H = d => pick(d, ['h', 'high']);
const L = d => pick(d, ['l', 'low']);
const C = d => pick(d, ['c', 'close']);
function niceTicksC(min, max, count) {
  if (min === max) {
    const p = Math.abs(min) || 1;
    min -= p * 0.1;
    max += p * 0.1;
  }
  const span = max - min,
    step0 = span / count,
    mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag,
    step = (norm >= 5 ? 5 : norm >= 2 ? 2 : norm >= 1 ? 1 : 0.5) * mag;
  const lo = Math.floor(min / step) * step,
    hi = Math.ceil(max / step) * step,
    out = [];
  for (let v = lo; v <= hi + step * 0.5; v += step) out.push(+v.toFixed(6));
  return {
    ticks: out,
    lo,
    hi
  };
}
function CandlestickChart({
  data = [],
  width = 640,
  height = 300,
  showGrid = true,
  showAxis = true,
  xLabels = true,
  valueFormat,
  candleWidth,
  padding,
  style,
  ...rest
}) {
  const pad = {
    top: 12,
    right: 14,
    bottom: xLabels ? 28 : 12,
    left: 48,
    ...(padding || {})
  };
  const iw = width - pad.left - pad.right,
    ih = height - pad.top - pad.bottom;
  const fmt = valueFormat || (v => v.toLocaleString(undefined, {
    maximumFractionDigits: 2
  }));
  if (!data.length) return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width,
      height,
      ...style
    }
  }, rest));
  const highs = data.map(H),
    lows = data.map(L);
  const {
    ticks,
    lo,
    hi
  } = niceTicksC(Math.min(...lows), Math.max(...highs), 4);
  const slot = iw / data.length;
  const cw = candleWidth || Math.max(2, Math.min(slot * 0.62, 14));
  const cx = i => pad.left + slot * (i + 0.5);
  const y = v => pad.top + ih - (v - lo) / (hi - lo) * ih;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: `0 0 ${width} ${height}`,
    width: width,
    height: height,
    role: "img",
    style: {
      display: 'block',
      maxWidth: '100%',
      background: 'var(--chart-bg)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), showGrid && ticks.map((t, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: pad.left,
    x2: pad.left + iw,
    y1: y(t),
    y2: y(t),
    stroke: "var(--chart-grid-line)",
    strokeWidth: "var(--chart-grid-line-width)"
  })), showAxis && ticks.map((t, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: pad.left - 8,
    y: y(t),
    textAnchor: "end",
    dominantBaseline: "middle",
    fill: "var(--chart-tick-color)",
    fontSize: "var(--chart-tick-size)"
  }, fmt(t))), data.map((d, i) => {
    const o = O(d),
      c = C(d),
      up = c >= o;
    const border = up ? 'var(--chart-candle-up-border)' : 'var(--chart-candle-down-border)';
    const fill = up ? 'var(--chart-candle-up-fill)' : 'var(--chart-candle-down-fill)';
    const wick = up ? 'var(--chart-candle-up-wick)' : 'var(--chart-candle-down-wick)';
    const top = y(Math.max(o, c)),
      bot = y(Math.min(o, c));
    const bodyH = Math.max(1, bot - top);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: cx(i),
      x2: cx(i),
      y1: y(H(d)),
      y2: y(L(d)),
      stroke: wick,
      strokeWidth: "var(--chart-candle-wick-width)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: cx(i) - cw / 2,
      y: top,
      width: cw,
      height: bodyH,
      fill: fill,
      stroke: border,
      strokeWidth: "1",
      rx: "0.5"
    }));
  }), xLabels && data.map((d, i) => {
    const lab = d.label ?? d.x;
    if (lab == null || data.length > 8 && i % Math.ceil(data.length / 8) !== 0 && i !== data.length - 1) return null;
    return /*#__PURE__*/React.createElement("text", {
      key: i,
      x: cx(i),
      y: height - 8,
      textAnchor: "middle",
      fill: "var(--chart-tick-color)",
      fontSize: "var(--chart-tick-size)"
    }, lab);
  }));
}
Object.assign(__ds_scope, { CandlestickChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/CandlestickChart.jsx", error: String((e && e.message) || e) }); }

// components/data/Change.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Change — a market delta value with a direction "dorito" (the up/down
 * triangle). Positive → up/green, negative → down/red, zero → flat/neutral.
 *
 * - `coloredText` toggles between direction-coloured text and neutral text
 *   (the dorito always keeps its direction colour).
 * - `iconPosition` places the dorito leading (default) or trailing.
 * - `size` is 'md' (14px) or 'sm' (12px).
 * - The dorito's fill and border are separate tokens
 *   (--change-{up,down}-dorito-{fill,border}).
 */
const CHANGE_SIZES = {
  md: {
    font: 'var(--change-font-md)',
    dorito: 'var(--change-dorito-md)'
  },
  sm: {
    font: 'var(--change-font-sm)',
    dorito: 'var(--change-dorito-sm)'
  }
};
function Dorito({
  dir,
  size
}) {
  const up = dir === 'up';
  const fill = up ? 'var(--change-up-dorito-fill)' : 'var(--change-down-dorito-fill)';
  const border = up ? 'var(--change-up-dorito-border)' : 'var(--change-down-dorito-border)';
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 16 16",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      width: size,
      height: size,
      display: 'block',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: up ? '8,1.5 15,14.5 1,14.5' : '1,1.5 15,1.5 8,14.5',
    fill: fill,
    stroke: border,
    strokeWidth: "var(--change-dorito-stroke)",
    strokeLinejoin: "round"
  }));
}
function Change({
  value,
  percent,
  direction,
  iconPosition = 'leading',
  size = 'md',
  coloredText = true,
  showIcon = true,
  decimals = 2,
  style,
  ...rest
}) {
  const dir = direction || (value > 0 ? 'up' : value < 0 ? 'down' : 'flat');
  const s = CHANGE_SIZES[size] || CHANGE_SIZES.md;
  const textColor = !coloredText || dir === 'flat' ? 'var(--change-neutral-text)' : dir === 'up' ? 'var(--change-up-text)' : 'var(--change-down-text)';
  const fmt = n => {
    const abs = Math.abs(n).toFixed(decimals);
    return n < 0 ? `- ${abs}` : abs;
  };
  const parts = [];
  if (value != null) parts.push(fmt(value));
  if (percent != null) parts.push(`(${percent < 0 ? '-' : ''}${Math.abs(percent).toFixed(decimals)}%)`);
  const label = parts.join(' ');
  const icon = showIcon && dir !== 'flat' ? /*#__PURE__*/React.createElement(Dorito, {
    dir: dir,
    size: s.dorito
  }) : null;
  const sign = dir === 'up' ? 'increase' : dir === 'down' ? 'decrease' : 'no change';
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "text",
    "aria-label": `${sign} of ${label}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--change-gap)',
      fontFamily: 'var(--font-sans)',
      fontSize: s.font,
      fontWeight: 'var(--weight-medium)',
      fontVariantNumeric: 'tabular-nums',
      color: textColor,
      lineHeight: 1,
      ...style
    }
  }, rest), iconPosition === 'leading' && icon, /*#__PURE__*/React.createElement("span", null, label), iconPosition === 'trailing' && icon);
}
Object.assign(__ds_scope, { Change });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Change.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii DataTable — quote-grid table with resizable + drag-to-reorder columns.
 *
 * Keyboard / focus model — the table uses **roving tabindex** so it costs only
 * a couple of Tab stops, not one per control. The header row is a single stop:
 * ←/→ move focus between columns, Enter sorts, Space grabs to reorder (←/→ move
 * while grabbed, Esc cancels), and Alt+←/→ (Alt+Shift = 1px, Alt+Home/End =
 * min/max) resizes — so the sort button and resize handle are NOT separate Tab
 * stops. The body is one stop when rows are interactive (`reorderableRows`,
 * `selectionMode`, row actions, or a column `cellAction`): ↑/↓ move focus
 * between rows, Space grabs a row when reorderable (↑/↓ move, Space drops, Esc
 * cancels), Enter opens the row's ⋮ action menu (or selects the row if there
 * are no actions). From a focused row, **→ drills into the row**
 * (cell level): ←/→ move between its controls — selection checkbox, cell-action
 * cells, the ⋮ menu — Enter/Space activates the focused control, Esc (or ← at
 * the first control) returns to the row. Focusing a row also shows its hover
 * state. Holding **Alt/⌥** highlights the focused column's resize bar.
 *
 * Column resize: 5px right-edge handle (straddles the boundary at right:-2px),
 * brand-blue @50% bar on hover/drag, col-resize cursor, width clamped 56–280px,
 * keyboard-operable (role=separator, ←/→ 8px, Shift 1px, Home/End). Columns
 * sharing a `widthKey` resize together (mirroring). Widths persist to
 * localStorage when `storageKey` is set; Reset restores defaults.
 *
 * Column reorder: pointer-based (not native HTML5 drag). Grip dots reveal on
 * header hover; dragging shows a 2px accent drop-indicator on the target edge;
 * source header dims to 0.4.
 *
 * Row reorder (`reorderableRows`): the whole row is the grab target (no extra
 * handle column). Pointer-drag a row to reposition; keyboard — focus a row,
 * Space grabs it (row shows the same primary-subtle + ring grab state as a
 * grabbed column header), ↑/↓ move, Space drops, Esc cancels. Fires
 * `onRowReorder(rows, indices)`.
 */
function DataTable({
  columns = [],
  data = [],
  striped = true,
  hover = true,
  selectedRow,
  onRowClick,
  resizable = true,
  reorderable = true,
  reorderableRows = false,
  onRowReorder,
  selectionMode = 'none',
  selectedKeys,
  onSelectionChange,
  selectedCell,
  onCellSelect,
  sortable = true,
  sort,
  defaultSort,
  onSort,
  caption,
  storageKey,
  onReorder,
  rowActions,
  stickyColumn = true,
  stickyHeader = true,
  maxHeight,
  style,
  ...rest
}) {
  const colByField = React.useMemo(() => Object.fromEntries(columns.map(c => [c.field, c])), [columns]);

  // Load PrimeIcons (the sort glyphs match PrimeVue's DataTable) once, idempotently.
  React.useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById('qm-primeicons')) return;
    const l = document.createElement('link');
    l.id = 'qm-primeicons';
    l.rel = 'stylesheet';
    l.href = 'https://cdn.jsdelivr.net/npm/primeicons@7.0.0/primeicons.css';
    document.head.appendChild(l);
  }, []);

  // Visible focus ring for controls reached by drilling into a row (checkbox,
  // cell-action link, ⋮ menu) — keyboard focus only.
  React.useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById('qm-dt-cellfocus')) return;
    const s = document.createElement('style');
    s.id = 'qm-dt-cellfocus';
    s.textContent = '[data-cell-target]:focus-visible,[data-header-select]:focus-visible{box-shadow:var(--focus-ring);border-radius:var(--radius-xs);}' + 'button[data-price]{display:block;width:100%;height:100%;box-sizing:border-box;font:inherit;color:inherit;text-align:right;padding:7px 12px;border:none;background:transparent;cursor:pointer;border-radius:var(--chain-cell-radius);outline:none;transition:background var(--duration-fast) var(--ease);}' + 'button[data-price="ask"]:hover{background:var(--chain-ask-hover-bg);}' + 'button[data-price="bid"]:hover{background:var(--chain-bid-hover-bg);}' + 'button[data-price="ask"][data-selected]{background:var(--chain-ask-selected-bg);box-shadow:inset 0 0 0 1px var(--chain-ask-selected-border);color:var(--chain-ask-selected-fg);font-weight:var(--weight-medium);}' + 'button[data-price="bid"][data-selected]{background:var(--chain-bid-selected-bg);box-shadow:inset 0 0 0 1px var(--chain-bid-selected-border);color:var(--chain-bid-selected-fg);font-weight:var(--weight-medium);}' + 'button[data-price="ask"]:focus-visible{background:var(--chain-ask-hover-bg);box-shadow:var(--focus-ring);}' + 'button[data-price="bid"]:focus-visible{background:var(--chain-bid-hover-bg);box-shadow:var(--focus-ring);}' + '@keyframes qm-dt-pop-in{from{opacity:0}to{opacity:1}}' + '.qm-dt-preview{animation:qm-dt-pop-in var(--duration-base,.18s) var(--ease,ease);position:relative;}' + '.qm-dt-preview-in{transition:opacity .16s var(--ease,ease);opacity:1;}' + '.qm-dt-preview-swap{opacity:0;}' + '@media (prefers-reduced-motion: reduce){.qm-dt-preview{animation:none;}.qm-dt-preview-in{transition:none;}.qm-dt-preview-swap{opacity:1;}}';
    document.head.appendChild(s);
  }, []);

  // ----- persisted state (widths + order) -----
  const load = () => {
    if (!storageKey) return null;
    try {
      return JSON.parse(localStorage.getItem('qmodii.dt.' + storageKey) || 'null');
    } catch (_) {
      return null;
    }
  };
  const saved = React.useRef(load());
  const defaultWidths = () => {
    const w = {};
    columns.forEach(c => {
      w[c.field] = c.width || 96;
    });
    return w;
  };
  const [widths, setWidths] = React.useState(() => ({
    ...defaultWidths(),
    ...(saved.current && saved.current.widths)
  }));
  const [order, setOrder] = React.useState(() => saved.current && saved.current.order || columns.map(c => c.field));
  const persist = React.useCallback((w, o) => {
    if (!storageKey) return;
    try {
      localStorage.setItem('qmodii.dt.' + storageKey, JSON.stringify({
        widths: w,
        order: o
      }));
    } catch (_) {}
  }, [storageKey]);
  const orderedCols = order.map(f => colByField[f]).filter(Boolean);
  const actionCol = rowActions && rowActions.length ? {
    field: '__actions',
    header: '',
    width: 40,
    rowAction: true
  } : null;
  const checkboxCol = selectionMode === 'checkbox' ? {
    field: '__select',
    header: '',
    width: 28,
    selectionCheckbox: true
  } : null;
  const renderCols = [checkboxCol, ...orderedCols, actionCol].filter(Boolean);
  const cellActionFields = orderedCols.filter(c => typeof c.cellAction === 'function' || c.priceCell).map(c => c.field);
  const targetCount = (checkboxCol ? 1 : 0) + cellActionFields.length + (actionCol ? 1 : 0);
  const rowInteractive = targetCount > 0;

  // ----- sort -----
  const liveRef = React.useRef(null);
  const [internalSort, setInternalSort] = React.useState(defaultSort || null); // { field, direction }
  const controlledSort = sort !== undefined;
  const activeSort = controlledSort ? sort : internalSort;
  const announce = (next, col) => {
    if (!liveRef.current) return;
    const label = col && typeof col.header === 'string' ? col.header : col ? col.field : '';
    liveRef.current.textContent = next ? `Sorted by ${label}, ${next.direction === 'asc' ? 'ascending' : 'descending'}` : 'Sorting cleared';
  };
  const cycleSort = col => {
    if (!sortable || col.sortable === false) return;
    const f = col.field;
    let next;
    if (!activeSort || activeSort.field !== f) next = {
      field: f,
      direction: 'asc'
    };else if (activeSort.direction === 'asc') next = {
      field: f,
      direction: 'desc'
    };else next = null; // third activation clears the sort
    if (!controlledSort) setInternalSort(next);
    onSort && onSort(next);
    announce(next, col);
  };
  const sortedIndices = React.useMemo(() => {
    const idx = data.map((_, i) => i);
    if (controlledSort || !activeSort) return idx;
    const col = colByField[activeSort.field];
    if (!col) return idx;
    const dir = activeSort.direction === 'asc' ? 1 : -1;
    const numeric = col.numeric || col.change;
    const val = r => col.sortValue ? col.sortValue(r) : r[activeSort.field];
    return idx.sort((ia, ib) => {
      let x = val(data[ia]),
        y = val(data[ib]);
      if (numeric) {
        x = parseFloat(String(x).replace(/[^\d.-]/g, '')) || 0;
        y = parseFloat(String(y).replace(/[^\d.-]/g, '')) || 0;
        return (x - y) * dir;
      }
      return String(x == null ? '' : x).localeCompare(String(y == null ? '' : y)) * dir;
    });
  }, [data, activeSort, controlledSort, colByField]);
  const sortedData = sortedIndices.map(i => data[i]);

  // ----- resize -----
  const resizeRef = React.useRef(null);
  const [resizingField, setResizingField] = React.useState(null);
  // Even-fill by default; once the user resizes anything we switch to "manual"
  // mode: every column keeps a pixel width, resizing one never changes another,
  // and the table overflows (scrolls) instead of squeezing.
  const [manualMode, setManualMode] = React.useState(false);
  const headRow = React.useRef(null);
  const measureWidths = () => {
    const out = {};
    const ths = headRow.current ? headRow.current.querySelectorAll('th[data-field]') : [];
    ths.forEach(th => {
      const f = th.getAttribute('data-field');
      if (f) out[f] = Math.round(th.getBoundingClientRect().width);
    });
    return out;
  };
  const ensureManual = measured => {
    if (!manualMode) {
      const m = measured || measureWidths();
      setWidths(prev => ({
        ...prev,
        ...m
      }));
      setManualMode(true);
    }
  };
  const setColWidth = (col, next) => {
    const min = col.minWidth || 56,
      max = col.maxWidth || 280;
    const clamped = Math.max(min, Math.min(max, next));
    setWidths(prev => {
      const key = col.widthKey; // mirrored columns share a widthKey
      const nextW = {
        ...prev,
        [col.field]: clamped
      };
      if (key) columns.forEach(c => {
        if (c.widthKey === key) nextW[c.field] = clamped;
      });
      persist(nextW, order);
      return nextW;
    });
  };
  const startResize = (e, col) => {
    e.preventDefault();
    e.stopPropagation();
    const measured = measureWidths();
    ensureManual(measured);
    const startX = e.clientX,
      startW = measured[col.field] || widths[col.field] || 96;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
    setResizingField(col.field);
    const move = ev => setColWidth(col, startW + (ev.clientX - startX));
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      setResizingField(null);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  const onHandleKey = (e, col) => {
    const step = e.shiftKey ? 1 : 8;
    const cur = widths[col.field] || 96;
    const min = col.minWidth || 56,
      max = col.maxWidth || 280;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setColWidth(col, cur - step);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setColWidth(col, cur + step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setColWidth(col, min);
    } else if (e.key === 'End') {
      e.preventDefault();
      setColWidth(col, max);
    }
  };

  // ----- reorder -----
  const [dragField, setDragField] = React.useState(null);
  const [dropTarget, setDropTarget] = React.useState(null); // { field, side }
  const [ghost, setGhost] = React.useState(null); // { label, x, y, w, h } — floating drag preview
  const startHeaderPress = (e, col) => {
    const field = col.field;
    const canReorder = reorderable && col.reorderable !== false;
    const canSort = sortable && col.sortable !== false;
    if (!canReorder && !canSort) return;
    e.preventDefault();
    const startX = e.clientX,
      startY = e.clientY;
    const rect = e.currentTarget.getBoundingClientRect();
    const offX = startX - rect.left,
      offY = startY - rect.top;
    const ghostW = rect.width,
      ghostH = rect.height;
    let moved = false;
    if (canReorder) setDragField(field);
    const move = ev => {
      if (!moved && Math.abs(ev.clientX - startX) + Math.abs(ev.clientY - startY) > 4) {
        moved = true;
        if (canReorder) document.body.style.cursor = 'grabbing';
      }
      if (!moved || !canReorder) return;
      setGhost({
        label: col.header,
        x: ev.clientX - offX,
        y: ev.clientY - offY,
        w: ghostW,
        h: ghostH
      });
      const ths = headRow.current ? [...headRow.current.querySelectorAll('th[data-field]')] : [];
      let hit = null;
      for (const th of ths) {
        const r = th.getBoundingClientRect();
        if (ev.clientX >= r.left && ev.clientX <= r.right) {
          hit = {
            field: th.dataset.field,
            side: ev.clientX < r.left + r.width / 2 ? 'before' : 'after'
          };
          break;
        }
      }
      setDropTarget(hit);
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.body.style.cursor = '';
      setGhost(null);
      if (!moved) {
        // a click (no drag) → sort
        setDragField(null);
        setDropTarget(null);
        if (canSort) cycleSort(col);
        return;
      }
      setDropTarget(cur => {
        setDragField(() => {
          if (cur && cur.field && cur.field !== field) {
            setOrder(prevOrder => {
              const without = prevOrder.filter(f => f !== field);
              let to = without.indexOf(cur.field);
              if (cur.side === 'after') to += 1;
              without.splice(to, 0, field);
              persist(widths, without);
              onReorder && onReorder(without);
              return without;
            });
          }
          return null;
        });
        return null;
      });
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };

  // ----- sticky columns/header (auto-unstick when <50% of the table is viewable) -----
  const scrollRef = React.useRef(null);
  const tableRef = React.useRef(null);
  const previewRef = React.useRef(null);
  const [expandedRows, setExpandedRows] = React.useState(() => new Set());
  const toggleExpand = React.useCallback(id => setExpandedRows(prev => {
    const n = new Set(prev);
    if (n.has(id)) n.delete(id);else n.add(id);
    return n;
  }), []);
  const rowHasLegs = r => Array.isArray(r && r.legs) && r.legs.length > 0;
  const [stickyColAuto, setStickyColAuto] = React.useState(true);
  const [stickyHeadAuto, setStickyHeadAuto] = React.useState(true);
  const [scrolledX, setScrolledX] = React.useState(false);
  const [scrolledY, setScrolledY] = React.useState(false);
  React.useEffect(() => {
    const el = scrollRef.current,
      tbl = tableRef.current;
    if (!el || !tbl) return;
    let raf = 0;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setStickyColAuto(el.clientWidth / (tbl.scrollWidth || 1) >= 0.5);
        setStickyHeadAuto(el.clientHeight / (tbl.scrollHeight || 1) >= 0.5);
      });
    };
    check();
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(check);
      ro.observe(el);
      ro.observe(tbl);
    }
    window.addEventListener('resize', check);
    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', check);
    };
  }, []);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      setScrolledX(el.scrollLeft > 0);
      setScrolledY(el.scrollTop > 0);
    };
    onScroll();
    el.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  const stickyCol = stickyColumn && stickyColAuto;
  const stickyHead = stickyHeader && stickyHeadAuto;
  const resetLayout = () => {
    const w = defaultWidths(),
      o = columns.map(c => c.field);
    setWidths(w);
    setOrder(o);
    setManualMode(false);
    persist(w, o);
  };
  const layoutChanged = manualMode || order.join(',') !== columns.map(c => c.field).join(',');

  // ----- keyboard reorder (pick up → move → drop / cancel) -----
  const [grabbedField, setGrabbedField] = React.useState(null);
  const [rovingField, setRovingField] = React.useState(null);
  const [focusedField, setFocusedField] = React.useState(null);
  const [altHeld, setAltHeld] = React.useState(false);
  React.useEffect(() => {
    const kd = e => {
      if (e.key === 'Alt' || e.altKey) setAltHeld(true);
    };
    const ku = e => {
      if (e.key === 'Alt' || !e.altKey) setAltHeld(false);
    };
    const off = () => setAltHeld(false);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    window.addEventListener('blur', off);
    return () => {
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      window.removeEventListener('blur', off);
    };
  }, []);
  const originalOrderRef = React.useRef(null);
  const say = msg => {
    if (liveRef.current) liveRef.current.textContent = msg;
  };
  const labelOf = field => {
    const c = colByField[field];
    return c && typeof c.header === 'string' ? c.header : field;
  };
  const focusHeader = field => requestAnimationFrame(() => {
    if (field === '__select') {
      const el = headRow.current && headRow.current.querySelector('[data-header-select]');
      if (el) el.focus();
      return;
    }
    const el = headRow.current && headRow.current.querySelector(`th[data-field="${field}"]`);
    if (el) el.focus();
  });
  const moveGrabbed = (field, dir) => {
    setOrder(prev => {
      const from = prev.indexOf(field);
      const to = from + dir;
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      next.splice(from, 1);
      next.splice(to, 0, field);
      persist(widths, next);
      say(`${labelOf(field)} moved to position ${to + 1} of ${next.length}`);
      return next;
    });
    focusHeader(field);
  };
  const colFocusable = c => !!c && (reorderable && c.reorderable !== false || sortable && c.sortable !== false || resizable && c.resizable !== false);
  const navFields = () => {
    const cols = order.filter(f => colFocusable(colByField[f]));
    return checkboxCol ? ['__select', ...cols] : cols;
  };
  const moveHeaderFocus = (field, dir) => {
    const nav = navFields();
    const i = nav.indexOf(field) + dir;
    if (i < 0 || i >= nav.length) return;
    setRovingField(nav[i]);
    focusHeader(nav[i]);
  };
  const onHeaderKey = (e, col) => {
    const field = col.field;
    const isSpace = e.key === ' ' || e.key === 'Spacebar';
    // Tab always leaves the header group (roving keeps this to one Tab stop);
    // if a column is grabbed, drop it first so focus isn't trapped.
    if (e.key === 'Tab') {
      if (grabbedField === field) setGrabbedField(null);
      return;
    }
    const canReorder = reorderable && col.reorderable !== false;
    const canResize = resizable && col.resizable !== false;
    const canSort = sortable && col.sortable !== false;
    const cur = manualMode ? widths[field] || 96 : measureWidths()[field] || widths[field] || 96,
      min = col.minWidth || 56,
      max = col.maxWidth || 280;
    if (e.altKey && canResize && (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End')) ensureManual();

    // While grabbed (only possible when reorderable): move / drop / cancel.
    if (grabbedField === field) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveGrabbed(field, -1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveGrabbed(field, 1);
      } else if (e.key === 'Enter' || isSpace) {
        e.preventDefault();
        setGrabbedField(null);
        onReorder && onReorder(order);
        say(`${labelOf(field)} dropped`);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        const orig = originalOrderRef.current;
        if (orig) {
          setOrder(orig);
          persist(widths, orig);
        }
        setGrabbedField(null);
        say('Reorder cancelled');
        focusHeader(field);
      }
      return;
    }
    // Alt+arrows / Alt+Home/End = resize (works from any focusable header).
    if (e.altKey && canResize && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      const step = e.shiftKey ? 1 : 8;
      setColWidth(col, cur + (e.key === 'ArrowRight' ? step : -step));
      return;
    }
    if (e.altKey && canResize && (e.key === 'Home' || e.key === 'End')) {
      e.preventDefault();
      setColWidth(col, e.key === 'Home' ? min : max);
      return;
    }
    // Plain arrows / Home / End move focus between headers (roving).
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveHeaderFocus(field, -1);
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveHeaderFocus(field, 1);
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      const nav = navFields();
      setRovingField(nav[0]);
      focusHeader(nav[0]);
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      const nav = navFields();
      setRovingField(nav[nav.length - 1]);
      focusHeader(nav[nav.length - 1]);
      return;
    }
    // Enter sorts (matches a click); Space grabs to reorder.
    if (e.key === 'Enter') {
      if (canSort) {
        e.preventDefault();
        cycleSort(col);
      }
      return;
    }
    if (isSpace) {
      if (canReorder) {
        e.preventDefault();
        originalOrderRef.current = order;
        setGrabbedField(field);
        say(`${labelOf(field)} grabbed. Use left and right arrow keys to move, space to drop, escape to cancel.`);
      }
    }
  };
  const onSelectHeaderKey = e => {
    if (e.key === 'Tab') return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveHeaderFocus('__select', 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveHeaderFocus('__select', -1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      const nav = navFields();
      setRovingField(nav[0]);
      focusHeader(nav[0]);
    } else if (e.key === 'End') {
      e.preventDefault();
      const nav = navFields();
      setRovingField(nav[nav.length - 1]);
      focusHeader(nav[nav.length - 1]);
    } else if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
      e.preventDefault();
      toggleSelAll();
    }
  };

  // ----- row reorder (pointer + keyboard) -----
  // rowOrder holds indices into `data`. It follows the current sort, and manual
  // drags rearrange from there; a new sort resyncs it to the sorted sequence.
  const [rowOrder, setRowOrder] = React.useState(null);
  const sortedKey = sortedIndices.join(',');
  React.useEffect(() => {
    if (reorderableRows) setRowOrder(sortedIndices.slice());
  }, [sortedKey, reorderableRows]);
  const effectiveRowOrder = rowOrder && rowOrder.length === data.length ? rowOrder : sortedIndices;
  const rowOrderRef = React.useRef(effectiveRowOrder);
  React.useEffect(() => {
    rowOrderRef.current = effectiveRowOrder;
  }, [effectiveRowOrder]);
  const [grabbedRowId, setGrabbedRowId] = React.useState(null);
  const [dragRowId, setDragRowId] = React.useState(null);
  const [rovingRowId, setRovingRowId] = React.useState(null);
  const visualOrderRef = React.useRef([]);
  const rowOrderOrigRef = React.useRef(null);
  const focusRowHandle = id => requestAnimationFrame(() => {
    const el = tableRef.current && tableRef.current.querySelector(`tr[data-row-id="${id}"]`);
    if (el) el.focus();
  });
  const commitRowOrder = ord => {
    onRowReorder && onRowReorder(ord.map(i => data[i]), ord);
  };
  const moveRow = (id, dir) => {
    setRowOrder(prev => {
      const base = prev && prev.length === data.length ? prev : sortedIndices;
      const from = base.indexOf(id);
      const to = from + dir;
      if (to < 0 || to >= base.length) return base;
      const next = [...base];
      next.splice(from, 1);
      next.splice(to, 0, id);
      say(`Row moved to position ${to + 1} of ${next.length}`);
      return next;
    });
    focusRowHandle(id);
  };
  const moveRowFocus = (id, dir) => {
    const ord = visualOrderRef.current && visualOrderRef.current.length ? visualOrderRef.current : rowOrderRef.current;
    const i = ord.indexOf(id) + dir;
    if (i < 0 || i >= ord.length) return;
    setRovingRowId(ord[i]);
    focusRowHandle(ord[i]);
  };
  // ----- selection (checkbox column) -----
  const selControlled = selectedKeys !== undefined;
  const [selInternal, setSelInternal] = React.useState(() => new Set());
  const selSet = selControlled ? new Set(selectedKeys) : selInternal;
  const emitSel = next => {
    if (!selControlled) setSelInternal(next);
    onSelectionChange && onSelectionChange([...next]);
  };
  const toggleSel = id => {
    const n = new Set(selSet);
    n.has(id) ? n.delete(id) : n.add(id);
    emitSel(n);
  };
  const allIds = data.map((_, i) => i);
  const allSelected = allIds.length > 0 && allIds.every(i => selSet.has(i));
  const someSelected = allIds.some(i => selSet.has(i));
  const toggleSelAll = () => {
    emitSel(allSelected ? new Set() : new Set(allIds));
  };

  // ----- selected Bid/Ask price cell (visual, single) -----
  const selCellControlled = selectedCell !== undefined;
  const [selCellInternal, setSelCellInternal] = React.useState(null); // { row, field }
  const selCell = selCellControlled ? selectedCell : selCellInternal;
  const selectPriceCell = (rowId, field) => {
    const v = selCell && selCell.row === rowId && selCell.field === field ? null : {
      row: rowId,
      field
    };
    if (!selCellControlled) setSelCellInternal(v);
    onCellSelect && onCellSelect(v);
  };

  // ----- cell-level drill-in (row → cell) -----
  const [cellRowId, setCellRowId] = React.useState(null);
  const [cellIndex, setCellIndex] = React.useState(0);
  const focusCellTarget = (rowId, idx) => requestAnimationFrame(() => {
    const el = tableRef.current && tableRef.current.querySelector(`tr[data-row-id="${rowId}"] [data-cell-target="${idx}"]`);
    if (el) el.focus();
  });
  const enterCellMode = id => {
    const idxs = rowTargetIndices(id);
    if (!idxs.length) return;
    setCellRowId(id);
    setCellIndex(idxs[0]);
    focusCellTarget(id, idxs[0]);
    say('Entered row. Left and right arrow keys move between controls, Escape returns to the row.');
  };
  const exitCellMode = id => {
    setCellRowId(null);
    focusRowHandle(id);
  };
  // Which control indices are actually present in a given row's DOM (legs have
  // fewer than parents), so ←/→ navigation clamps to real targets.
  const rowTargetIndices = id => {
    const tr = tableRef.current && tableRef.current.querySelector(`tr[data-row-id="${id}"]`);
    if (!tr) return [];
    return Array.from(tr.querySelectorAll('[data-cell-target]')).map(el => parseInt(el.getAttribute('data-cell-target'), 10)).filter(n => !isNaN(n)).sort((a, b) => a - b);
  };
  const moveCell = (id, dir) => {
    const idxs = rowTargetIndices(id);
    if (!idxs.length) {
      exitCellMode(id);
      return;
    }
    const cur = idxs.indexOf(cellIndex);
    let ni = (cur < 0 ? 0 : cur) + dir;
    if (ni < 0) {
      exitCellMode(id);
      return;
    }
    if (ni >= idxs.length) ni = idxs.length - 1;
    setCellIndex(idxs[ni]);
    focusCellTarget(id, idxs[ni]);
  };
  const onRowHandleKey = (e, id) => {
    const isSpace = e.key === ' ' || e.key === 'Spacebar';
    // --- cell mode: navigate controls within the row ---
    if (cellRowId === id) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveCell(id, 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveCell(id, -1);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        exitCellMode(id);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setCellRowId(null);
        moveRowFocus(id, e.key === 'ArrowDown' ? 1 : -1);
      }
      // Enter / Space fall through to the focused control's native handler
      return;
    }
    // --- grabbed (reorder) mode ---
    if (grabbedRowId === id) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveRow(id, -1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveRow(id, 1);
      } else if (e.key === 'Enter' || isSpace) {
        e.preventDefault();
        setGrabbedRowId(null);
        commitRowOrder(rowOrderRef.current);
        say('Row dropped');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        const o = rowOrderOrigRef.current;
        if (o) setRowOrder(o);
        setGrabbedRowId(null);
        say('Row reorder cancelled');
        focusRowHandle(id);
      }
      return;
    }
    // --- row mode ---
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveRowFocus(id, -1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveRowFocus(id, 1);
    } else if (e.key === 'Enter') {
      // Enter opens the row's action menu (if any); otherwise selects the row.
      if (rowActions && rowActions.length) {
        e.preventDefault();
        const btn = tableRef.current && tableRef.current.querySelector(`tr[data-row-id="${id}"] button[aria-label="Row actions"]`);
        if (btn) btn.click();
      } else if (onRowClick) {
        e.preventDefault();
        onRowClick(id, data[id]);
      }
    } else if (e.key === 'ArrowRight' && rowInteractive) {
      e.preventDefault();
      enterCellMode(id);
    } else if (reorderableRows && isSpace) {
      e.preventDefault();
      rowOrderOrigRef.current = effectiveRowOrder.slice();
      setGrabbedRowId(id);
      say('Row grabbed. Use up and down arrow keys to move, space to drop, escape to cancel.');
    }
  };
  const startRowDrag = (e, id) => {
    if (!reorderableRows || e.button != null && e.button !== 0) return;
    // ignore drags that begin on an interactive control inside the row
    if (e.target && e.target.closest && e.target.closest('button,a,input,select,[role="menuitem"]')) return;
    const startX = e.clientX,
      startY = e.clientY;
    let moved = false;
    const move = ev => {
      if (!moved) {
        // wait for a real drag so a plain click still selects the row
        if (Math.abs(ev.clientX - startX) + Math.abs(ev.clientY - startY) < 4) return;
        moved = true;
        setDragRowId(id);
        document.body.style.cursor = 'grabbing';
      }
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const tr = el && el.closest('tr[data-row-id]');
      if (!tr) return;
      const overId = parseInt(tr.getAttribute('data-row-id'), 10);
      if (isNaN(overId) || overId === id) return;
      setRowOrder(prev => {
        const base = prev && prev.length === data.length ? prev : sortedIndices;
        const from = base.indexOf(id),
          to = base.indexOf(overId);
        if (from < 0 || to < 0 || from === to) return base;
        const next = [...base];
        next.splice(from, 1);
        next.splice(to, 0, id);
        return next;
      });
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.body.style.cursor = '';
      if (moved) {
        setDragRowId(null);
        commitRowOrder(rowOrderRef.current);
      }
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  const rowFocusable = reorderableRows || rowInteractive;
  // Columns evenly fill the available width by default: unresized data columns
  // have no fixed width, so table-layout:fixed shares the space equally among
  // them. A column keeps a pixel width once the user resizes it. Utility
  // columns (checkbox / actions) stay fixed and the action column stays pinned.
  const bodyRows = rowFocusable ? effectiveRowOrder.map(i => data[i]).filter(r => r !== undefined) : sortedData;
  // Explicit total width (sum of column widths) so table-layout:fixed actually
  // clamps columns — with width:max-content the browser falls back to auto layout
  // and a column can't be dragged narrower than its content.
  const totalTableWidth = renderCols.reduce((s, c) => s + (c.rowAction || c.selectionCheckbox ? c.width || 40 : widths[c.field] || 96), 0);
  // Flat top-to-bottom focus order including any expanded legs, used for ↑/↓.
  const legIdsOf = pid => rowHasLegs(data[pid]) && expandedRows.has(pid) ? data[pid].legs.map((_, li) => pid + ':leg:' + li) : [];
  const visualOrder = rowFocusable ? effectiveRowOrder.flatMap(pid => [pid, ...legIdsOf(pid)]) : [];
  visualOrderRef.current = visualOrder;
  const activeRowRoving = rovingRowId != null && visualOrder.includes(rovingRowId) ? rovingRowId : effectiveRowOrder[0];
  const _navFields = navFields();
  const activeHeaderRoving = rovingField && _navFields.includes(rovingField) ? rovingField : _navFields[0];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      border: '1px solid var(--table-border)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'auto',
      width: 'max-content',
      maxWidth: '100%',
      maxHeight: maxHeight
    }
  }, /*#__PURE__*/React.createElement("table", {
    ref: tableRef,
    "aria-label": caption,
    style: {
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      tableLayout: 'fixed',
      width: totalTableWidth + 'px'
    }
  }, /*#__PURE__*/React.createElement("colgroup", null, renderCols.map(c => {
    const util = c.rowAction || c.selectionCheckbox;
    if (util) return /*#__PURE__*/React.createElement("col", {
      key: c.field,
      style: {
        width: c.width + 'px'
      }
    });
    // Fixed pixel width per column — columns never reflow when the
    // container resizes; only an explicit user resize changes them.
    return /*#__PURE__*/React.createElement("col", {
      key: c.field,
      style: {
        width: (widths[c.field] || 96) + 'px'
      }
    });
  })), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    ref: headRow
  }, checkboxCol && /*#__PURE__*/React.createElement("th", {
    "aria-label": "Select all rows",
    style: {
      position: stickyHead || stickyCol ? 'sticky' : 'static',
      top: stickyHead ? 0 : undefined,
      left: stickyCol ? 0 : undefined,
      zIndex: stickyCol ? 61 : stickyHead ? 40 : undefined,
      background: 'var(--table-header-bg)',
      boxShadow: 'inset 0 -1px 0 var(--table-border)',
      padding: 'var(--table-header-pad-y) 2px var(--table-header-pad-y) 8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(SelectCheck, {
    checked: allSelected,
    indeterminate: !allSelected && someSelected,
    onToggle: toggleSelAll,
    label: "Select all rows",
    headerSelect: true,
    tabIndex: activeHeaderRoving === '__select' ? 0 : -1,
    onKeyDown: onSelectHeaderKey,
    onFocus: () => {
      setRovingField('__select');
      setFocusedField(null);
    }
  })), orderedCols.map((c, i) => /*#__PURE__*/React.createElement(HeaderCell, {
    key: c.field,
    col: c,
    zi: orderedCols.length - i,
    reorderable: reorderable && c.reorderable !== false,
    resizable: resizable && c.resizable !== false,
    sortable: sortable && c.sortable !== false,
    sortDir: activeSort && activeSort.field === c.field ? activeSort.direction : null,
    onSortClick: () => cycleSort(c),
    isDragSource: dragField === c.field,
    grabbed: grabbedField === c.field,
    onHeaderKey: e => onHeaderKey(e, c),
    keyboardFocusable: colFocusable(c),
    rovingTabIndex: colFocusable(c) ? c.field === activeHeaderRoving ? 0 : -1 : undefined,
    onFocusCell: () => {
      setRovingField(c.field);
      setFocusedField(c.field);
    },
    onBlurCell: () => setFocusedField(f => f === c.field ? null : f),
    resizeArmed: altHeld && focusedField === c.field && resizable && c.resizable !== false,
    isResizing: resizingField === c.field,
    interacting: dragField !== null || resizingField !== null,
    stickyTop: stickyHead,
    stickyLeft: stickyCol && c.rowHeader,
    stickyLeftOffset: checkboxCol ? checkboxCol.width : 0,
    scrolledX: scrolledX,
    scrolledY: scrolledY,
    drop: dropTarget && dropTarget.field === c.field ? dropTarget.side : null,
    onGripDown: e => startHeaderPress(e, c),
    onResizeDown: e => startResize(e, c),
    onResizeKey: e => onHandleKey(e, c),
    width: widths[c.field] || 96
  })), actionCol && /*#__PURE__*/React.createElement("th", {
    "aria-hidden": "true",
    style: {
      position: stickyCol || stickyHead ? 'sticky' : 'static',
      top: stickyHead ? 0 : undefined,
      right: stickyCol ? 0 : undefined,
      zIndex: stickyCol ? stickyHead ? 55 : 30 : stickyHead ? 40 : undefined,
      background: 'var(--table-header-bg)',
      padding: 'var(--table-header-pad-y) var(--table-header-action-pad-x)',
      boxShadow: ['inset 0 -1px 0 var(--table-border)', stickyCol ? 'inset 1px 0 0 var(--table-border)' : null, stickyCol && scrolledX ? '-6px 0 8px -6px rgba(15,23,42,0.18)' : null].filter(Boolean).join(', ')
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, bodyRows.map((row, pos) => {
    const id = rowFocusable ? effectiveRowOrder[pos] : pos;
    const legs = rowHasLegs(row);
    const isOpen = legs && expandedRows.has(id);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: id
    }, /*#__PURE__*/React.createElement(Row, {
      row: row,
      ri: id,
      rowId: id,
      pos: pos,
      columns: renderCols,
      rowActions: rowActions,
      striped: striped,
      hover: hover,
      stickyCol: stickyCol,
      scrolledX: scrolledX,
      selected: selectedRow === id,
      onClick: onRowClick,
      reorderableRows: reorderableRows,
      rowFocusable: rowFocusable,
      grabbed: grabbedRowId === id,
      dragging: dragRowId === id,
      rovingTabIndex: rowFocusable ? id === activeRowRoving ? 0 : -1 : undefined,
      onFocusRow: () => setRovingRowId(id),
      previewApi: previewRef,
      hasLegs: legs,
      expanded: isOpen,
      onToggleExpand: () => toggleExpand(id),
      selectionMode: selectionMode,
      rowSelected: selSet.has(id),
      onToggleSelect: () => toggleSel(id),
      selectedField: selCell && selCell.row === id ? selCell.field : null,
      onPriceSelect: field => selectPriceCell(id, field),
      cellActiveIndex: cellRowId === id ? cellIndex : -1,
      onMenuClose: () => exitCellMode(id),
      onHandleKey: onRowHandleKey,
      onHandleDown: startRowDrag
    }), isOpen && row.legs.map((leg, li) => {
      const legId = id + ':leg:' + li;
      return /*#__PURE__*/React.createElement(Row, {
        key: legId,
        row: leg,
        ri: legId,
        rowId: legId,
        pos: pos,
        columns: renderCols,
        rowActions: rowActions,
        striped: false,
        hover: false,
        stickyCol: stickyCol,
        scrolledX: scrolledX,
        selected: false,
        rowFocusable: rowFocusable,
        reorderableRows: false,
        rovingTabIndex: rowFocusable ? legId === activeRowRoving ? 0 : -1 : undefined,
        onFocusRow: () => setRovingRowId(legId),
        isLeg: true,
        legInfo: {
          index: li,
          count: row.legs.length,
          first: li === 0,
          last: li === row.legs.length - 1
        },
        previewApi: previewRef,
        selectionMode: selectionMode,
        selectedField: selCell && selCell.row === legId ? selCell.field : null,
        onPriceSelect: field => selectPriceCell(legId, field),
        cellActiveIndex: cellRowId === legId ? cellIndex : -1,
        onMenuClose: () => exitCellMode(legId),
        onHandleKey: onRowHandleKey
      });
    }));
  })))), /*#__PURE__*/React.createElement(PreviewLayer, {
    ref: previewRef
  }), ghost && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'fixed',
      left: ghost.x,
      top: ghost.y,
      width: ghost.w,
      minWidth: 120,
      minHeight: ghost.h,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 12px',
      background: 'var(--surface-0)',
      border: '1px solid var(--surface-200)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-overlay)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--table-header-size)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--table-header-fg)',
      lineHeight: 'var(--leading-sm)',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      zIndex: 9999,
      cursor: 'grabbing'
    }
  }, /*#__PURE__*/React.createElement(GripDots, null), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, ghost.label)), /*#__PURE__*/React.createElement("div", {
    ref: liveRef,
    "aria-live": "polite",
    style: {
      position: 'absolute',
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      whiteSpace: 'nowrap',
      border: 0
    }
  }), (resizable || reorderable) && layoutChanged && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: resetLayout,
    style: {
      marginTop: 'var(--space-sm)',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-link)',
      padding: 0
    }
  }, "Reset columns"));
}
function SelectCheck({
  checked,
  indeterminate,
  onToggle,
  label,
  tabIndex,
  dataCellTarget,
  headerSelect,
  onKeyDown,
  onFocus
}) {
  const on = checked || indeterminate;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "checkbox",
    "aria-checked": indeterminate ? 'mixed' : checked,
    "aria-label": label,
    tabIndex: tabIndex,
    "data-cell-target": dataCellTarget
  }, headerSelect ? {
    'data-header-select': ''
  } : {}, {
    onClick: e => {
      e.stopPropagation();
      onToggle && onToggle();
    },
    onKeyDown: onKeyDown || (e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.stopPropagation();
      }
    }),
    onFocus: onFocus,
    onPointerDown: e => e.stopPropagation(),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      padding: 0,
      boxSizing: 'border-box',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      outline: 'none',
      border: `1px solid ${on ? 'var(--check-checked-border)' : 'var(--surface-300)'}`,
      background: on ? 'var(--check-checked-bg)' : 'var(--check-bg)',
      transition: 'background var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease)'
    }
  }), indeterminate ? /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14",
    stroke: "var(--check-icon-color)",
    strokeWidth: "3",
    strokeLinecap: "round"
  })) : checked ? /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5",
    stroke: "var(--check-icon-color)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })) : null);
}
function GripDots() {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 3px)',
      gap: 3,
      flexShrink: 0
    }
  }, Array.from({
    length: 6
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: 'var(--surface-400)'
    }
  })));
}
function HeaderCell({
  col,
  zi,
  reorderable,
  resizable,
  sortable,
  sortDir,
  onSortClick,
  isDragSource,
  grabbed,
  onHeaderKey,
  keyboardFocusable,
  rovingTabIndex,
  onFocusCell,
  onBlurCell,
  resizeArmed,
  isResizing,
  interacting,
  stickyTop,
  stickyLeft,
  stickyLeftOffset = 0,
  scrolledX,
  scrolledY,
  drop,
  onGripDown,
  onResizeDown,
  onResizeKey,
  width
}) {
  const [hover, setHover] = React.useState(false);
  const [thKf, setThKf] = React.useState(false);
  const [btnHover, setBtnHover] = React.useState(false);
  const [btnKf, setBtnKf] = React.useState(false);
  const [resizeHl, setResizeHl] = React.useState(false);
  const [resizeFocusRing, setResizeFocusRing] = React.useState(false);
  const [tipDismissed, setTipDismissed] = React.useState(false);
  const [tipVisible, setTipVisible] = React.useState(false); // definition tooltip
  const [tipPos, setTipPos] = React.useState(null);
  const [sortTipVisible, setSortTipVisible] = React.useState(false);
  const textRef = React.useRef(null);
  const tipTimer = React.useRef(0);
  const sortTipTimer = React.useRef(0);
  const numeric = col.numeric || col.change;
  const colName = typeof col.header === 'string' ? col.header : col.field;
  const hasTip = !!col.tooltip;
  const tipId = React.useMemo(() => 'qm-dt-hdr-tip-' + (col.field || Math.random().toString(36).slice(2)), [col.field]);
  const TIP_DELAY = 300;
  const placeTip = () => {
    const el = textRef.current;
    if (!el || typeof window === 'undefined') return;
    const r = el.getBoundingClientRect();
    let left = r.left + r.width / 2;
    left = Math.max(134, Math.min(left, window.innerWidth - 134)); // keep the 260px-max bubble on screen
    setTipPos({
      left,
      top: r.top - 8
    });
  };
  const showTip = delay => {
    if (!hasTip || tipDismissed) return;
    clearTimeout(tipTimer.current);
    if (delay) {
      tipTimer.current = setTimeout(() => {
        placeTip();
        setTipVisible(true);
      }, delay);
    } else {
      placeTip();
      setTipVisible(true);
    }
  };
  const hideTip = () => {
    clearTimeout(tipTimer.current);
    setTipVisible(false);
  };
  const showSortTip = () => {
    clearTimeout(sortTipTimer.current);
    sortTipTimer.current = setTimeout(() => setSortTipVisible(true), TIP_DELAY);
  };
  const hideSortTip = () => {
    clearTimeout(sortTipTimer.current);
    setSortTipVisible(false);
  };
  React.useEffect(() => () => {
    clearTimeout(tipTimer.current);
    clearTimeout(sortTipTimer.current);
  }, []);
  React.useEffect(() => {
    if (grabbed || isDragSource || interacting) {
      hideTip();
      hideSortTip();
    }
  }, [grabbed, isDragSource, interacting]);
  React.useEffect(() => {
    if (!tipVisible) return;
    const on = () => hideTip(); // dismiss on scroll/resize rather than chase a fixed-position bubble
    window.addEventListener('scroll', on, true);
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on, true);
      window.removeEventListener('resize', on);
    };
  }, [tipVisible]);
  const nextAction = !sortDir ? 'asc' : sortDir === 'asc' ? 'desc' : 'clear';
  const actionText = nextAction === 'clear' ? 'Clear sort' : numeric ? nextAction === 'asc' ? 'Sort ascending' : 'Sort descending' : nextAction === 'asc' ? 'Sort A to Z' : 'Sort Z to A';
  const sortIcon = sortDir === 'desc' ? 'pi-sort-amount-down' : 'pi-sort-amount-up-alt';
  const showSortBtn = sortable && (!!sortDir || (hover || btnHover || btnKf) && !interacting);
  const thShadow = (() => {
    const s = ['inset 0 -1px 0 var(--table-border)']; // persistent header underline (survives sticky scroll)
    if (grabbed) s.push('inset 0 0 0 2px var(--primary)');else if (thKf) s.push('inset 0 0 0 2px var(--focus-ring-color)');
    if (stickyLeft) {
      s.push('inset -1px 0 0 var(--table-border)');
      if (scrolledX) s.push('var(--table-sticky-shadow-x)');
    }
    if (stickyTop && scrolledY) s.push('var(--table-sticky-shadow-y)');
    return s.join(', ');
  })();
  return /*#__PURE__*/React.createElement("th", {
    scope: "col",
    "data-field": col.field,
    "aria-sort": sortable ? sortDir === 'asc' ? 'ascending' : sortDir === 'desc' ? 'descending' : 'none' : undefined,
    "aria-roledescription": reorderable ? 'Draggable column header' : undefined,
    "aria-describedby": hasTip ? tipId : undefined,
    tabIndex: keyboardFocusable ? rovingTabIndex != null ? rovingTabIndex : 0 : undefined,
    onKeyDown: keyboardFocusable ? e => {
      if (e.key === 'Escape' && tipVisible) {
        setTipDismissed(true);
        hideTip();
      }
      onHeaderKey && onHeaderKey(e);
    } : undefined,
    onFocus: keyboardFocusable ? e => {
      onFocusCell && onFocusCell();
      setTipDismissed(false);
      showTip(0);
      try {
        setThKf(e.currentTarget === e.target && e.currentTarget.matches(':focus-visible'));
      } catch (_) {
        setThKf(true);
      }
    } : undefined,
    onBlur: () => {
      setThKf(false);
      setTipDismissed(false);
      hideTip();
      onBlurCell && onBlurCell();
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: stickyTop || stickyLeft ? 'sticky' : 'relative',
      boxSizing: 'border-box',
      top: stickyTop ? 0 : undefined,
      left: stickyLeft ? stickyLeftOffset : undefined,
      zIndex: stickyLeft ? 60 : stickyTop ? 40 : grabbed ? zi + 100 : zi,
      textAlign: numeric ? 'right' : col.align || 'left',
      padding: col.field === 'last' ? 'var(--table-header-pad-y) var(--table-header-pad-x) var(--table-header-pad-y) 8px' : 'var(--table-header-pad-y) var(--table-header-pad-x)',
      background: grabbed ? 'var(--primary-subtle)' : hover && reorderable ? 'var(--table-header-hover-bg)' : 'var(--table-header-bg)',
      color: 'var(--table-header-fg)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--table-header-size)',
      lineHeight: 'var(--leading-sm)',
      whiteSpace: 'nowrap',
      opacity: isDragSource ? 'var(--table-drag-source-opacity)' : 1,
      cursor: isDragSource || grabbed ? 'grabbing' : reorderable ? 'grab' : sortable ? 'pointer' : 'default',
      boxShadow: thShadow,
      userSelect: 'none',
      outline: 'none'
    },
    onPointerDown: reorderable || sortable ? onGripDown : undefined
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      maxWidth: '100%',
      verticalAlign: 'middle',
      flexDirection: numeric ? 'row-reverse' : 'row'
    }
  }, /*#__PURE__*/React.createElement("span", {
    ref: textRef,
    onMouseEnter: () => {
      setTipDismissed(false);
      showTip(TIP_DELAY);
    },
    onMouseLeave: hideTip,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, col.header), sortable && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": `${colName}: ${actionText}`,
    tabIndex: -1,
    onPointerDown: e => e.stopPropagation(),
    onClick: e => {
      e.stopPropagation();
      onSortClick();
    },
    onMouseEnter: () => {
      setBtnHover(true);
      showSortTip();
    },
    onMouseLeave: () => {
      setBtnHover(false);
      hideSortTip();
    },
    onFocus: e => {
      try {
        setBtnKf(e.currentTarget.matches(':focus-visible'));
      } catch (_) {
        setBtnKf(true);
      }
    },
    onBlur: () => {
      setBtnKf(false);
      hideSortTip();
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      padding: 0,
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      background: btnHover || btnKf ? 'var(--surface-100)' : 'transparent',
      color: sortDir ? 'var(--primary)' : 'var(--text-muted)',
      cursor: 'pointer',
      opacity: showSortBtn ? 1 : 0,
      transition: 'opacity var(--duration-fast) var(--ease)',
      boxShadow: btnKf ? 'var(--focus-ring)' : 'none',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "aria-hidden": "true",
    className: 'pi ' + sortIcon,
    style: {
      fontSize: 12,
      lineHeight: 1
    }
  })), (sortTipVisible || btnKf) && !interacting && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      top: 'calc(100% + var(--tooltip-gutter))',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--tooltip-bg)',
      color: 'var(--tooltip-fg)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--tooltip-font-size)',
      lineHeight: 1.4,
      fontWeight: 'var(--weight-regular)',
      letterSpacing: 0,
      textTransform: 'none',
      padding: 'var(--tooltip-padding-y) var(--tooltip-padding-x)',
      borderRadius: 'var(--tooltip-radius)',
      whiteSpace: 'nowrap',
      zIndex: 40,
      pointerEvents: 'none',
      boxShadow: 'var(--tooltip-shadow)'
    }
  }, colName, " \u2022 ", actionText))), hasTip && tipVisible && tipPos && !grabbed && !isDragSource && !interacting && portal(/*#__PURE__*/React.createElement("div", {
    id: tipId,
    role: "tooltip",
    style: {
      position: 'fixed',
      left: tipPos.left,
      top: tipPos.top,
      transform: 'translate(-50%, -100%)',
      maxWidth: 'var(--tooltip-max-width)',
      width: 'max-content',
      zIndex: 2147483000,
      background: 'var(--tooltip-bg)',
      color: 'var(--tooltip-fg)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--tooltip-font-size)',
      lineHeight: 1.4,
      fontWeight: 'var(--weight-regular)',
      letterSpacing: 0,
      textTransform: 'none',
      padding: 'var(--tooltip-padding-y) var(--tooltip-padding-x)',
      borderRadius: 'var(--tooltip-radius)',
      whiteSpace: 'normal',
      textAlign: 'left',
      pointerEvents: 'none',
      boxShadow: 'var(--tooltip-shadow)'
    }
  }, col.tooltip, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: 'calc(var(--tooltip-arrow-size) * -1)',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: 'var(--tooltip-arrow-size) var(--tooltip-arrow-size) 0 var(--tooltip-arrow-size)',
      borderColor: 'var(--tooltip-bg) transparent transparent transparent'
    }
  }))), drop && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: -3,
      bottom: -3,
      [drop === 'before' ? 'left' : 'right']: -1,
      width: 2,
      background: 'var(--table-drop-indicator)'
    }
  }), resizable && /*#__PURE__*/React.createElement("span", {
    role: "separator",
    "aria-orientation": "vertical",
    tabIndex: -1,
    "aria-label": `Resize ${typeof col.header === 'string' ? col.header : col.field} column`,
    "aria-valuenow": Math.round(width),
    "aria-valuemin": col.minWidth || 56,
    "aria-valuemax": col.maxWidth || 280,
    onPointerDown: onResizeDown,
    onKeyDown: onResizeKey,
    onMouseEnter: () => setResizeHl(true),
    onMouseLeave: () => setResizeHl(false),
    style: {
      position: 'absolute',
      top: 4,
      bottom: 4,
      right: 0,
      width: 'var(--table-resize-hit)',
      cursor: 'col-resize',
      touchAction: 'none',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'stretch',
      outline: 'none'
    },
    onFocus: e => {
      setResizeHl(true);
      try {
        setResizeFocusRing(e.currentTarget.matches(':focus-visible'));
      } catch (_) {
        setResizeFocusRing(true);
      }
    },
    onBlur: () => {
      setResizeHl(false);
      setResizeFocusRing(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "qm-resize-bar",
    style: {
      width: resizeArmed ? 3 : 2,
      height: '100%',
      borderRadius: 'var(--radius-xs)',
      background: isResizing || resizeArmed || resizeHl && !interacting ? 'var(--table-resize-bar)' : 'transparent',
      boxShadow: resizeFocusRing ? 'var(--focus-ring)' : 'none',
      transition: 'background var(--duration-fast) var(--ease), width var(--duration-fast) var(--ease)'
    }
  })));
}
function ExpanderBtn({
  expanded,
  onToggle,
  label,
  tabIndex,
  dataCellTarget
}) {
  const [hv, setHv] = React.useState(false);
  const [kf, setKf] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-cell-target": dataCellTarget,
    tabIndex: tabIndex,
    "aria-expanded": expanded,
    "aria-label": label,
    onClick: e => {
      e.stopPropagation();
      onToggle && onToggle();
    },
    onPointerDown: e => e.stopPropagation(),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        e.stopPropagation();
        onToggle && onToggle();
      }
    },
    onMouseEnter: () => setHv(true),
    onMouseLeave: () => setHv(false),
    onFocus: e => {
      try {
        setKf(e.currentTarget.matches(':focus-visible'));
      } catch (_) {
        setKf(true);
      }
    },
    onBlur: () => setKf(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16,
      height: 16,
      flexShrink: 0,
      padding: 0,
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      outline: 'none',
      background: hv ? 'var(--surface-100)' : 'transparent',
      color: expanded ? 'var(--primary)' : 'var(--text-muted)',
      boxShadow: kf ? 'var(--focus-ring)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 14 14",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.399 1.601C11.197.4 9.874.041 8.504.361c-1.289.3-2.54 1.181-3.734 2.233a.75.75 0 0 0 .99 1.126C6.92 2.7 7.936 2.033 8.844 1.822c.825-.193 1.628-.026 2.494.84c.86.86 1.03 1.656.846 2.472c-.202.896-.85 1.9-1.852 3.046a.75.75 0 0 0 1.129.988c1.035-1.185 1.898-2.426 2.186-3.705c.306-1.36-.057-2.67-1.248-3.862M9.388 4.613a.75.75 0 0 1 0 1.06L5.673 9.388a.75.75 0 0 1-1.06-1.06l3.714-3.715a.75.75 0 0 1 1.061 0m-5.79.148a.75.75 0 0 1 .07 1.059c-1.001 1.145-1.65 2.15-1.851 3.046c-.184.816-.015 1.612.845 2.472c.866.866 1.669 1.033 2.494.84c.908-.211 1.925-.877 3.083-1.898a.75.75 0 1 1 .991 1.126c-1.194 1.052-2.445 1.933-3.733 2.233c-1.371.32-2.693-.038-3.896-1.24C.411 11.208.047 9.898.353 8.537c.288-1.28 1.15-2.52 2.186-3.705a.75.75 0 0 1 1.059-.07"
  })));
}

// Vertical chain connector drawn behind a leg's symbol cell: a thin line linking
// the leg nodes plus a small chain-link glyph at each leg. `first`/`last` trim
// the line so it starts at the first node and ends at the last.
function LegChain({
  first,
  last
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 7,
      top: first ? '50%' : 0,
      bottom: last ? '50%' : 0,
      width: 1,
      background: 'var(--surface-300)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 7,
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: 'var(--surface-0)',
      border: '1px solid var(--surface-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)'
    }
  }));
}
function Row({
  row,
  ri,
  rowId,
  pos,
  columns,
  rowActions,
  striped,
  hover,
  stickyCol,
  scrolledX,
  selected,
  onClick,
  reorderableRows,
  rowFocusable,
  grabbed,
  dragging,
  rovingTabIndex,
  onFocusRow,
  previewApi,
  hasLegs,
  expanded,
  onToggleExpand,
  isLeg,
  legInfo,
  selectionMode,
  rowSelected,
  onToggleSelect,
  selectedField,
  onPriceSelect,
  cellActiveIndex,
  onMenuClose,
  onHandleKey,
  onHandleDown
}) {
  const [h, setH] = React.useState(false);
  const [kf, setKf] = React.useState(false);
  const [foc, setFoc] = React.useState(false);
  const [ctxPos, setCtxPos] = React.useState(null);
  const trRef = React.useRef(null);
  const inCellMode = cellActiveIndex != null && cellActiveIndex >= 0;
  const stripeI = pos != null ? pos : ri;
  const showHover = !isLeg && (h && hover || foc);
  const bg = isLeg ? 'var(--table-row-striped-bg)' : grabbed ? 'var(--primary-subtle)' : selected ? 'var(--table-row-selected-bg)' : showHover ? 'var(--table-row-hover-bg)' : striped && stripeI % 2 === 1 ? 'var(--table-row-striped-bg)' : 'var(--surface-0)';
  // Grab / keyboard-focus state mirrors the column header: primary-subtle fill
  // plus a 2px primary ring (drawn from the cells so it spans the whole row).
  const ring = grabbed ? 'var(--primary)' : kf ? 'var(--focus-ring-color)' : null;
  const cellRing = (first, last) => {
    if (!ring) return null;
    const s = [`inset 0 2px 0 ${ring}`, `inset 0 -2px 0 ${ring}`];
    if (first) s.push(`inset 2px 0 0 ${ring}`);
    if (last) s.push(`inset -2px 0 0 ${ring}`);
    return s.join(', ');
  };
  const lastIdx = columns.length - 1;
  const cbCol = columns.find(c => c.selectionCheckbox);
  const symbolLeft = cbCol ? cbCol.width || 40 : 0;
  let ti = 0;
  return /*#__PURE__*/React.createElement("tr", {
    ref: trRef,
    "data-row-id": rowFocusable ? rowId : undefined,
    "aria-expanded": hasLegs ? !!expanded : undefined,
    tabIndex: rowFocusable ? inCellMode ? -1 : rovingTabIndex != null ? rovingTabIndex : 0 : undefined,
    "aria-roledescription": reorderableRows ? 'Draggable row' : undefined,
    onKeyDown: rowFocusable ? e => onHandleKey && onHandleKey(e, rowId) : undefined,
    onPointerDown: reorderableRows ? e => onHandleDown && onHandleDown(e, rowId) : undefined,
    onContextMenu: !isLeg && rowActions && rowActions.length ? e => {
      e.preventDefault();
      e.stopPropagation();
      setCtxPos({
        top: e.clientY,
        left: e.clientX
      });
    } : undefined,
    onFocus: rowFocusable ? e => {
      if (e.target === e.currentTarget) {
        onFocusRow && onFocusRow();
        setFoc(true);
        try {
          setKf(e.currentTarget.matches(':focus-visible'));
        } catch (_) {
          setKf(true);
        }
      }
    } : undefined,
    onBlur: rowFocusable ? e => {
      if (e.target === e.currentTarget) {
        setKf(false);
        setFoc(false);
      }
    } : undefined,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    onClick: () => {
      if (hasLegs) {
        onToggleExpand && onToggleExpand();
      } else if (onClick) {
        onClick(ri, row);
      }
    },
    style: {
      background: bg,
      cursor: hasLegs ? 'pointer' : reorderableRows ? 'grab' : onClick ? 'pointer' : 'default',
      opacity: dragging ? 0.5 : 1,
      outline: 'none',
      transition: 'background var(--duration-fast) var(--ease)'
    }
  }, columns.map((c, ci) => {
    const rShadow = cellRing(ci === 0, ci === lastIdx);
    if (c.selectionCheckbox) {
      const myIdx = ti++;
      return /*#__PURE__*/React.createElement("td", {
        key: "__select",
        style: {
          padding: '7px 2px 0 8px',
          textAlign: 'center',
          verticalAlign: 'top',
          borderBottom: '1px solid var(--table-cell-border)',
          position: stickyCol ? 'sticky' : undefined,
          left: stickyCol ? 0 : undefined,
          zIndex: stickyCol ? 8 : undefined,
          background: stickyCol ? bg : undefined,
          transition: stickyCol ? 'background var(--duration-fast) var(--ease)' : undefined,
          boxShadow: rShadow || undefined
        }
      }, !isLeg && /*#__PURE__*/React.createElement(SelectCheck, {
        checked: !!rowSelected,
        onToggle: onToggleSelect,
        label: `Select row`,
        tabIndex: cellActiveIndex === myIdx ? 0 : -1,
        dataCellTarget: myIdx
      }));
    }
    if (c.rowAction) {
      const myIdx = ti++;
      return /*#__PURE__*/React.createElement("td", {
        key: c.field,
        style: {
          padding: '4px 2px 0',
          textAlign: 'center',
          verticalAlign: 'top',
          borderBottom: '1px solid var(--table-cell-border)',
          whiteSpace: 'nowrap',
          position: stickyCol ? 'sticky' : undefined,
          right: stickyCol ? 0 : undefined,
          zIndex: stickyCol ? 9 : undefined,
          background: stickyCol ? bg : undefined,
          transition: 'background var(--duration-fast) var(--ease)',
          boxShadow: [stickyCol ? 'inset 1px 0 0 var(--table-cell-border)' : null, stickyCol && scrolledX ? '-6px 0 8px -6px rgba(15,23,42,0.18)' : null, rShadow].filter(Boolean).join(', ') || undefined
        }
      }, !isLeg && /*#__PURE__*/React.createElement(RowActionMenu, {
        actions: rowActions,
        row: row,
        ri: ri,
        tabIndex: cellActiveIndex === myIdx ? 0 : -1,
        dataCellTarget: myIdx,
        onCloseFocus: onMenuClose
      }));
    }
    let val = row[c.field];
    let color = selected ? 'var(--table-row-selected-fg)' : 'var(--text-primary)';
    if (c.priceCell) {
      const myIdx = ti++;
      const isSel = selectedField === c.field;
      const pv = c.render ? c.render(row[c.field], row) : val;
      return /*#__PURE__*/React.createElement("td", {
        key: c.field,
        style: {
          padding: 0,
          verticalAlign: 'top',
          borderBottom: '1px solid var(--table-cell-border)',
          boxShadow: rShadow || undefined
        }
      }, /*#__PURE__*/React.createElement("button", _extends({
        type: "button",
        "data-cell-target": myIdx,
        "data-price": c.priceCell
      }, isSel ? {
        'data-selected': ''
      } : {}, {
        tabIndex: cellActiveIndex === myIdx ? 0 : -1,
        "aria-pressed": isSel,
        "aria-label": `${c.priceCell === 'ask' ? 'Ask' : 'Bid'} ${pv}`,
        onClick: e => {
          e.stopPropagation();
          onPriceSelect && onPriceSelect(c.field);
        },
        onPointerDown: e => e.stopPropagation()
      }), pv));
    }
    if (c.change) {
      const num = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^\d.-]/g, ''));
      color = num > 0 ? 'var(--table-buy-fg)' : num < 0 ? 'var(--table-sell-fg)' : 'var(--text-secondary)';
      if (typeof val === 'number') val = (num > 0 ? '+' : '') + val.toFixed(2);
    }
    const Cell = c.rowHeader ? 'th' : 'td';
    const stuck = stickyCol && c.rowHeader;
    const hasCellAction = typeof c.cellAction === 'function';
    const showExpander = c.rowHeader && hasLegs;
    const myIdx = hasCellAction ? ti++ : null;
    const expanderIdx = showExpander ? ti++ : null;
    const content = c.render ? c.render(row[c.field], row) : val;
    const legHead = isLeg && c.rowHeader;
    const linked = hasCellAction ? /*#__PURE__*/React.createElement(CellActionLink, {
      value: row[c.field],
      row: row,
      ri: ri,
      action: c.cellAction,
      wrap: c.wrap,
      actionLabel: c.cellActionLabel ? c.cellActionLabel(row[c.field], row) : undefined,
      tabIndex: cellActiveIndex === myIdx ? 0 : -1,
      dataCellTarget: myIdx,
      preview: c.cellPreview ? c.cellPreview(row[c.field], row) : null,
      previewLabel: c.cellPreviewLabel ? c.cellPreviewLabel(row[c.field], row) : c.cellActionLabel ? c.cellActionLabel(row[c.field], row) : undefined,
      previewApi: previewApi
    }, content) : content;
    let inner = linked;
    if (c.rowHeader && !isLeg) {
      // Symbol content is flush-left; the disclosure sits on the RIGHT edge of
      // the cell (only on multi-leg rows), so ordinary rows waste no gutter.
      inner = /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'flex',
          alignItems: 'flex-start',
          gap: 6,
          width: '100%'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          minWidth: 0,
          flex: '1 1 auto'
        }
      }, linked), showExpander && /*#__PURE__*/React.createElement(ExpanderBtn, {
        expanded: !!expanded,
        onToggle: onToggleExpand,
        label: (expanded ? 'Collapse' : 'Expand') + ' strategy legs',
        tabIndex: cellActiveIndex === expanderIdx ? 0 : -1,
        dataCellTarget: expanderIdx
      }));
    } else if (legHead) {
      inner = /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'inline-block',
          marginLeft: 0,
          minWidth: 0
        }
      }, linked);
    }
    return /*#__PURE__*/React.createElement(Cell, {
      key: c.field,
      scope: c.rowHeader ? 'row' : undefined,
      style: {
        textAlign: c.numeric || c.change ? 'right' : c.align || 'left',
        padding: legHead ? '7px 12px 7px 17px' : c.rowHeader ? '7px 12px 7px 8px' : '7px 12px',
        borderBottom: '1px solid var(--table-cell-border)',
        fontFamily: 'var(--font-sans)',
        fontVariantNumeric: c.numeric || c.change ? 'tabular-nums' : 'normal',
        lineHeight: 'var(--leading-base)',
        fontWeight: c.bold || c.rowHeader ? 'var(--weight-medium)' : 'var(--weight-regular)',
        color,
        whiteSpace: c.wrap ? 'normal' : 'nowrap',
        overflow: 'hidden',
        textOverflow: c.wrap ? 'clip' : 'ellipsis',
        verticalAlign: 'top',
        position: stuck ? 'sticky' : legHead ? 'relative' : undefined,
        left: stuck ? symbolLeft : undefined,
        zIndex: stuck ? 10 : undefined,
        background: stuck ? bg : undefined,
        transition: stuck ? 'background var(--duration-fast) var(--ease)' : undefined,
        boxShadow: [stuck ? 'inset -1px 0 0 var(--table-border)' + (scrolledX ? ', var(--table-sticky-shadow-x)' : '') : null, rShadow].filter(Boolean).join(', ') || undefined
      }
    }, legHead && /*#__PURE__*/React.createElement(LegChain, {
      first: legInfo.first,
      last: legInfo.last
    }), inner);
  }), ctxPos && /*#__PURE__*/React.createElement(MenuPanel, {
    actions: rowActions,
    row: row,
    ri: ri,
    pos: ctxPos,
    align: "left",
    onClose: rf => {
      setCtxPos(null);
      if (rf && trRef.current) requestAnimationFrame(() => trRef.current.focus());
    }
  }));
}
const QM_PREVIEW_ID = 'qm-dt-preview';
const PREVIEW_W = 340,
  PREVIEW_H = 240,
  PREVIEW_CUR = 18,
  PREVIEW_GAP = 10;

/**
 * ONE shared, persistent preview popover for the whole table. Cell links report
 * hover / focus to it (via a ref API) instead of each owning a popover — so
 * sweeping the pointer down the symbol column NEVER unmounts/remounts the
 * popover. It stays put and only swaps its inner content:
 *   • Pointer → follows the cursor (transform-driven, no transition); a ~60ms
 *     commit debounce means fast sweeps don't strobe, and a brief skeleton
 *     shimmer + fade covers each content swap.
 *   • Keyboard focus → anchored to the focused link (flips above / clamps).
 * Non-interactive (pointer-events:none); Esc/blur/leave-grace dismiss it.
 */
const PreviewLayer = React.forwardRef(function PreviewLayer(_props, ref) {
  const popRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(null); // { key, content, label }
  const [swapping, setSwapping] = React.useState(false);
  const modeRef = React.useRef('pointer');
  const posRef = React.useRef({
    left: 0,
    top: 0
  });
  const curKeyRef = React.useRef(null);
  const hoverRef = React.useRef(false);
  const focusRef = React.useRef(false);
  const escShutRef = React.useRef(false);
  const rafRef = React.useRef(0);
  const commitTimer = React.useRef(0);
  const swapTimer = React.useRef(0);
  const leaveTimer = React.useRef(0);
  const pendingRef = React.useRef(null);
  const cursorCoords = (x, y) => {
    const vw = window.innerWidth,
      vh = window.innerHeight;
    let left = x + PREVIEW_CUR,
      top = y + PREVIEW_CUR;
    if (left + PREVIEW_W > vw - 8) left = Math.max(8, x - PREVIEW_CUR - PREVIEW_W); // flip left of cursor
    if (left < 8) left = 8;
    if (top + PREVIEW_H > vh - 8) top = Math.max(8, y - PREVIEW_CUR - PREVIEW_H); // place above cursor
    if (top < 8) top = 8;
    return {
      left,
      top
    };
  };
  const elCoords = el => {
    if (!el || typeof window === 'undefined') return posRef.current;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth,
      vh = window.innerHeight;
    let left = r.left,
      top = r.bottom + PREVIEW_GAP;
    if (top + PREVIEW_H > vh - 8) top = Math.max(8, r.top - PREVIEW_GAP - PREVIEW_H);
    if (left + PREVIEW_W > vw - 8) left = Math.max(8, vw - 8 - PREVIEW_W);
    if (left < 8) left = 8;
    return {
      left,
      top
    };
  };
  const apply = () => {
    if (popRef.current) popRef.current.style.transform = `translate3d(${posRef.current.left}px, ${posRef.current.top}px, 0)`;
  };
  const commitSwap = payload => {
    curKeyRef.current = {
      key: payload.key,
      el: payload.el
    };
    setView({
      key: payload.key,
      content: payload.content,
      label: payload.label
    });
    setSwapping(true); // brief fade of the NEW chart in
    clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(() => setSwapping(false), 30);
  };
  React.useEffect(() => () => {
    [rafRef, commitTimer, swapTimer, leaveTimer].forEach(t => {
      clearTimeout(t.current);
    });
    cancelAnimationFrame(rafRef.current);
  }, []);
  React.useEffect(() => {
    if (!open) return;
    const on = () => {
      if (modeRef.current === 'keyboard' && curKeyRef.current && curKeyRef.current.el) {
        posRef.current = elCoords(curKeyRef.current.el);
        apply();
      }
    };
    window.addEventListener('scroll', on, true);
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on, true);
      window.removeEventListener('resize', on);
    };
  }, [open]);
  // Keep the popover glued to the cursor on the first paint after it opens.
  React.useLayoutEffect(() => {
    if (open) apply();
  }, [open, view]);
  React.useImperativeHandle(ref, () => ({
    enter(payload) {
      hoverRef.current = true;
      escShutRef.current = false;
      clearTimeout(leaveTimer.current);
      modeRef.current = 'pointer';
      posRef.current = cursorCoords(payload.x, payload.y);
      if (!open || curKeyRef.current == null || curKeyRef.current.key == null) {
        curKeyRef.current = {
          key: payload.key,
          el: payload.el
        };
        setView({
          key: payload.key,
          content: payload.content,
          label: payload.label
        });
        setSwapping(false);
        setOpen(true);
        return;
      }
      curKeyRef.current = {
        key: payload.key,
        el: payload.el
      };
      apply();
      if (payload.key !== (view && view.key)) {
        // Moved onto a different symbol — swap immediately (the crossfade keeps it smooth).
        clearTimeout(commitTimer.current);
        pendingRef.current = null;
        commitSwap(payload);
      }
    },
    move(x, y) {
      if (modeRef.current !== 'pointer' || !hoverRef.current) return;
      posRef.current = cursorCoords(x, y);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(apply);
    },
    leave() {
      hoverRef.current = false;
      clearTimeout(commitTimer.current);
      pendingRef.current = null;
      clearTimeout(leaveTimer.current);
      // Generous grace so sweeping across the gap/border BETWEEN two symbol rows
      // (where there's no button under the cursor) doesn't dismiss + reopen the
      // popover — it stays open and the next row's enter takes over.
      leaveTimer.current = setTimeout(() => {
        if (!hoverRef.current && !focusRef.current) setOpen(false);
      }, 320);
    },
    focus(payload) {
      focusRef.current = true;
      escShutRef.current = false;
      clearTimeout(leaveTimer.current);
      modeRef.current = 'keyboard';
      curKeyRef.current = {
        key: payload.key,
        el: payload.el
      };
      posRef.current = elCoords(payload.el);
      setView({
        key: payload.key,
        content: payload.content,
        label: payload.label
      });
      setSwapping(false);
      setOpen(true);
    },
    blur() {
      focusRef.current = false;
      if (!hoverRef.current) setOpen(false);
    },
    escape() {
      escShutRef.current = true;
      setOpen(false);
    },
    isEscShut() {
      return escShutRef.current;
    }
  }), [open, view]);
  if (!open || !view || !view.content) return null;
  return portal(/*#__PURE__*/React.createElement("div", {
    ref: popRef,
    id: QM_PREVIEW_ID,
    role: "tooltip",
    "aria-label": view.label,
    className: "qm-dt-preview",
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      transform: `translate3d(${posRef.current.left}px, ${posRef.current.top}px, 0)`,
      width: PREVIEW_W,
      height: PREVIEW_H,
      zIndex: 2147483000,
      willChange: 'transform, opacity',
      boxSizing: 'border-box',
      overflow: 'hidden',
      pointerEvents: 'none',
      background: 'var(--popover-bg)',
      color: 'var(--popover-fg)',
      border: '1px solid var(--popover-border)',
      borderRadius: 'var(--popover-radius)',
      boxShadow: 'var(--popover-shadow)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: swapping ? 'qm-dt-preview-swap' : 'qm-dt-preview-in',
    style: {
      width: '100%',
      height: '100%'
    }
  }, view.content)));
});

/**
 * Cell-action link (e.g. the Symbol quote link). Thin trigger — it renders the
 * focusable link and, when it has a `preview`, reports hover / move / focus /
 * blur / Esc to the shared PreviewLayer (`previewApi`) rather than owning a
 * popover of its own. That single shared popover is what makes sweeping the
 * column smooth (no per-row remount / flash).
 */
function CellActionLink({
  value,
  row,
  ri,
  action,
  actionLabel,
  tabIndex,
  dataCellTarget,
  preview,
  previewLabel,
  previewApi,
  wrap,
  children
}) {
  const btnRef = React.useRef(null);
  const [described, setDescribed] = React.useState(false);
  const key = (ri != null ? ri : '') + ':' + (dataCellTarget != null ? dataCellTarget : '');
  const api = () => previewApi && previewApi.current || null;
  const has = !!preview;
  return /*#__PURE__*/React.createElement("button", {
    ref: btnRef,
    type: "button",
    "data-cell-target": dataCellTarget,
    tabIndex: tabIndex,
    "aria-label": actionLabel,
    "aria-describedby": described ? QM_PREVIEW_ID : undefined,
    onClick: e => {
      e.stopPropagation();
      action && action(value, row, ri);
    },
    onPointerDown: e => e.stopPropagation(),
    onMouseEnter: e => {
      if (has && api()) api().enter({
        key,
        content: preview,
        label: previewLabel,
        x: e.clientX,
        y: e.clientY,
        el: btnRef.current
      });
    },
    onMouseMove: e => {
      if (has && api()) api().move(e.clientX, e.clientY);
    },
    onMouseLeave: () => {
      if (has && api()) api().leave();
    },
    onFocus: () => {
      if (has && api()) {
        api().focus({
          key,
          content: preview,
          label: previewLabel,
          el: btnRef.current
        });
        setDescribed(true);
      }
    },
    onBlur: () => {
      if (has && api()) {
        api().blur();
        setDescribed(false);
      }
    },
    onKeyDown: e => {
      if (e.key === 'Escape' && has && api()) {
        api().escape();
        setDescribed(false);
      }
    },
    style: {
      font: 'inherit',
      color: 'var(--text-link)',
      background: 'none',
      border: 'none',
      padding: 0,
      margin: 0,
      cursor: 'pointer',
      textDecoration: 'underline',
      textUnderlineOffset: 2,
      borderRadius: 'var(--radius-xs)',
      maxWidth: '100%',
      textAlign: 'left',
      outline: 'none',
      whiteSpace: wrap ? 'normal' : 'nowrap',
      overflow: 'hidden',
      textOverflow: wrap ? 'clip' : 'ellipsis'
    }
  }, children);
}

/**
 * Render into document.body so the menu is a true top-level layer, escaping any
 * ancestor stacking context (sticky cells, transforms) that could trap a plain
 * position:fixed element behind other rows. Falls back to inline if ReactDOM
 * isn't on the page.
 */
function portal(node) {
  const RD = typeof ReactDOM !== 'undefined' ? ReactDOM : typeof window !== 'undefined' ? window.ReactDOM : null;
  return RD && RD.createPortal && typeof document !== 'undefined' ? RD.createPortal(node, document.body) : node;
}

/**
 * Per-row action menu (kebab → context menu). Rendered with position:fixed so
 * it escapes the table's overflow:auto clipping. Styled from --menu-* tokens.
 */
/**
 * Shared floating menu panel (portaled, position:fixed so it escapes the table's
 * overflow:auto clipping). Used by the kebab RowActionMenu AND the row
 * right-click context menu. Handles focus-in on open, roving arrow/Tab nav,
 * Esc / outside-click / scroll to close. Styled from --menu-* tokens.
 */
function MenuPanel({
  actions = [],
  row,
  ri,
  pos,
  align = 'left',
  onClose
}) {
  const menuRef = React.useRef(null);
  const focusables = () => Array.from(menuRef.current && menuRef.current.querySelectorAll('[role="menuitem"]:not([disabled])') || []);
  React.useEffect(() => {
    const r = requestAnimationFrame(() => {
      const f = focusables();
      if (f[0]) f[0].focus();
    });
    return () => cancelAnimationFrame(r);
  }, []);
  const onMenuKey = e => {
    const f = focusables();
    if (!f.length) return;
    const cur = f.indexOf(document.activeElement);
    const nav = el => {
      e.preventDefault();
      e.stopPropagation();
      (el || f[0]).focus();
    };
    if (e.key === 'ArrowDown' || e.key === 'Tab' && !e.shiftKey) {
      nav(f[(cur + 1 + f.length) % f.length]);
    } else if (e.key === 'ArrowUp' || e.key === 'Tab' && e.shiftKey) {
      nav(f[(cur - 1 + f.length) % f.length]);
    } else if (e.key === 'Home') {
      nav(f[0]);
    } else if (e.key === 'End') {
      nav(f[f.length - 1]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      onClose(true);
    } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.stopPropagation();
    }
  };
  React.useEffect(() => {
    const onDoc = e => {
      if (!(menuRef.current && menuRef.current.contains(e.target))) onClose(false);
    };
    const onScroll = () => onClose(false);
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return portal(/*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    role: "menu",
    "aria-orientation": "vertical",
    onKeyDown: onMenuKey,
    onClick: e => e.stopPropagation(),
    onContextMenu: e => e.preventDefault(),
    style: {
      position: 'fixed',
      top: pos.top,
      left: pos.left,
      transform: align === 'right' ? 'translateX(-100%)' : 'none',
      zIndex: 2147483000,
      background: 'var(--menu-bg)',
      border: '1px solid var(--menu-border)',
      borderRadius: 'var(--menu-radius)',
      boxShadow: 'var(--menu-shadow)',
      padding: 'var(--space-xs)',
      minWidth: 180,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--menu-list-gap)'
    }
  }, actions.map((a, i) => a.separator ? /*#__PURE__*/React.createElement("div", {
    key: i,
    role: "separator",
    style: {
      height: 1,
      background: 'var(--menu-separator-border)',
      margin: '4px calc(var(--space-xs) * -1)'
    }
  }) : /*#__PURE__*/React.createElement(MenuRow, {
    key: i,
    action: a,
    onPick: () => {
      onClose(true);
      a.command && a.command(row, ri);
    }
  }))));
}
function RowActionMenu({
  actions = [],
  row,
  ri,
  tabIndex,
  dataCellTarget,
  onCloseFocus
}) {
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState(null);
  const ref = React.useRef(null);
  const btnRef = React.useRef(null);
  const close = returnFocus => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => {
      if (onCloseFocus) onCloseFocus();else if (btnRef.current) btnRef.current.focus();
    });
  };
  const toggle = e => {
    e.stopPropagation();
    if (open) {
      setOpen(false);
      return;
    }
    const r = btnRef.current.getBoundingClientRect();
    setPos({
      top: r.bottom + 4,
      left: r.right
    });
    setOpen(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'inline-flex'
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    ref: btnRef,
    type: "button",
    "aria-label": "Row actions",
    "aria-haspopup": "menu",
    "aria-expanded": open,
    tabIndex: tabIndex,
    "data-cell-target": dataCellTarget,
    onClick: toggle,
    onMouseDown: e => e.stopPropagation(),
    onPointerDown: e => e.stopPropagation(),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      background: open ? 'var(--surface-100)' : 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "5",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "19",
    r: "1.6"
  }))), open && pos && /*#__PURE__*/React.createElement(MenuPanel, {
    actions: actions,
    row: row,
    ri: ri,
    pos: pos,
    align: "right",
    onClose: close
  }));
}
function MenuRow({
  action,
  onPick
}) {
  const [hover, setHover] = React.useState(false);
  const [foc, setFoc] = React.useState(false);
  const on = (hover || foc) && !action.disabled;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "menuitem",
    disabled: action.disabled,
    tabIndex: -1,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setFoc(true),
    onBlur: () => setFoc(false),
    onClick: e => {
      e.stopPropagation();
      if (!action.disabled) onPick();
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--menu-item-gap)',
      padding: '7px 10px',
      border: 'none',
      borderRadius: 'var(--menu-item-radius)',
      textAlign: 'left',
      width: '100%',
      boxSizing: 'border-box',
      outline: 'none',
      background: on ? 'var(--menu-item-focus-bg)' : 'transparent',
      color: action.disabled ? 'var(--list-item-disabled-fg)' : on ? 'var(--menu-item-focus-fg)' : 'var(--menu-item-fg)',
      cursor: action.disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 'var(--leading-sm)'
    }
  }, action.icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexShrink: 0,
      color: on && !action.disabled ? 'var(--menu-item-focus-fg)' : 'var(--menu-item-icon)'
    }
  }, action.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, action.label));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/LineChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii LineChart — a simple series line over an optional grid + Y axis.
 *
 * `variant`:
 *   - "brand" (default) → primary-blue stroke, 2px (--chart-line-*)
 *   - "base"            → neutral grey stroke, 1.5px (--chart-line-base-*)
 *
 * Data: an array of numbers, or {x,y} / {label,value} objects. X is evenly
 * spaced by index. Optionally shows a previous-close reference line.
 */
const numL = d => typeof d === 'number' ? d : d.y ?? d.value ?? 0;
const lblL = d => d && typeof d === 'object' ? d.label ?? d.x ?? null : null;
function niceTicksL(min, max, count) {
  if (min === max) {
    const p = Math.abs(min) || 1;
    min -= p * 0.1;
    max += p * 0.1;
  }
  const span = max - min,
    step0 = span / count,
    mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag,
    step = (norm >= 5 ? 5 : norm >= 2 ? 2 : norm >= 1 ? 1 : 0.5) * mag;
  const lo = Math.floor(min / step) * step,
    hi = Math.ceil(max / step) * step,
    out = [];
  for (let v = lo; v <= hi + step * 0.5; v += step) out.push(+v.toFixed(6));
  return {
    ticks: out,
    lo,
    hi
  };
}
function LineChart({
  data = [],
  variant = 'brand',
  width = 640,
  height = 260,
  showGrid = true,
  showAxis = true,
  showDot = true,
  xLabels = true,
  prevClose,
  valueFormat,
  padding,
  style,
  ...rest
}) {
  const base = variant === 'base';
  const stroke = base ? 'var(--chart-line-base-stroke)' : 'var(--chart-line-stroke)';
  const strokeW = base ? 'var(--chart-line-width-base)' : 'var(--chart-line-width)';
  const dotColor = base ? 'var(--chart-line-base-dot)' : 'var(--chart-line-dot)';
  const vals = data.map(numL);
  const pad = {
    top: 12,
    right: 14,
    bottom: xLabels ? 28 : 12,
    left: 44,
    ...(padding || {})
  };
  const iw = width - pad.left - pad.right,
    ih = height - pad.top - pad.bottom;
  const fmt = valueFormat || (v => v.toLocaleString(undefined, {
    maximumFractionDigits: 2
  }));
  if (!vals.length) return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width,
      height,
      ...style
    }
  }, rest));
  const domainVals = prevClose != null ? [...vals, prevClose] : vals;
  const {
    ticks,
    lo,
    hi
  } = niceTicksL(Math.min(...domainVals), Math.max(...domainVals), 4);
  const x = i => pad.left + (vals.length === 1 ? iw / 2 : i / (vals.length - 1) * iw);
  const y = v => pad.top + ih - (v - lo) / (hi - lo) * ih;
  const linePts = vals.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const lastI = vals.length - 1;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: `0 0 ${width} ${height}`,
    width: width,
    height: height,
    role: "img",
    style: {
      display: 'block',
      maxWidth: '100%',
      background: 'var(--chart-bg)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), showGrid && ticks.map((t, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: pad.left,
    x2: pad.left + iw,
    y1: y(t),
    y2: y(t),
    stroke: "var(--chart-grid-line)",
    strokeWidth: "var(--chart-grid-line-width)"
  })), showAxis && ticks.map((t, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: pad.left - 8,
    y: y(t),
    textAnchor: "end",
    dominantBaseline: "middle",
    fill: "var(--chart-tick-color)",
    fontSize: "var(--chart-tick-size)"
  }, fmt(t))), prevClose != null && /*#__PURE__*/React.createElement("line", {
    x1: pad.left,
    x2: pad.left + iw,
    y1: y(prevClose),
    y2: y(prevClose),
    stroke: "var(--chart-prevclose-line)",
    strokeWidth: "1",
    strokeDasharray: "4 3"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: linePts,
    fill: "none",
    stroke: stroke,
    strokeWidth: strokeW,
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), showDot && /*#__PURE__*/React.createElement("circle", {
    cx: x(lastI),
    cy: y(vals[lastI]),
    r: "var(--chart-dot-radius)",
    fill: dotColor,
    stroke: "var(--chart-bg)",
    strokeWidth: "1.5"
  }), xLabels && data.map((d, i) => {
    const L = lblL(d);
    if (L == null || data.length > 8 && i % Math.ceil(data.length / 8) !== 0 && i !== lastI) return null;
    return /*#__PURE__*/React.createElement("text", {
      key: i,
      x: x(i),
      y: height - 8,
      textAnchor: "middle",
      fill: "var(--chart-tick-color)",
      fontSize: "var(--chart-tick-size)"
    }, L);
  }));
}
Object.assign(__ds_scope, { LineChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/data/Paginator.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Paginator — page navigation. Circular nav buttons; the current
 * page uses the QM blue selected treatment. Prev/next chevrons + optional
 * page-count report.
 */
function Paginator({
  page = 1,
  pageCount = 1,
  onChange,
  showReport = true,
  maxButtons = 7,
  style,
  ...rest
}) {
  const pages = pageWindow(page, pageCount, maxButtons);
  const go = p => {
    if (p >= 1 && p <= pageCount && p !== page) onChange && onChange(p);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--gap-md)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(NavBtn, {
    disabled: page === 1,
    onClick: () => go(page - 1),
    label: "Previous"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 18l-6-6 6-6"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--gap-sm)'
    }
  }, pages.map((p, i) => p === '…' ? /*#__PURE__*/React.createElement("span", {
    key: 'e' + i,
    style: {
      width: 35,
      height: 35,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)'
    }
  }, "\u2026") : /*#__PURE__*/React.createElement(PageBtn, {
    key: p,
    p: p,
    active: p === page,
    onClick: () => go(p)
  }))), /*#__PURE__*/React.createElement(NavBtn, {
    disabled: page === pageCount,
    onClick: () => go(page + 1),
    label: "Next"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  })), showReport && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'var(--gap-sm)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Page ", page, " of ", pageCount));
}
function PageBtn({
  p,
  active,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: 35,
      height: 35,
      border: 'none',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: active ? 'var(--weight-semibold)' : 'var(--weight-regular)',
      background: active ? 'var(--primary-subtle)' : h ? 'var(--surface-50)' : 'transparent',
      color: active ? 'var(--qm-blue-900)' : 'var(--text-secondary)',
      transition: 'background var(--duration-fast) var(--ease)'
    }
  }, p);
}
function NavBtn({
  children,
  disabled,
  onClick,
  label
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    disabled: disabled,
    "aria-label": label,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      width: 35,
      height: 35,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      background: h && !disabled ? 'var(--surface-50)' : 'transparent',
      color: 'var(--text-muted)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--disabled-opacity)' : 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, children));
}
function pageWindow(page, count, max) {
  if (count <= max) return Array.from({
    length: count
  }, (_, i) => i + 1);
  const out = [1];
  const side = Math.max(1, Math.floor((max - 3) / 2));
  let start = Math.max(2, page - side),
    end = Math.min(count - 1, page + side);
  if (start > 2) out.push('…');
  for (let i = start; i <= end; i++) out.push(i);
  if (end < count - 1) out.push('…');
  out.push(count);
  return out;
}
Object.assign(__ds_scope, { Paginator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Paginator.jsx", error: String((e && e.message) || e) }); }

// components/data/SymbolTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii SymbolTag — a compact, NON-interactive tag pairing a ticker symbol
 * with its delta (value or percent + direction dorito). Use for read-only
 * symbol references in prose, summaries, or watchlist blurbs — it is not a
 * chip: no hover/press/remove affordances, no focus ring, not tabbable.
 *
 * Surface reuses the neutral Tag tokens (--tag-secondary-*); the delta reuses
 * the Change component so up/down colours + dorito stay consistent.
 *
 * - `symbol` — ticker text (bold).
 * - `value` / `percent` / `direction` — passed through to Change (percent
 *   shown by default; set `showValue`/`showPercent` to control which appears).
 * - `size` — 'md' (14px) or 'sm' (12px), matched between symbol and delta.
 */
function SymbolTag({
  symbol,
  value,
  percent,
  direction,
  size = 'md',
  showValue = true,
  showPercent = false,
  coloredText = true,
  style,
  ...rest
}) {
  const font = size === 'sm' ? 'var(--text-sm)' : 'var(--text-base)';
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "text",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--gap-md)',
      background: 'var(--tag-secondary-bg)',
      color: 'var(--tag-secondary-fg)',
      fontFamily: 'var(--font-sans)',
      padding: 'var(--symbol-tag-padding)',
      borderRadius: 'var(--tag-radius)',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      verticalAlign: 'middle',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: font,
      fontWeight: 'var(--weight-bold)',
      letterSpacing: '.01em'
    }
  }, symbol), /*#__PURE__*/React.createElement(__ds_scope.Change, {
    value: showValue ? value : null,
    percent: showPercent ? percent : null,
    direction: direction,
    size: size,
    coloredText: coloredText,
    style: {
      fontWeight: 'var(--weight-semibold)'
    }
  }));
}
Object.assign(__ds_scope, { SymbolTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SymbolTag.jsx", error: String((e && e.message) || e) }); }

// components/data/TimeHorizon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii TimeHorizon — the market-data time-range selector (1D · 5D · 1M …).
 * Ghost segments on a shared row; the active range gets a QM-blue-tinted
 * fill with primary text. 32px tall, 4px radius.
 */
function TimeHorizon({
  ranges = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX'],
  value,
  onChange,
  style,
  ...rest
}) {
  const norm = ranges.map(r => typeof r === 'string' ? {
    label: r,
    value: r
  } : r);
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    style: {
      display: 'inline-flex',
      gap: 'var(--gap-sm)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), norm.map(r => /*#__PURE__*/React.createElement(Seg, {
    key: r.value,
    range: r,
    active: r.value === value,
    onClick: () => onChange && onChange(r.value)
  })));
}
function Seg({
  range,
  active,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      height: 'var(--th-height)',
      minWidth: 34,
      padding: '0 10px',
      borderRadius: 'var(--th-radius)',
      cursor: 'pointer',
      border: `1px solid ${active ? 'var(--th-active-border)' : h ? 'var(--th-hover-border)' : 'var(--th-border)'}`,
      background: active ? 'var(--th-active-bg)' : 'var(--th-bg)',
      color: active ? 'var(--th-active-fg)' : 'var(--th-fg)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: active ? 'var(--weight-semibold)' : 'var(--weight-medium)',
      transition: 'background var(--duration-fast) var(--ease), color var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease)'
    }
  }, range.label);
}
Object.assign(__ds_scope, { TimeHorizon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TimeHorizon.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Chip — 28px filled token with optional icon and remove (×).
 * Used for filters, selected symbols, and tags-in-input.
 */
function Chip({
  label,
  icon,
  removable = false,
  onRemove,
  selected = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--gap-md)',
      height: 28,
      boxSizing: 'border-box',
      padding: '4px 8px',
      borderRadius: 'var(--radius-sm)',
      background: selected ? 'var(--chip-selected-bg)' : 'var(--chip-bg)',
      color: selected ? 'var(--chip-selected-fg)' : 'var(--chip-fg)',
      border: `1px solid ${selected ? 'var(--chip-selected-border)' : hover ? 'var(--chip-hover-border)' : 'var(--chip-border)'}`,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      transition: 'border-color var(--duration-fast) var(--ease)',
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), icon, label, removable && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16,
      height: 16,
      padding: 0,
      marginRight: -2,
      border: 'none',
      borderRadius: 'var(--radius-full)',
      background: 'transparent',
      color: 'var(--text-secondary)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Chip.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Message.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Message — inline callout / alert banner. Tinted background,
 * matching border and text, leading status icon. Optional dismiss and
 * `outlined` (transparent) style.
 */
function Message({
  children,
  severity = 'info',
  outlined = false,
  closable = false,
  onClose,
  style,
  ...rest
}) {
  const map = {
    info: ['var(--message-info-bg)', 'var(--message-info-fg)', 'var(--message-info-border)'],
    success: ['var(--message-success-bg)', 'var(--message-success-fg)', 'var(--message-success-border)'],
    warn: ['var(--message-warn-bg)', 'var(--message-warn-fg)', 'var(--message-warn-border)'],
    error: ['var(--message-error-bg)', 'var(--message-error-fg)', 'var(--message-error-border)'],
    secondary: ['var(--message-secondary-bg)', 'var(--message-secondary-fg)', 'var(--message-secondary-border)'],
    contrast: ['var(--message-contrast-bg)', 'var(--message-contrast-fg)', 'var(--message-contrast-border)']
  };
  const [bg, fg, bc] = map[severity] || map.info;
  const icons = {
    info: 'M12 16v-4M12 8h.01M12 2a10 10 0 100 20 10 10 0 000-20z',
    success: 'M20 6L9 17l-5-5',
    warn: 'M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z',
    error: 'M12 8v4M12 16h.01M12 2a10 10 0 100 20 10 10 0 000-20z',
    secondary: 'M12 16v-4M12 8h.01M12 2a10 10 0 100 20 10 10 0 000-20z',
    contrast: 'M12 16v-4M12 8h.01M12 2a10 10 0 100 20 10 10 0 000-20z'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--gap-md)',
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      background: outlined ? 'transparent' : bg,
      border: `1px solid ${bc}`,
      color: fg,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 'var(--leading-normal)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flexShrink: 0,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: icons[severity],
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: outlined || severity === 'contrast' ? fg : 'var(--text-primary)'
    }
  }, children), closable && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      display: 'inline-flex',
      border: 'none',
      background: 'transparent',
      color: fg,
      cursor: 'pointer',
      padding: 2,
      marginTop: -1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { Message });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Message.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Tag — compact status/label pill. 12px bold text, 2px radius
 * (or rounded). Includes market buy/sell severities used across quote UIs.
 */
function Tag({
  children,
  severity = 'secondary',
  rounded = false,
  icon,
  style,
  ...rest
}) {
  const map = {
    primary: ['var(--tag-primary-bg)', 'var(--tag-primary-fg)'],
    secondary: ['var(--tag-secondary-bg)', 'var(--tag-secondary-fg)'],
    success: ['var(--tag-success-bg)', 'var(--tag-success-fg)'],
    info: ['var(--tag-info-bg)', 'var(--tag-info-fg)'],
    warn: ['var(--tag-warn-bg)', 'var(--tag-warn-fg)'],
    danger: ['var(--tag-danger-bg)', 'var(--tag-danger-fg)'],
    contrast: ['var(--tag-contrast-bg)', 'var(--tag-contrast-fg)'],
    buy: ['var(--tag-buy-bg)', 'var(--tag-buy-fg)'],
    sell: ['var(--tag-sell-bg)', 'var(--tag-sell-fg)'],
    call: ['var(--tag-call-bg)', 'var(--tag-call-fg)'],
    put: ['var(--tag-put-bg)', 'var(--tag-put-fg)']
  };
  const [bg, fg] = map[severity] || map.secondary;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--gap-sm)',
      background: bg,
      color: fg,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--tag-font-size)',
      fontWeight: 'var(--tag-font-weight)',
      lineHeight: 1,
      padding: 'var(--tag-padding)',
      borderRadius: rounded ? 'var(--tag-radius-rounded)' : 'var(--tag-radius)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Tooltip — hover / focus hint, modelled on PrimeVue's Tooltip. Wraps a
 * single anchor element and shows a dark bubble with a small arrow on one of
 * four sides. Styling comes from the --tooltip-* tokens.
 */
const POS = {
  top: {
    bubble: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 'var(--tooltip-gutter)'
    },
    arrow: {
      top: '100%',
      left: '50%',
      marginLeft: 'calc(var(--tooltip-arrow-size) * -1)',
      borderWidth: 'var(--tooltip-arrow-size) var(--tooltip-arrow-size) 0 var(--tooltip-arrow-size)',
      borderColor: 'var(--tooltip-bg) transparent transparent transparent'
    }
  },
  bottom: {
    bubble: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 'var(--tooltip-gutter)'
    },
    arrow: {
      bottom: '100%',
      left: '50%',
      marginLeft: 'calc(var(--tooltip-arrow-size) * -1)',
      borderWidth: '0 var(--tooltip-arrow-size) var(--tooltip-arrow-size) var(--tooltip-arrow-size)',
      borderColor: 'transparent transparent var(--tooltip-bg) transparent'
    }
  },
  left: {
    bubble: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 'var(--tooltip-gutter)'
    },
    arrow: {
      left: '100%',
      top: '50%',
      marginTop: 'calc(var(--tooltip-arrow-size) * -1)',
      borderWidth: 'var(--tooltip-arrow-size) 0 var(--tooltip-arrow-size) var(--tooltip-arrow-size)',
      borderColor: 'transparent transparent transparent var(--tooltip-bg)'
    }
  },
  right: {
    bubble: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 'var(--tooltip-gutter)'
    },
    arrow: {
      right: '100%',
      top: '50%',
      marginTop: 'calc(var(--tooltip-arrow-size) * -1)',
      borderWidth: 'var(--tooltip-arrow-size) var(--tooltip-arrow-size) var(--tooltip-arrow-size) 0',
      borderColor: 'transparent var(--tooltip-bg) transparent transparent'
    }
  }
};
function Tooltip({
  content,
  position = 'top',
  showDelay = 150,
  hideDelay = 0,
  disabled = false,
  children,
  style,
  ...rest
}) {
  const [show, setShow] = React.useState(false);
  const timer = React.useRef(0);
  const p = POS[position] || POS.top;
  const open = () => {
    clearTimeout(timer.current);
    if (!disabled && content) timer.current = setTimeout(() => setShow(true), showDelay);
  };
  const close = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), hideDelay);
  };
  React.useEffect(() => () => clearTimeout(timer.current), []);
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: open,
    onMouseLeave: close,
    onFocus: open,
    onBlur: close,
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, rest), children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 70,
      ...p.bubble,
      background: 'var(--tooltip-bg)',
      color: 'var(--tooltip-fg)',
      padding: 'var(--tooltip-padding-y) var(--tooltip-padding-x)',
      borderRadius: 'var(--tooltip-radius)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--tooltip-font-size)',
      lineHeight: 1.4,
      fontWeight: 'var(--weight-regular)',
      maxWidth: 'var(--tooltip-max-width)',
      width: 'max-content',
      textAlign: 'left',
      boxShadow: 'var(--tooltip-shadow)',
      pointerEvents: 'none'
    }
  }, content, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      ...p.arrow
    }
  })));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Button — PrimeReact/Aura-derived, QM blue primary.
 * Variants: filled (default) · outlined · text · link
 * Severities: primary · secondary · negative · plain
 * Sizes: sm · md (default) · lg. Supports icon-only and rounded.
 */
function Button({
  children,
  variant = 'filled',
  severity = 'primary',
  size = 'md',
  rounded = false,
  iconOnly = false,
  leftIcon,
  rightIcon,
  disabled = false,
  type = 'button',
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      h: 28,
      px: 8.75,
      py: 5,
      font: 12.25,
      lh: 16,
      iconW: 28
    },
    md: {
      h: 32,
      px: 8,
      py: 5,
      font: 14,
      lh: 20,
      iconW: 35
    },
    lg: {
      h: 38,
      px: 12.25,
      py: 6,
      font: 15.75,
      lh: 24,
      iconW: 42
    }
  };
  const s = sizes[size] || sizes.md;

  // [bg, fg, border, hoverBg, hoverBorder, activeBg]
  const filled = {
    primary: ['var(--btn-primary-bg)', 'var(--btn-primary-fg)', 'var(--btn-primary-bg)', 'var(--btn-primary-hover-bg)', 'var(--btn-primary-hover-bg)', 'var(--btn-primary-active-bg)'],
    secondary: ['var(--btn-secondary-bg)', 'var(--btn-secondary-fg)', 'var(--btn-secondary-bg)', 'var(--btn-secondary-hover-bg)', 'var(--btn-secondary-hover-bg)', 'var(--btn-secondary-active-bg)'],
    negative: ['var(--btn-negative-bg)', 'var(--btn-negative-fg)', 'var(--btn-negative-bg)', 'var(--btn-negative-hover-bg)', 'var(--btn-negative-hover-bg)', 'var(--btn-negative-active-bg)'],
    plain: ['var(--surface-800)', '#fff', 'var(--surface-800)', 'var(--surface-700)', 'var(--surface-700)', 'var(--surface-900)']
  };
  const outlined = {
    primary: ['transparent', 'var(--primary)', 'var(--qm-blue-200)', 'var(--qm-blue-50)', 'var(--qm-blue-200)', 'var(--qm-blue-100)'],
    secondary: ['transparent', 'var(--text-primary)', 'var(--surface-200)', 'var(--surface-50)', 'var(--surface-200)', 'var(--surface-100)'],
    negative: ['transparent', 'var(--red-600)', 'var(--red-300)', 'var(--red-50)', 'var(--red-300)', 'var(--red-100)'],
    plain: ['transparent', 'var(--text-primary)', 'var(--surface-200)', 'var(--surface-50)', 'var(--surface-200)', 'var(--surface-100)']
  };
  const text = {
    primary: ['transparent', 'var(--primary)', 'transparent', 'var(--qm-blue-50)', 'transparent', 'var(--qm-blue-100)'],
    secondary: ['transparent', 'var(--text-primary)', 'transparent', 'var(--surface-50)', 'transparent', 'var(--surface-100)'],
    negative: ['transparent', 'var(--red-600)', 'transparent', 'var(--red-50)', 'transparent', 'var(--red-100)'],
    plain: ['transparent', 'var(--text-secondary)', 'transparent', 'var(--surface-50)', 'transparent', 'var(--surface-100)']
  };
  const surface = {
    primary: ['var(--btn-surface-primary-bg)', 'var(--btn-surface-primary-fg)', 'var(--btn-surface-primary-border)', 'var(--btn-surface-primary-bg)', 'var(--btn-surface-primary-hover-border)', 'var(--btn-surface-primary-active-bg)'],
    secondary: ['var(--btn-surface-secondary-bg)', 'var(--btn-surface-secondary-fg)', 'var(--btn-surface-secondary-border)', 'var(--btn-surface-secondary-bg)', 'var(--btn-surface-secondary-border)', 'var(--btn-surface-secondary-active-bg)'],
    negative: ['var(--btn-surface-negative-bg)', 'var(--btn-surface-negative-fg)', 'var(--btn-surface-negative-border)', 'var(--btn-surface-negative-hover-bg)', 'var(--btn-surface-negative-border)', 'var(--btn-surface-negative-hover-bg)'],
    plain: ['var(--surface-50)', 'var(--text-primary)', 'var(--surface-200)', 'var(--surface-50)', 'var(--surface-200)', 'var(--surface-100)']
  };
  const table = variant === 'outlined' ? outlined : variant === 'surface' ? surface : variant === 'text' || variant === 'link' ? text : filled;
  const [bg, fg, bc, hbg, hbc, abg] = table[severity] || table.primary;
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [focusRing, setFocusRing] = React.useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--gap-md)',
    fontFamily: 'var(--font-sans)',
    fontSize: s.font,
    fontWeight: 'var(--weight-medium)',
    lineHeight: `${s.lh}px`,
    height: s.h,
    padding: iconOnly ? 0 : `${s.py}px ${s.px}px`,
    width: iconOnly ? s.iconW : undefined,
    border: `1px solid ${active ? variant === 'filled' ? abg : bc : hover ? hbc : bc}`,
    borderRadius: rounded ? 'var(--radius-full)' : 'var(--btn-radius)',
    background: active ? abg : hover ? hbg : bg,
    color: fg,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--disabled-opacity)' : 1,
    textDecoration: variant === 'link' && hover ? 'underline' : 'none',
    whiteSpace: 'nowrap',
    transition: 'background var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease), box-shadow var(--duration-fast) var(--ease)',
    outline: 'none',
    boxShadow: focusRing ? 'var(--focus-ring)' : 'none',
    boxSizing: 'border-box',
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    onFocus: e => {
      try {
        setFocusRing(e.target.matches(':focus-visible'));
      } catch (_) {
        setFocusRing(true);
      }
    },
    onBlur: () => setFocusRing(false)
  }, rest), leftIcon, !iconOnly && children, iconOnly && children, rightIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Checkbox — 17.5px box, 4px radius. Checked = QM blue fill with
 * white check. Optional label. Sizes sm/md/lg.
 */
function Checkbox({
  checked = false,
  onChange,
  label,
  size = 'md',
  disabled = false,
  invalid = false,
  style,
  ...rest
}) {
  const dim = {
    sm: 14,
    md: 17.5,
    lg: 21
  }[size] || 17.5;
  const icon = {
    sm: 10.5,
    md: 12.25,
    lg: 14
  }[size] || 12.25;
  const [hover, setHover] = React.useState(false);
  const [focusRing, setFocusRing] = React.useState(false);
  const border = disabled ? 'var(--check-border)' : invalid ? 'var(--check-invalid-border)' : checked ? 'var(--check-checked-border)' : hover ? 'var(--check-hover-border)' : 'var(--check-border)';
  const box = {
    width: dim,
    height: dim,
    flexShrink: 0,
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${checked && !disabled ? 'var(--check-checked-border)' : border}`,
    borderRadius: 'var(--check-radius)',
    background: checked && !disabled ? 'var(--check-checked-bg)' : 'var(--check-bg)',
    boxShadow: focusRing ? 'var(--focus-ring)' : 'none',
    transition: 'background var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease), box-shadow var(--duration-fast) var(--ease)'
  };
  const wrap = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--gap-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--disabled-opacity)' : 1,
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    color: 'var(--text-primary)',
    userSelect: 'none',
    ...style
  };
  return /*#__PURE__*/React.createElement("label", {
    style: wrap,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    onFocus: e => {
      try {
        setFocusRing(e.target.matches(':focus-visible'));
      } catch (_) {
        setFocusRing(true);
      }
    },
    onBlur: () => setFocusRing(false),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: box
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: icon,
    height: icon,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5",
    stroke: "#fff",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/DatePicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii DatePicker — single-date field with a calendar overlay, modelled on
 * PrimeVue's DatePicker. Field matches InputText (form-field tokens); the
 * overlay uses --datepicker-* tokens.
 *
 * A calendar icon shows by default: `iconDisplay="input"` (inside the field,
 * default) or `"button"` (a trailing button). Pass a custom `icon` node to
 * replace the glyph. Supports `label` + `helperText`, `minDate`/`maxDate`,
 * sizes, invalid/disabled, and keyboard navigation in the calendar.
 */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DP_SIZES = {
  sm: {
    h: 28,
    px: 10,
    font: 14
  },
  md: {
    h: 32,
    px: 8,
    font: 14
  },
  lg: {
    h: 38,
    px: 14,
    font: 18
  }
};
const CalendarIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "4",
  width: "18",
  height: "17",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 9h18M8 2v4M16 2v4"
}));
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const dayKey = d => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const clampDay = (d, min, max) => min && d < stripTime(min) || max && d > stripTime(max);
const stripTime = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const pad = n => String(n).padStart(2, '0');
const defaultFormat = d => `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
function DatePicker({
  value,
  onChange,
  placeholder = 'mm/dd/yyyy',
  showIcon = true,
  iconDisplay = 'input',
  icon,
  minDate,
  maxDate,
  formatDate = defaultFormat,
  size = 'md',
  invalid = false,
  disabled = false,
  fullWidth = false,
  label,
  helperText,
  helperTone = 'neutral',
  id,
  style,
  ...rest
}) {
  const s = DP_SIZES[size] || DP_SIZES.md;
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [focusRing, setFocusRing] = React.useState(false);
  const [view, setView] = React.useState(() => stripTime(value || new Date()));
  const [focusDate, setFocusDate] = React.useState(() => stripTime(value || new Date()));
  const rootRef = React.useRef(null);
  const gridRef = React.useRef(null);
  const dayRefs = React.useRef({});
  const rid = React.useId();
  const inputId = id || rid;
  React.useEffect(() => {
    if (!open) return;
    const h = e => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const openPanel = () => {
    if (disabled) return;
    setView(stripTime(value || new Date()));
    setFocusDate(stripTime(value || new Date()));
    setOpen(true);
  };
  const pick = d => {
    if (clampDay(d, minDate, maxDate)) return;
    onChange && onChange(d);
    setOpen(false);
  };
  const border = disabled ? 'var(--form-field-border-color)' : invalid ? 'var(--form-field-invalid-border)' : open ? 'var(--form-field-focus-border)' : hover ? 'var(--form-field-hover-border)' : 'var(--form-field-border-color)';

  // build 6×7 grid starting on the Sunday on/before the 1st
  const monthStart = new Date(view.getFullYear(), view.getMonth(), 1);
  const gridStart = new Date(monthStart);
  gridStart.setDate(1 - monthStart.getDay());
  const cells = Array.from({
    length: 42
  }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });
  const moveFocus = days => {
    const next = new Date(focusDate);
    next.setDate(next.getDate() + days);
    setFocusDate(next);
    if (next.getMonth() !== view.getMonth() || next.getFullYear() !== view.getFullYear()) setView(stripTime(next));
    requestAnimationFrame(() => {
      const el = dayRefs.current[dayKey(next)];
      if (el) el.focus();
    });
  };
  const onGridKey = e => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveFocus(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveFocus(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveFocus(-7);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveFocus(7);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(stripTime(focusDate));
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
  };
  const tone = invalid && helperTone === 'neutral' ? 'error' : helperTone;
  const helperColor = tone === 'error' ? 'var(--form-helper-error)' : tone === 'positive' ? 'var(--form-helper-positive)' : 'var(--form-helper-neutral)';
  const asButton = showIcon && iconDisplay === 'button';
  const display = value ? formatDate(value) : '';
  const fieldWrap = {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    height: s.h,
    boxSizing: 'border-box',
    background: 'var(--form-field-bg)',
    border: `1px solid ${border}`,
    borderRadius: 'var(--radius-sm)',
    padding: asButton ? '0 0 0 ' + s.px + 'px' : `0 ${s.px}px`,
    gap: 'var(--gap-md)',
    overflow: 'hidden',
    opacity: disabled ? 'var(--disabled-opacity)' : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    boxShadow: focusRing ? 'var(--focus-ring)' : 'none',
    transition: 'border-color var(--duration-fast) var(--ease), box-shadow var(--duration-fast) var(--ease)'
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    style: {
      position: 'relative',
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 'var(--form-label-gap)',
      width: fullWidth ? '100%' : 240,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--form-label-size)',
      fontWeight: 'var(--form-label-weight)',
      color: 'var(--form-label-color)',
      lineHeight: 1.2
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: fieldWrap,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: asButton ? undefined : openPanel
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: "text",
    readOnly: true,
    value: display,
    placeholder: placeholder,
    disabled: disabled,
    "aria-invalid": invalid || undefined,
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    onFocus: e => {
      try {
        setFocusRing(e.target.matches(':focus-visible'));
      } catch (_) {
        setFocusRing(true);
      }
    },
    onBlur: () => setFocusRing(false),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault();
        openPanel();
      }
    },
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: s.font,
      color: 'var(--form-field-color)',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, rest)), showIcon && (asButton ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    "aria-label": "Open calendar",
    onClick: e => {
      e.stopPropagation();
      setOpen(o => !o);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: s.h,
      height: '100%',
      flexShrink: 0,
      border: 'none',
      borderLeft: '1px solid var(--datepicker-button-border)',
      background: 'var(--datepicker-button-bg)',
      color: 'var(--datepicker-icon-color)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none'
    }
  }, icon || /*#__PURE__*/React.createElement(CalendarIcon, null)) : /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexShrink: 0,
      color: 'var(--datepicker-icon-color)',
      pointerEvents: 'none'
    }
  }, icon || /*#__PURE__*/React.createElement(CalendarIcon, null)))), helperText && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--form-helper-size)',
      lineHeight: 1.3,
      color: helperColor
    }
  }, helperText), open && /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "Choose date",
    style: {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: 0,
      zIndex: 60,
      width: 252,
      background: 'var(--datepicker-overlay-bg)',
      border: '1px solid var(--datepicker-overlay-border)',
      borderRadius: 'var(--datepicker-overlay-radius)',
      boxShadow: 'var(--datepicker-overlay-shadow)',
      padding: 'var(--datepicker-overlay-padding)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(NavBtn, {
    dir: -1,
    onClick: () => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--datepicker-header-fg)'
    }
  }, MONTHS[view.getMonth()], " ", view.getFullYear()), /*#__PURE__*/React.createElement(NavBtn, {
    dir: 1,
    onClick: () => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)'
    }
  }, WEEKDAYS.map(w => /*#__PURE__*/React.createElement("div", {
    key: w,
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--datepicker-weekday-fg)',
      padding: '4px 0'
    }
  }, w))), /*#__PURE__*/React.createElement("div", {
    ref: gridRef,
    role: "grid",
    onKeyDown: onGridKey,
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)'
    }
  }, cells.map(d => {
    const inMonth = d.getMonth() === view.getMonth();
    const selected = sameDay(d, value);
    const today = sameDay(d, new Date());
    const disabledDay = clampDay(d, minDate, maxDate);
    const isFocus = sameDay(d, focusDate);
    return /*#__PURE__*/React.createElement(DayCell, {
      key: dayKey(d),
      innerRef: el => {
        if (el) dayRefs.current[dayKey(d)] = el;
      },
      day: d.getDate(),
      inMonth: inMonth,
      selected: selected,
      today: today,
      disabled: disabledDay,
      tabIndex: isFocus ? 0 : -1,
      onClick: () => pick(stripTime(d))
    });
  }))));
}
function NavBtn({
  dir,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": dir < 0 ? 'Previous month' : 'Next month',
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      background: hover ? 'var(--datepicker-nav-hover-bg)' : 'transparent',
      color: 'var(--datepicker-nav-fg)',
      cursor: 'pointer',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      transform: dir < 0 ? 'none' : 'rotate(180deg)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 18l-6-6 6-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
function DayCell({
  day,
  inMonth,
  selected,
  today,
  disabled,
  tabIndex,
  onClick,
  innerRef
}) {
  const [hover, setHover] = React.useState(false);
  const color = disabled ? 'var(--datepicker-day-disabled-fg)' : selected ? 'var(--datepicker-day-selected-fg)' : inMonth ? 'var(--datepicker-day-fg)' : 'var(--datepicker-day-muted-fg)';
  const bg = selected ? 'var(--datepicker-day-selected-bg)' : hover && !disabled ? 'var(--datepicker-day-hover-bg)' : 'transparent';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 1,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    ref: innerRef,
    type: "button",
    role: "gridcell",
    "aria-selected": selected,
    disabled: disabled,
    tabIndex: tabIndex,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 'var(--datepicker-cell-size)',
      height: 'var(--datepicker-cell-size)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: today && !selected ? '1px solid var(--datepicker-day-today-border)' : '1px solid transparent',
      borderRadius: 'var(--datepicker-day-radius)',
      background: bg,
      color,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: selected ? 'var(--weight-semibold)' : 'var(--weight-regular)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      padding: 0
    }
  }, day));
}
Object.assign(__ds_scope, { DatePicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DatePicker.jsx", error: String((e && e.message) || e) }); }

// components/forms/FacetedMultiSelect.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii FacetedMultiSelect — multi-select across grouped categories (filing
 * types, sectors, screener criteria). Desktop = two-column miller dropdown with
 * a full-width cross-category search; touch = drill-down bottom sheet; pointer
 * narrow = anchored drill-down; optional expanding-sections (accordion) mode.
 *
 * Inherits the design system tokens (surfaces, primary, radius, shadow, sans
 * type — no mono). Retheme via the --qmodii-multiselect-* variables defined in
 * the DS token layer (tokens/components.css).
 *
 * Built-in datasets: "filings", "sectors", "screener". Provide a custom
 * `categories` array (+ `label`) to define your own faceted dataset.
 * Selection ids are "<categoryId>:<code>"; onChange receives the id array.
 */
const QM_CSS = "/* ==========================================================================\n   quotemedia-styles.css\n   Shared design tokens + base primitives for the QuoteMedia prototyping lab.\n   The filing-type filter (and future components) build on these.\n   ========================================================================== */\n\n:root {\n  /* ==========================================================================\n     QMODII theme — values extracted live from the QMODII Storybook\n     (login story). These remap the prototype's --qm-* primitives onto\n     QuoteMedia's QMODII (PrimeVue-based) component tokens so the filter\n     components read as native QMODII.\n     ========================================================================== */\n\n  /* --- Color: QMODII light surfaces + brand azure ----------------------- */\n  --qm-ground:        var(--surface-50);  /* surface/50 — page ground            */\n  --qm-surface:       var(--surface-0);  /* content background — cards/panels   */\n  --qm-surface-sunk:  var(--surface-50);  /* content hover background / surface/100 */\n  --qm-surface-filled:var(--surface-50);  /* filled input background             */\n  --qm-text:          var(--text-primary);  /* text/color                          */\n  --qm-text-muted:    var(--text-secondary);  /* text/muted + placeholder            */\n  --qm-text-faint:    var(--text-muted);  /* faint / disabled / icon hints       */\n  --qm-border:        var(--surface-200);  /* content border, dividers (surface/200) */\n  --qm-border-strong: var(--surface-300);  /* form-field border (surface/300)     */\n\n  --qm-accent:        var(--primary);  /* primary/500 — QMODII brand blue     */\n  --qm-accent-press:  var(--primary-hover);  /* primary/600 — hover / press         */\n  --qm-accent-deep:   var(--qm-blue-900);  /* primary/700 — selected option text  */\n  --qm-accent-weak:   var(--primary-subtle);  /* primary/50 — selected option fill   */\n  --qm-accent-weaker: var(--qm-blue-200);  /* primary/100                         */\n  --qm-scrim:         var(--mask-bg);\n\n  /* --- Type: Roboto (QMODII), tabular mono kept for filing codes -------- */\n  --qm-font-ui: var(--font-sans);\n  /* Filing codes & counts read as market-data symbols → tabular mono. */\n  --qm-font-mono: \"Roboto Mono\", ui-monospace, \"SF Mono\", \"Menlo\",\n                  \"Consolas\", monospace;\n\n  --qm-fs-xs: 11px;\n  --qm-fs-sm: 12px;\n  --qm-fs-md: 14px;   /* QMODII base font size */\n  --qm-fs-lg: 16px;\n  --qm-fs-xl: 18px;\n\n  /* --- Spacing scale ----------------------------------------------------- */\n  --qm-s1: 4px;\n  --qm-s2: 8px;\n  --qm-s3: 12px;\n  --qm-s4: 16px;\n  --qm-s5: 20px;\n  --qm-s6: 24px;\n\n  /* --- Radius / elevation ------------------------------------------------ */\n  /* QMODII is square: 4px controls AND overlays (verified on the real\n     screeners' p-select / p-multiselect panels), larger only for the sheet. */\n  --qm-radius-sm: var(--radius-sm);\n  --qm-radius-md: var(--radius-sm);\n  --qm-radius-lg: 12px;\n  --qm-shadow-1: var(--shadow-xs);\n  /* QMODII overlay / popover shadow */\n  --qm-shadow-pop: var(--shadow-overlay);\n  --qm-shadow-sheet: 0 -8px 28px rgba(0, 0, 0, 0.20);\n\n  /* --- Breakpoint -------------------------------------------------------- */\n  --qm-bp-mobile: 768px;\n}\n\n/* ==========================================================================\n   Cross-category multiselect — COMPONENT TOKENS\n   QMODII-style component-scoped names (--qmodii-multiselect-*), each aliasing\n   a --qm-* semantic primitive. Retheme the multiselect (faceted filter) by\n   overriding these in one place; they cascade to the chip, panel, category\n   rail, option rows, checkbox, footer and search. (Buttons use the shared\n   .qm-btn primitive and stay on the global accent.)\n   ========================================================================== */\n/* --qmodii-multiselect-* tokens live in the design system (tokens/components.css). */\n\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\nhtml,\nbody {\n  margin: 0;\n  padding: 0;\n}\n\n/* the hidden attribute must win over component display rules\n   (e.g. .qm-icon-btn { display: inline-flex }) */\n[hidden] { display: none !important; }\n\nbody {\n  font-family: var(--qm-font-ui);\n  font-size: var(--qm-fs-md);\n  line-height: 1.45;\n  color: var(--qm-text);\n  background: var(--qm-ground);\n  -webkit-font-smoothing: antialiased;\n  text-rendering: optimizeLegibility;\n}\n\n/* --- Buttons -------------------------------------------------------------- */\n.qm-btn {\n  appearance: none;\n  font-family: var(--qm-font-ui);\n  font-size: var(--qm-fs-md);\n  font-weight: 500;\n  line-height: 1;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--qm-s2);\n  padding: 8px 12px;\n  min-height: 32px;\n  border: 1px solid transparent;\n  border-radius: var(--qm-radius-sm);\n  cursor: pointer;\n  background: transparent;\n  color: var(--qm-text);\n  transition: background-color 120ms ease, border-color 120ms ease,\n              color 120ms ease;\n}\n\n.qm-btn--primary {\n  background: var(--qm-accent);\n  color: #fff;\n}\n.qm-btn--primary:hover:not(:disabled) { background: var(--qm-accent-press); }\n\n.qm-btn--ghost {\n  color: var(--qm-text-muted);\n  border-color: transparent;\n}\n.qm-btn--ghost:hover:not(:disabled) {\n  background: var(--qm-surface-sunk);\n  color: var(--qm-text);\n}\n\n.qm-btn--outline {\n  border-color: var(--qm-border-strong);\n  background: var(--qm-surface);\n  color: var(--qm-text);\n}\n.qm-btn--outline:hover:not(:disabled) { background: var(--qm-surface-sunk); }\n\n.qm-btn:disabled {\n  cursor: not-allowed;\n  opacity: 0.45;\n}\n\n/* Visible keyboard focus everywhere. */\n.qm-btn:focus-visible,\n.qm-icon-btn:focus-visible,\n.qm-search input:focus-visible,\n[data-row]:focus-visible {\n  outline: 2px solid var(--qm-accent);\n  outline-offset: 2px;\n}\n\n/* --- Icon button ---------------------------------------------------------- */\n.qm-icon-btn {\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  border: none;\n  border-radius: var(--qm-radius-sm);\n  background: transparent;\n  color: var(--qm-text-muted);\n  cursor: pointer;\n  transition: background-color 120ms ease, color 120ms ease;\n}\n.qm-icon-btn:hover {\n  background: var(--qm-surface-sunk);\n  color: var(--qm-text);\n}\n\n/* --- Search field --------------------------------------------------------- */\n.qm-search {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.qm-search svg {\n  position: absolute;\n  left: 12px;\n  width: 16px;\n  height: 16px;\n  color: var(--qm-text-faint);\n  pointer-events: none;\n}\n.qm-search input {\n  width: 100%;\n  font-family: var(--qm-font-ui);\n  font-size: var(--qm-fs-md);\n  color: var(--qm-text);\n  padding: 8px 12px 8px 34px;\n  min-height: 34px;\n  border: 1px solid var(--qm-border-strong);\n  border-radius: var(--qm-radius-sm);\n  background: var(--qm-surface);\n}\n.qm-search input::placeholder { color: var(--qm-text-faint); }\n.qm-search input:focus { outline: none; border-color: var(--qm-accent); }\n\n/* --- Custom checkbox glyph ------------------------------------------------ */\n.qm-check {\n  flex: 0 0 auto;\n  position: relative;\n  width: var(--qmodii-multiselect-checkbox-size);\n  height: var(--qmodii-multiselect-checkbox-size);\n  border: var(--qmodii-multiselect-checkbox-border-width) solid var(--qmodii-multiselect-checkbox-border-color);\n  border-radius: var(--qmodii-multiselect-checkbox-border-radius);\n  background: var(--qmodii-multiselect-background);\n  transition: background-color 100ms ease, border-color 100ms ease;\n}\n.qm-check::after {\n  /* checkmark */\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  opacity: 0;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 6.2l2.6 2.6L10 3.2' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: center;\n}\n[data-checked=\"true\"] .qm-check {\n  background: var(--qmodii-multiselect-checkbox-checked-background);\n  border-color: var(--qmodii-multiselect-checkbox-checked-border-color);\n}\n[data-checked=\"true\"] .qm-check::after { opacity: 1; }\n\n[data-checked=\"mixed\"] .qm-check {\n  background: var(--qmodii-multiselect-checkbox-checked-background);\n  border-color: var(--qmodii-multiselect-checkbox-checked-border-color);\n}\n[data-checked=\"mixed\"] .qm-check::after {\n  opacity: 1;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 6h7' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E\");\n}\n\n/* Screen-reader-only utility. */\n.qm-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n/* ==========================================================================\n   filing-filter.css\n   Responsive filing-type filter: desktop dropdown (miller columns) +\n   touch bottom-sheet drill-down. One selection state, two presentations.\n   ========================================================================== */\n\n/* Host wrapper just anchors the desktop dropdown to the trigger. */\n.qm-filter {\n  position: relative;\n  display: inline-block;\n}\n\n/* ---- Trigger chip -------------------------------------------------------\n   States: empty (label + chevron), single (selected value + clear),\n   multi (label + count badge + clear). */\n.qm-chip {\n  display: inline-flex;\n  align-items: stretch;\n  border: 1px solid var(--qmodii-multiselect-border-color);\n  border-radius: var(--qmodii-multiselect-border-radius);\n  background: var(--qmodii-multiselect-background);\n  overflow: hidden;\n  transition: border-color 120ms ease, background-color 120ms ease;\n}\n.qm-chip__main {\n  appearance: none;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: var(--qmodii-multiselect-padding);\n  height: var(--qmodii-multiselect-min-height);\n  box-sizing: border-box;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n  font-family: var(--qm-font-ui);\n  font-size: var(--qm-fs-md);\n  font-weight: var(--qmodii-multiselect-label-font-weight);\n  color: var(--qmodii-multiselect-color);\n}\n.qm-chip[data-state=\"empty\"] .qm-chip__text { color: var(--qmodii-multiselect-placeholder-color); }\n.qm-chip__text {\n  white-space: nowrap;\n  max-width: 220px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.qm-chip__chev {\n  width: 14px;\n  height: 14px;\n  color: var(--qmodii-multiselect-dropdown-color);\n  transition: transform 160ms ease;\n}\n.qm-chip__main[aria-expanded=\"true\"] .qm-chip__chev { transform: rotate(180deg); }\n\n/* The blue count badge stays hidden in the resting/static state and reveals\n   on hover or keyboard focus. The chevron is always shown as the dropdown\n   affordance. */\n.qm-chip__badge {\n  display: none;\n  align-items: center;\n  justify-content: center;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  border-radius: 999px;\n  background: var(--qmodii-multiselect-badge-background);\n  color: var(--qmodii-multiselect-badge-color);\n  font-family: var(--qm-font-ui);\n  font-size: var(--qm-fs-xs);\n  font-weight: 700;\n  font-variant-numeric: tabular-nums;\n}\n/* Neutral trigger ⇒ the badge is the only active cue, so show it whenever\n   there's a multi selection (not just on hover), matching how QMODII keeps the\n   selection visible in a filled multiselect. */\n.qm-chip[data-state=\"multi\"] .qm-chip__badge {\n  display: inline-flex;\n}\n\n/* QMODII keeps a filled select / multiselect trigger NEUTRAL — the selected\n   value (or the blue count badge) carries the state, not a blue tint. */\n.qm-chip[data-state=\"single\"],\n.qm-chip[data-state=\"multi\"] {\n  border-color: var(--qmodii-multiselect-border-color);\n  background: var(--qmodii-multiselect-background);\n}\n.qm-chip[data-state=\"single\"] .qm-chip__main,\n.qm-chip[data-state=\"multi\"] .qm-chip__main { color: var(--qmodii-multiselect-color); }\n\n.qm-chip:hover { border-color: var(--qmodii-multiselect-hover-border-color); }\n/* open shows the focus BORDER (like the Select field), but the ring only\n   appears for keyboard focus (:focus-visible) — not on mouse click. */\n.qm-chip:has(.qm-chip__main[aria-expanded=\"true\"]) {\n  border-color: var(--qmodii-multiselect-focus-border-color);\n}\n.qm-chip:has(.qm-chip__main:focus-visible) {\n  border-color: var(--qmodii-multiselect-focus-border-color);\n  box-shadow: var(--focus-ring);\n}\n.qm-chip__main:focus-visible { outline: none; }\n\n/* The scrim/backdrop. Used as a click-to-dismiss target + dim layer.\n   On desktop it's invisible (just captures outside clicks); on mobile it\n   dims the page behind the sheet. */\n.qm-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: transparent;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 200ms ease-in, background-color 200ms ease-in;\n}\n.qm-overlay[data-open=\"true\"] {\n  pointer-events: auto;\n  opacity: 1;\n}\n\n/* The panel itself. Default (desktop) = anchored popover. */\n.qm-panel {\n  position: absolute;\n  z-index: 1001;\n  display: flex;\n  flex-direction: column;\n  background: var(--qmodii-multiselect-overlay-background);\n  border: 1px solid var(--qmodii-multiselect-overlay-border-color);\n  border-radius: var(--qmodii-multiselect-overlay-border-radius);\n  box-shadow: var(--qmodii-multiselect-overlay-shadow);\n  overflow: hidden;\n  width: 560px;\n  max-width: calc(100vw - 24px);\n  height: 440px;\n  /* anchored under the trigger via inline top/left from JS */\n  transform-origin: top left;\n  opacity: 0;\n  transform: translateY(-6px) scale(0.98);\n  transition: opacity 140ms ease-out, transform 140ms ease-out;\n}\n.qm-panel[data-open=\"true\"] {\n  opacity: 1;\n  transform: translateY(0) scale(1);\n}\n\n/* ===========================================================================\n   DESKTOP — two-column miller layout (>= 768px)\n   =========================================================================== */\n.qm-miller { display: none; }\n.qm-sheet-view { display: none; }\n.qm-dsearch { display: none; } /* full-width search bar — desktop (miller) only */\n\n@media (min-width: 768px) {\n  .qm-miller {\n    display: grid;\n    grid-template-columns: 200px 1fr;\n    grid-template-rows: 1fr auto;\n    flex: 1 1 auto;\n    min-height: 0;\n  }\n\n  /* Left rail: categories */\n  .qm-cats {\n    grid-row: 1;\n    grid-column: 1;\n    border-right: 1px solid var(--qmodii-multiselect-overlay-border-color);\n    overflow-y: auto;\n    padding: var(--qm-s2);\n    background: var(--qmodii-multiselect-rail-background);\n  }\n  .qm-cat {\n    position: relative;\n    display: flex;\n    align-items: center;\n    gap: var(--qm-s2);\n    width: 100%;\n    text-align: left;\n    padding: 8px 10px;\n    border: none;\n    background: transparent;\n    border-radius: var(--qm-radius-sm);\n    cursor: pointer;\n    color: var(--qmodii-multiselect-category-color);\n    font-family: var(--qm-font-ui);\n    font-size: var(--qm-fs-md);\n    min-height: 32px;\n  }\n  .qm-cat:hover { background: var(--qmodii-multiselect-category-hover-background); }\n  .qm-cat[aria-current=\"true\"] {\n    background: var(--qmodii-multiselect-category-active-background);\n    color: var(--qmodii-multiselect-category-active-color);\n    font-weight: 600;\n  }\n  .qm-cat[aria-current=\"true\"]::before {\n    content: \"\";\n    position: absolute;\n    left: 0;\n    top: 6px;\n    bottom: 6px;\n    width: var(--qmodii-multiselect-category-active-bar-width);\n    border-radius: var(--qmodii-multiselect-category-active-bar-radius);\n    background: var(--qmodii-multiselect-category-active-accent-color);\n  }\n  .qm-cat__name {\n    flex: 1 1 auto;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .qm-cat__badge {\n    flex: 0 0 auto;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 20px;\n    height: 20px;\n    padding: 0 6px;\n    border-radius: var(--qmodii-multiselect-category-badge-radius);\n    background: var(--qmodii-multiselect-category-badge-background);\n    color: var(--qmodii-multiselect-category-badge-color);\n    font-family: var(--qm-font-ui);\n    font-size: var(--qm-fs-xs);\n    font-weight: 600;\n    font-variant-numeric: tabular-nums;\n  }\n  .qm-cat__chev {\n    flex: 0 0 auto;\n    color: var(--qmodii-multiselect-dropdown-color);\n    opacity: 0;\n  }\n  .qm-cat[aria-current=\"true\"] .qm-cat__chev { opacity: 1; }\n\n  /* Right pane: item list */\n  .qm-items {\n    grid-row: 1;\n    grid-column: 2;\n    display: flex;\n    flex-direction: column;\n    min-height: 0;\n  }\n  /* Cross-category search — full-width bar across the top of the panel,\n     above the two-column miller (categories ┃ options). */\n  .qm-dsearch {\n    display: block;\n    flex: 0 0 auto;\n    padding: var(--qm-s3) var(--qm-s4);\n    border-bottom: 1px solid var(--qmodii-multiselect-search-divider-color);\n  }\n  .qm-items__head {\n    flex: 0 0 auto;\n    display: flex;\n    align-items: baseline;\n    gap: var(--qm-s2);\n    padding: var(--qm-s3) var(--qm-s4) var(--qm-s2);\n    border-bottom: 1px solid var(--qmodii-multiselect-overlay-border-color);\n  }\n  .qm-items__title {\n    font-size: var(--qm-fs-xs);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--qmodii-multiselect-header-color);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .qm-items__count {\n    flex: 0 0 auto;\n    margin-left: auto;\n    font-family: var(--qm-font-ui);\n    font-size: var(--qm-fs-sm);\n    color: var(--qm-text-muted);\n    font-variant-numeric: tabular-nums;\n  }\n  .qm-items__list {\n    flex: 1 1 auto;\n    overflow-y: auto;\n    padding: var(--qm-s2) var(--qm-s2) var(--qm-s3);\n  }\n\n}\n\n/* ===========================================================================\n   Shared item rows (used by desktop list + mobile screen 2 + search results)\n   =========================================================================== */\n.qm-row {\n  display: flex;\n  align-items: center;\n  gap: var(--qmodii-multiselect-option-gap);\n  width: 100%;\n  text-align: left;\n  padding: var(--qmodii-multiselect-option-padding);\n  min-height: var(--qmodii-multiselect-option-min-height);\n  border: none;\n  background: transparent;\n  border-radius: var(--qmodii-multiselect-option-border-radius);\n  cursor: pointer;\n  color: var(--qmodii-multiselect-option-color);\n  font-family: var(--qm-font-ui);\n  font-size: var(--qm-fs-md);\n}\n.qm-row:hover { background: var(--qmodii-multiselect-option-hover-background); }\n.qm-row:active { background: var(--qm-accent-weak); }\n\n.qm-row__code {\n  flex: 1 1 auto;\n  font-family: var(--qm-font-ui);\n  font-size: var(--qm-fs-md);\n  font-weight: 400;\n  color: var(--qm-text);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n[data-checked=\"true\"] .qm-row__code {\n  color: var(--qmodii-multiselect-option-selected-color);\n  font-weight: 600;\n}\n/* datasets whose options are names, not codes, render in the UI font */\n.qm-panel[data-codestyle=\"text\"] .qm-row__code {\n  font-family: var(--qm-font-ui);\n  font-weight: 400;\n}\n.qm-panel[data-codestyle=\"text\"] [data-checked=\"true\"] .qm-row__code {\n  font-weight: 600;\n}\n.qm-row__label {\n  flex: 1 1 auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--qm-text-muted);\n}\n.qm-row__cat {\n  flex: 0 0 auto;\n  font-size: var(--qm-fs-xs);\n  color: var(--qmodii-multiselect-option-tag-color);\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.qm-row--all {\n  font-weight: 600;\n}\n.qm-row--all .qm-row__label { color: var(--qm-text); }\n\n/* ===========================================================================\n   Shared footer\n   =========================================================================== */\n.qm-footer {\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  gap: var(--qm-s3);\n  padding: var(--qm-s3) var(--qm-s4);\n  border-top: 1px solid var(--qmodii-multiselect-footer-border-color);\n  background: var(--qmodii-multiselect-footer-background);\n}\n.qm-footer__count {\n  font-size: var(--qm-fs-md);\n  color: var(--qmodii-multiselect-footer-count-color);\n  font-variant-numeric: tabular-nums;\n}\n.qm-footer__count strong {\n  font-family: var(--qm-font-ui);\n  color: var(--qm-text);\n}\n.qm-footer__actions {\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n  gap: var(--qm-s2);\n}\n\n/* Search field — .qm-search is a shared primitive, so the multiselect's search\n   tokens are scoped to its own wrappers (cross-category + in-category). */\n.qm-dsearch .qm-search input,\n.qm-ssearch .qm-search input {\n  background: var(--qmodii-multiselect-search-field-background);\n  border-color: var(--qmodii-multiselect-search-field-border-color);\n  border-radius: var(--qmodii-multiselect-search-field-border-radius);\n}\n.qm-dsearch .qm-search input::placeholder,\n.qm-ssearch .qm-search input::placeholder {\n  color: var(--qmodii-multiselect-search-placeholder-color);\n}\n.qm-dsearch .qm-search input:focus,\n.qm-ssearch .qm-search input:focus {\n  border-color: var(--qmodii-multiselect-search-focus-border-color);\n}\n\n/* Empty state for no search matches */\n.qm-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--qm-s3);\n  min-height: 160px;\n  padding: var(--qm-s5);\n  text-align: center;\n  color: var(--qm-text-muted);\n}\n.qm-empty__q { color: var(--qm-text); font-weight: 600; }\n\n/* ===========================================================================\n   NARROW (< 768px) — drill-down flow.\n   Two skins share the same screens/footer:\n     • data-mode=\"sheet\"     → touch: floating bottom sheet\n     • data-mode=\"drilldown\" → pointer: anchored dropdown (desktop look)\n   =========================================================================== */\n@media (max-width: 767px) {\n  /* dim the page only behind the touch bottom sheet */\n  .qm-overlay[data-mode=\"sheet\"][data-open=\"true\"] { background: var(--qmodii-multiselect-scrim-background); }\n\n  /* TOUCH — floating bottom sheet: margin on every side, all corners rounded */\n  .qm-panel[data-mode=\"sheet\"] {\n    position: fixed;\n    left: 14px;\n    right: 14px;\n    bottom: calc(14px + env(safe-area-inset-bottom));\n    top: auto;\n    width: auto;\n    max-width: none;\n    /* Definite height so the flex body can size — the screens are\n       absolutely positioned and contribute no intrinsic height. */\n    height: calc(100vh - 42px);\n    height: calc(100dvh - 42px - env(safe-area-inset-bottom));\n    max-height: calc(100dvh - 42px - env(safe-area-inset-bottom));\n    border: none;\n    border-radius: var(--qm-radius-lg);\n    box-shadow: var(--qm-shadow-sheet);\n    transform: translateY(calc(100% + 24px));\n    transform-origin: bottom center;\n    transition: transform 240ms ease-out, opacity 1ms;\n    opacity: 1;\n  }\n  .qm-panel[data-mode=\"sheet\"][data-open=\"true\"] { transform: translateY(0); }\n  .qm-panel[data-mode=\"sheet\"][data-closing=\"true\"] {\n    transform: translateY(calc(100% + 24px));\n    transition: transform 200ms ease-in;\n  }\n\n  /* POINTER — anchored dropdown: keeps the base popover skin (absolute,\n     rounded, shadow, fade/scale from JS positioning), just narrower and\n     without the drag handle */\n  .qm-panel[data-mode=\"drilldown\"] { width: 380px; }\n  .qm-panel[data-mode=\"drilldown\"] .qm-handle { display: none; }\n\n  .qm-miller { display: none !important; }\n  /* desktop footer is a panel-level sibling — hide it in the narrow drill-down\n     so the sheet-view's own footer is the only one shown */\n  [data-d-footer] { display: none !important; }\n  .qm-sheet-view {\n    display: flex;\n    flex-direction: column;\n    min-height: 0;\n    height: 100%;\n  }\n\n  /* Drag handle */\n  .qm-handle {\n    flex: 0 0 auto;\n    display: flex;\n    justify-content: center;\n    padding: 10px 0 4px;\n    cursor: grab;\n    touch-action: none;\n  }\n  .qm-handle::before {\n    content: \"\";\n    width: 40px;\n    height: 4px;\n    border-radius: 4px;\n    background: var(--qm-border-strong);\n  }\n\n  /* The two screens live in a sliding track */\n  .qm-stage {\n    flex: 1 1 auto;\n    position: relative;\n    overflow: hidden;\n    min-height: 0;\n  }\n  /* Material 3 \"Shared axis (X)\" transition: a small ~30px slide carried by\n     a fade — the fade does the work, so it reads as a calm cross-fade with a\n     directional hint rather than a full-width push. Emphasized easing, 300ms. */\n  .qm-screen {\n    position: absolute;\n    inset: 0;\n    display: flex;\n    flex-direction: column;\n    min-height: 0;\n    background: var(--qm-surface);\n    transition: transform 300ms cubic-bezier(0.2, 0, 0, 1),\n                opacity 300ms cubic-bezier(0.2, 0, 0, 1);\n    will-change: transform, opacity;\n  }\n  /* on screen 1: list is present; detail waits just off to the right, faded */\n  .qm-screen[data-screen=\"1\"] { transform: translateX(0); opacity: 1; }\n  .qm-screen[data-screen=\"2\"] {\n    transform: translateX(30px);\n    opacity: 0;\n    pointer-events: none;\n  }\n  /* drilled in: list shifts slightly left + fades out, detail fades in */\n  .qm-sheet-view[data-screen=\"2\"] .qm-screen[data-screen=\"1\"] {\n    transform: translateX(-30px);\n    opacity: 0;\n    pointer-events: none;\n  }\n  .qm-sheet-view[data-screen=\"2\"] .qm-screen[data-screen=\"2\"] {\n    transform: translateX(0);\n    opacity: 1;\n    pointer-events: auto;\n  }\n\n  .qm-shead {\n    flex: 0 0 auto;\n    display: flex;\n    align-items: center;\n    gap: var(--qm-s2);\n    padding: var(--qm-s2) var(--qm-s3) var(--qm-s2) var(--qm-s4);\n    min-height: 52px;\n  }\n  .qm-shead__title {\n    flex: 1 1 auto;\n    font-size: var(--qm-fs-xl);\n    font-weight: 700;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .qm-shead__count {\n    flex: 0 0 auto;\n    font-family: var(--qm-font-ui);\n    font-size: var(--qm-fs-sm);\n    color: var(--qm-text-muted);\n    font-variant-numeric: tabular-nums;\n  }\n  .qm-shead--screen2 .qm-shead__title { font-size: var(--qm-fs-lg); }\n\n  .qm-ssearch {\n    flex: 0 0 auto;\n    padding: 0 var(--qm-s4) var(--qm-s3);\n  }\n\n  .qm-slist {\n    flex: 1 1 auto;\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n    padding: 0 var(--qm-s2) var(--qm-s3);\n  }\n\n  /* Category row (screen 1) */\n  .qm-catrow {\n    display: flex;\n    align-items: center;\n    gap: var(--qm-s2);\n    width: 100%;\n    text-align: left;\n    min-height: 48px;\n    padding: 0 12px;\n    border: none;\n    background: transparent;\n    border-radius: var(--qm-radius-sm);\n    cursor: pointer;\n    color: var(--qm-text);\n    font-family: var(--qm-font-ui);\n    font-size: var(--qm-fs-lg);\n  }\n  .qm-catrow:active { background: var(--qm-accent-weak); }\n  .qm-catrow__name {\n    flex: 1 1 auto;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .qm-catrow__badge {\n    flex: 0 0 auto;\n    font-family: var(--qm-font-ui);\n    font-size: var(--qm-fs-sm);\n    font-weight: 600;\n    color: #fff;\n    background: var(--qm-accent);\n    border-radius: 999px;\n    padding: 2px 8px;\n    min-width: 22px;\n    text-align: center;\n    font-variant-numeric: tabular-nums;\n  }\n  .qm-catrow__chev { flex: 0 0 auto; color: var(--qm-text-faint); }\n\n  /* Accordion (expanding-sections narrow mode) */\n  .qm-acc { border-bottom: 1px solid var(--qm-border); }\n  .qm-acc__head {\n    display: flex;\n    align-items: center;\n    gap: var(--qm-s2);\n    width: 100%;\n    text-align: left;\n    min-height: 48px;\n    padding: 0 12px;\n    border: none;\n    background: transparent;\n    cursor: pointer;\n    color: var(--qm-text);\n    font-family: var(--qm-font-ui);\n    font-size: var(--qm-fs-lg);\n    font-weight: 600;\n  }\n  .qm-acc__head:active { background: var(--qm-accent-weak); }\n  .qm-acc__chev {\n    flex: 0 0 auto;\n    color: var(--qm-text-faint);\n    transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);\n  }\n  .qm-acc[data-open=\"true\"] .qm-acc__chev { transform: rotate(90deg); }\n  /* smooth height via grid-rows (no fixed height needed) */\n  .qm-acc__body {\n    display: grid;\n    grid-template-rows: 0fr;\n    transition: grid-template-rows 240ms cubic-bezier(0.2, 0, 0, 1);\n  }\n  .qm-acc[data-open=\"true\"] .qm-acc__body { grid-template-rows: 1fr; }\n  .qm-acc__inner { overflow: hidden; min-height: 0; padding-bottom: var(--qm-s2); }\n\n  /* Mobile rows a touch taller than desktop's QMODII density for fingers */\n  .qm-screen .qm-row { min-height: 40px; }\n\n  /* sheet floats above the safe area, so the footer keeps normal padding */\n}\n\n/* Close (×) glyph sizing */\n.qm-x svg { width: 18px; height: 18px; }\n.qm-chev svg { width: 18px; height: 18px; }\n\n/* ===========================================================================\n   Reduced motion\n   =========================================================================== */\n@media (prefers-reduced-motion: reduce) {\n  .qm-panel,\n  .qm-overlay,\n  .qm-screen {\n    transition: opacity 1ms linear !important;\n    transform: none !important;\n  }\n  .qm-panel[data-open=\"true\"] { transform: none !important; }\n  .qm-sheet-view[data-screen=\"2\"] .qm-screen[data-screen=\"1\"] {\n    /* instant swap: hide screen 1 rather than slide */\n    transform: none !important;\n    visibility: hidden;\n  }\n  .qm-screen[data-screen=\"2\"] { transform: none !important; }\n  .qm-sheet-view:not([data-screen=\"2\"]) .qm-screen[data-screen=\"2\"] {\n    visibility: hidden;\n  }\n  .qm-acc__chev, .qm-acc__body { transition: none !important; }\n}";
let __qmFacetedInjected = false;
function ensureQmFacetedCss() {
  if (__qmFacetedInjected || typeof document === 'undefined') return;
  __qmFacetedInjected = true;
  const s = document.createElement('style');
  s.setAttribute('data-qm-faceted-css', '');
  s.textContent = QM_CSS;
  document.head.appendChild(s);
}

/* ==========================================================================
   filing-filter.js
   Responsive filing-type filter.
   - Desktop (>=768px): anchored dropdown, two-column miller layout.
   - Touch  (<768px):  bottom-sheet drill-down (category list -> item list).
   One shared selection state across both layouts.

   Open-question decisions baked in:
   Q1 Apply model: toggles are STAGED while the panel is open; "Search"
      applies + closes. Re-opening restores the last applied selection.
   Q2 Search results: flat list, each result tagged with its category.
   Q3 Dismiss: cancel-on-dismiss (×, scrim, swipe, Esc discard staged edits).
   ========================================================================== */

(function () {
  "use strict";

  let PUID = 0; // unique panel ids so multiple instances can share a page

  /* ---- Data: SEC-style filing categories & types ----------------------- */
  // Each item id is `${catId}:${code}` and is globally unique.
  const FILING_CATEGORIES = [{
    id: "6k",
    name: "6K Related",
    items: [["6-K", "Report of foreign private issuer"], ["6-K/A", "Report of foreign private issuer (amended)"]]
  }, {
    id: "8k",
    name: "8K",
    items: [["8-K", "Current report"], ["8-K/A", "Current report (amended)"], ["8-K12B", "Notification under Rule 12b"], ["8-K12G3", "Notification of securities of successor issuers"], ["8-K15D5", "Notification of assumption of duty to report"]]
  }, {
    id: "annual",
    name: "Annual Reports",
    items: [["10-K", "Annual report"], ["10-K/A", "Annual report (amended)"], ["10-KT", "Transition annual report"], ["10-KT/A", "Transition annual report (amended)"], ["10-KSB", "Annual report — small business"], ["10-KSB/A", "Annual report — small business (amended)"], ["10-K405", "Annual report (Item 405)"], ["10-K405/A", "Annual report (Item 405, amended)"], ["20-F", "Annual report — foreign private issuer"], ["20-F/A", "Annual report — foreign private issuer (amended)"], ["40-F", "Annual report — Canadian issuer"], ["40-F/A", "Annual report — Canadian issuer (amended)"], ["11-K", "Annual report of employee stock purchase plan"], ["11-K/A", "Annual report of employee stock purchase plan (amended)"], ["11-KT", "Transition report of employee stock purchase plan"], ["ARS", "Annual report to security holders"], ["ARS/A", "Annual report to security holders (amended)"], ["18-K", "Annual report — foreign governments"], ["18-K/A", "Annual report — foreign governments (amended)"], ["N-CSR", "Certified annual shareholder report of management investment companies"], ["N-CSR/A", "Certified annual shareholder report (amended)"]]
  }, {
    id: "funds",
    name: "Funds",
    items: [["N-1A", "Registration statement for open-end management investment companies"], ["N-CSRS", "Certified semi-annual shareholder report"], ["N-Q", "Quarterly schedule of portfolio holdings"], ["N-PX", "Annual report of proxy voting record"], ["NPORT-P", "Monthly portfolio investments report (public)"], ["497", "Definitive materials filed under Rule 497"], ["497K", "Summary prospectus for open-end investment companies"], ["485APOS", "Post-effective amendment (paragraph (a))"], ["485BPOS", "Post-effective amendment (paragraph (b))"], ["N-CEN", "Annual report for registered investment companies"]]
  }, {
    id: "insider",
    name: "Insider Trading",
    items: [["3", "Initial statement of beneficial ownership"], ["3/A", "Initial statement of beneficial ownership (amended)"], ["4", "Statement of changes in beneficial ownership"], ["4/A", "Statement of changes in beneficial ownership (amended)"], ["5", "Annual statement of beneficial ownership"], ["5/A", "Annual statement of beneficial ownership (amended)"], ["144", "Notice of proposed sale of securities"]]
  }, {
    id: "paper",
    name: "Paper Submissions",
    items: [["10-K (paper)", "Annual report — paper submission"], ["8-K (paper)", "Current report — paper submission"], ["SC 13D (paper)", "Beneficial ownership report — paper submission"], ["DEF 14A (paper)", "Definitive proxy statement — paper submission"]]
  }, {
    id: "proxy",
    name: "Proxy Statements",
    items: [["DEF 14A", "Definitive proxy statement"], ["DEFA14A", "Additional definitive proxy soliciting materials"], ["DEFR14A", "Revised definitive proxy statement"], ["PRE 14A", "Preliminary proxy statement"], ["PREC14A", "Preliminary proxy statement — contested solicitation"], ["DEFM14A", "Definitive proxy statement relating to a merger"], ["DEFC14A", "Definitive proxy statement — contested solicitation"], ["DEF 14C", "Definitive information statement"], ["PRE 14C", "Preliminary information statement"]]
  }, {
    id: "utility",
    name: "Public Utility Holding Company Act",
    items: [["U-1", "Application or declaration"], ["U5S", "Annual report for holding companies"], ["35-CERT", "Certificate of notification"], ["U-3A-2", "Statement claiming exemption"]]
  }, {
    id: "quarterly",
    name: "Quarterly Reports",
    items: [["10-Q", "Quarterly report"], ["10-Q/A", "Quarterly report (amended)"], ["10-QT", "Transition quarterly report"], ["10-QT/A", "Transition quarterly report (amended)"], ["10-QSB", "Quarterly report — small business"], ["10-QSB/A", "Quarterly report — small business (amended)"]]
  }, {
    id: "regterm",
    name: "Registration / Termination",
    items: [["15-12B", "Termination of registration of a class of securities (12(b))"], ["15-12G", "Termination of registration of a class of securities (12(g))"], ["15-15D", "Suspension of duty to file reports"], ["RW", "Registration withdrawal request"]]
  }];
  const itemId = (catId, code) => catId + ":" + code;

  /* ---- Data: GICS-style industry / sector taxonomy --------------------- */
  // Items carry the industry name as their "code" (shown as the row text).
  const SECTOR_CATEGORIES = [{
    id: "energy",
    name: "Energy",
    items: [["Oil & Gas Drilling", ""], ["Oil & Gas Equipment & Services", ""], ["Integrated Oil & Gas", ""], ["Oil & Gas Exploration & Production", ""], ["Oil & Gas Refining & Marketing", ""], ["Oil & Gas Storage & Transportation", ""], ["Coal & Consumable Fuels", ""]]
  }, {
    id: "materials",
    name: "Materials",
    items: [["Commodity Chemicals", ""], ["Diversified Chemicals", ""], ["Specialty Chemicals", ""], ["Industrial Gases", ""], ["Construction Materials", ""], ["Metal & Glass Containers", ""], ["Paper Packaging", ""], ["Aluminum", ""], ["Diversified Metals & Mining", ""], ["Copper", ""], ["Gold", ""], ["Silver", ""], ["Steel", ""], ["Forest Products", ""], ["Paper Products", ""]]
  }, {
    id: "industrials",
    name: "Industrials",
    items: [["Aerospace & Defense", ""], ["Building Products", ""], ["Construction & Engineering", ""], ["Electrical Components & Equipment", ""], ["Heavy Electrical Equipment", ""], ["Industrial Conglomerates", ""], ["Industrial Machinery", ""], ["Trading Companies & Distributors", ""], ["Commercial Printing", ""], ["Environmental & Facilities Services", ""], ["Human Resource & Employment Services", ""], ["Air Freight & Logistics", ""], ["Passenger Airlines", ""], ["Marine Transportation", ""], ["Rail Transportation", ""], ["Cargo Ground Transportation", ""]]
  }, {
    id: "discretionary",
    name: "Consumer Discretionary",
    items: [["Automotive Parts & Equipment", ""], ["Automobile Manufacturers", ""], ["Consumer Electronics", ""], ["Home Furnishings", ""], ["Homebuilding", ""], ["Household Appliances", ""], ["Leisure Products", ""], ["Apparel, Accessories & Luxury Goods", ""], ["Hotels, Resorts & Cruise Lines", ""], ["Restaurants", ""], ["Apparel Retail", ""], ["Specialty Retail", ""], ["Broadline Retail", ""]]
  }, {
    id: "staples",
    name: "Consumer Staples",
    items: [["Drug Retail", ""], ["Food Distributors", ""], ["Food Retail", ""], ["Consumer Staples Merchandise Retail", ""], ["Brewers", ""], ["Distillers & Vintners", ""], ["Soft Drinks & Non-alcoholic Beverages", ""], ["Agricultural Products & Services", ""], ["Packaged Foods & Meats", ""], ["Tobacco", ""], ["Household Products", ""], ["Personal Care Products", ""]]
  }, {
    id: "health",
    name: "Health Care",
    items: [["Health Care Equipment", ""], ["Health Care Supplies", ""], ["Health Care Distributors", ""], ["Health Care Services", ""], ["Health Care Facilities", ""], ["Managed Health Care", ""], ["Health Care Technology", ""], ["Biotechnology", ""], ["Pharmaceuticals", ""], ["Life Sciences Tools & Services", ""]]
  }, {
    id: "financials",
    name: "Financials",
    items: [["Diversified Banks", ""], ["Regional Banks", ""], ["Commercial & Residential Mortgage Finance", ""], ["Consumer Finance", ""], ["Asset Management & Custody Banks", ""], ["Investment Banking & Brokerage", ""], ["Diversified Financial Services", ""], ["Multi-Sector Holdings", ""], ["Financial Exchanges & Data", ""], ["Insurance Brokers", ""], ["Life & Health Insurance", ""], ["Property & Casualty Insurance", ""], ["Reinsurance", ""]]
  }, {
    id: "infotech",
    name: "Information Technology",
    items: [["IT Consulting & Other Services", ""], ["Internet Services & Infrastructure", ""], ["Application Software", ""], ["Systems Software", ""], ["Communications Equipment", ""], ["Technology Hardware, Storage & Peripherals", ""], ["Electronic Equipment & Instruments", ""], ["Electronic Components", ""], ["Electronic Manufacturing Services", ""], ["Semiconductor Materials & Equipment", ""], ["Semiconductors", ""]]
  }, {
    id: "comms",
    name: "Communication Services",
    items: [["Alternative Carriers", ""], ["Integrated Telecommunication Services", ""], ["Wireless Telecommunication Services", ""], ["Advertising", ""], ["Broadcasting", ""], ["Cable & Satellite", ""], ["Publishing", ""], ["Movies & Entertainment", ""], ["Interactive Home Entertainment", ""], ["Interactive Media & Services", ""]]
  }, {
    id: "utilities",
    name: "Utilities",
    items: [["Electric Utilities", ""], ["Gas Utilities", ""], ["Multi-Utilities", ""], ["Water Utilities", ""], ["Independent Power Producers & Energy Traders", ""], ["Renewable Electricity", ""]]
  }, {
    id: "realestate",
    name: "Real Estate",
    items: [["Diversified REITs", ""], ["Industrial REITs", ""], ["Hotel & Resort REITs", ""], ["Office REITs", ""], ["Health Care REITs", ""], ["Multi-Family Residential REITs", ""], ["Single-Family Residential REITs", ""], ["Retail REITs", ""], ["Telecom Tower REITs", ""], ["Data Center REITs", ""], ["Real Estate Operating Companies", ""], ["Real Estate Development", ""], ["Real Estate Services", ""]]
  }];

  /* ---- Data: market-screener filter criteria --------------------------- */
  // Categories = criteria groups; items = individual screener filters.
  // Groups are disjoint so each criterion is unique.
  const SCREENER_CATEGORIES = [{
    id: "classification",
    name: "Classification",
    items: [["Exchange", ""], ["Sector", ""], ["Industry", ""], ["Country", ""], ["Index Membership", ""], ["Security Type", ""], ["Optionable", ""], ["Shortable", ""]]
  }, {
    id: "valuation",
    name: "Valuation",
    items: [["Market Capitalization", ""], ["P/E Ratio (TTM)", ""], ["Forward P/E Ratio", ""], ["PEG Ratio", ""], ["Price / Sales", ""], ["Price / Book", ""], ["Price / Cash Flow", ""], ["EV / EBITDA", ""], ["Enterprise Value", ""]]
  }, {
    id: "profitability",
    name: "Profitability",
    items: [["Profit Margin", ""], ["Operating Margin", ""], ["Gross Margin", ""], ["Return on Equity", ""], ["Return on Assets", ""], ["Return on Invested Capital", ""]]
  }, {
    id: "dividends",
    name: "Dividends",
    items: [["Dividend Yield", ""], ["Dividend Per Share", ""], ["Payout Ratio", ""], ["Dividend Growth (5Y)", ""], ["Years of Dividend Growth", ""], ["Ex-Dividend Date", ""]]
  }, {
    id: "growth",
    name: "Growth",
    items: [["Revenue Growth (YoY)", ""], ["Revenue Growth (5Y)", ""], ["EPS Growth (YoY)", ""], ["EPS Growth (5Y)", ""], ["EPS Growth (Next Year)", ""]]
  }, {
    id: "price",
    name: "Price & Volume",
    items: [["Last Price", ""], ["Price Change ($)", ""], ["Price Change (%)", ""], ["Price Performance (90 Days)", ""], ["52-Week High", ""], ["52-Week Low", ""], ["Beta", ""], ["Average Volume (90-Day)", ""], ["Relative Volume", ""], ["Gap (%)", ""]]
  }, {
    id: "technicals",
    name: "Technicals",
    items: [["RSI (14)", ""], ["50-Day Moving Average", ""], ["200-Day Moving Average", ""], ["MACD", ""], ["Average True Range", ""], ["20-Day Volatility", ""]]
  }, {
    id: "financials",
    name: "Financial Health",
    items: [["Total Debt / Equity", ""], ["Current Ratio", ""], ["Quick Ratio", ""], ["Free Cash Flow", ""], ["Total Revenue", ""], ["Net Income", ""], ["Total Cash", ""]]
  }, {
    id: "ownership",
    name: "Ownership",
    items: [["Institutional Ownership", ""], ["Insider Ownership", ""], ["Short Float", ""], ["Float", ""], ["Shares Outstanding", ""]]
  }];

  /* ====================================================================== *
   * DATASETS — the faceted filter's "types" registry. Each key is a dataset
   * a trigger selects via data-dataset="<key>". Adding a type = adding an
   * entry here; no component code changes.
   *
   *   <key>: {
   *     label:        string  — chip label / dialog title
   *     searchAll:    string  — placeholder for the cross-category search
   *     categories:   [{ id, name, items: [[code, label], …] }]
   *     defaultIndex: number  — category shown first on desktop
   *     mono?:        boolean — true: option text in tabular mono (codes);
   *                             false (default): UI font (names)
   *     narrow?:      "drilldown" | "accordion"  — narrow-screen nav
   *                             (default "drilldown")
   *   }
   *
   * Item id = "<categoryId>:<code>" and MUST be globally unique — keep
   * categories disjoint. The cross-category search auto-appears once a
   * dataset has > 15 items. Built-in: filings (mono), sectors, screener.
   * ====================================================================== */
  const DATASETS = {
    filings: {
      label: "Filing type",
      searchAll: "Search all filings",
      categories: FILING_CATEGORIES,
      defaultIndex: 2,
      // Annual Reports
      mono: false // mono removed — all option text uses the UI font
    },
    sectors: {
      label: "Industry / sector",
      searchAll: "Search all industries",
      categories: SECTOR_CATEGORIES,
      defaultIndex: 0,
      // Energy
      mono: false // names read as plain text
    },
    screener: {
      label: "Add filter criteria",
      searchAll: "Search filters",
      categories: SCREENER_CATEGORIES,
      defaultIndex: 0,
      // Classification
      mono: false
    }
  };

  /* ---- Icons ----------------------------------------------------------- */
  const ICONS = {
    x: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>',
    chevR: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5l5 5-5 5"/></svg>',
    chevL: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5l-5 5 5 5"/></svg>',
    search: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M11 11l3 3" stroke-linecap="round"/></svg>'
  };

  /* ====================================================================== */
  class FilingFilter {
    constructor(trigger, options = {}) {
      this.trigger = trigger;
      // dataset config (data-driven; defaults to filings)
      const ds = options.customDataset || DATASETS[options.dataset] || DATASETS.filings;
      this.onChange = options.onChange;
      this.categories = ds.categories;
      this.label = ds.label;
      this.searchAll = ds.searchAll;
      this.mono = ds.mono;
      // narrow-breakpoint navigation: "drilldown" (push) or "accordion"
      // (expanding sections). Trigger attribute > option > dataset > default.
      this.narrowNav = options.narrowNav || ds.narrow || "drilldown";
      this.expanded = new Set(); // open accordion sections
      // flat index for cross-category search
      this.allItems = [];
      this.categories.forEach(c => c.items.forEach(([code, label]) => this.allItems.push({
        id: itemId(c.id, code),
        code,
        label,
        catId: c.id,
        catName: c.name
      })));
      // chip parts (the trigger is the chip's main button)
      this.chip = trigger.closest(".qm-chip");
      this.chipText = this.chip && this.chip.querySelector("[data-chip-text]");
      this.chipBadge = this.chip && this.chip.querySelector("[data-chip-badge]");
      this.applied = new Set(); // last applied selection
      this.staged = new Set(); // working copy while open
      this.isOpen = false;
      this.activeCat = this.categories[ds.defaultIndex || 0].id;
      this.mobileScreen = 1;
      this.mobileCat = null;
      this.mqNarrow = window.matchMedia("(max-width: 767px)");
      this.mqTouch = window.matchMedia("(pointer: coarse)");
      this._buildDom();
      this._wire();
      this._renderSummary();
    }
    _catById(catId) {
      return this.categories.find(c => c.id === catId);
    }
    _itemsByCat(catId) {
      return this._catById(catId).items;
    }

    // Switch narrow-breakpoint navigation at runtime ("drilldown"|"accordion").
    setNarrowNav(nav) {
      if (nav !== "accordion" && nav !== "drilldown") return;
      this.narrowNav = nav;
      this.expanded = new Set(nav === "accordion" ? [this.activeCat] : []);
      if (this.isOpen) {
        this.mobileScreen = 1;
        this._renderForViewport();
        if (this.mode !== "sheet") this._position();
      }
    }

    // Presentation mode:
    //  - "miller"    : wide viewport → two-column dropdown
    //  - "drilldown" : narrow + pointer device → dropdown with drill-down flow
    //  - "sheet"     : narrow + touch device → floating bottom sheet
    get mode() {
      if (!this.mqNarrow.matches) return "miller";
      return this.mqTouch.matches ? "sheet" : "drilldown";
    }
    // Both narrow modes share the drill-down (screens) rendering.
    get usesSheetView() {
      return this.mode !== "miller";
    }

    /* ---- DOM scaffold (built once) ------------------------------------ */
    _buildDom() {
      this.overlay = document.createElement("div");
      this.overlay.className = "qm-overlay";
      this.panel = document.createElement("div");
      this.panel.className = "qm-panel";
      this.panel.setAttribute("role", "dialog");
      this.panel.setAttribute("aria-modal", "true");
      this.panel.setAttribute("aria-label", this.label + " filter");
      this.panel.setAttribute("data-codestyle", this.mono ? "mono" : "text");
      this.panelId = "qm-filter-panel-" + ++PUID;
      this.panel.id = this.panelId;
      this.panel.innerHTML = `
        <!-- DESKTOP cross-category search — spans the full panel width across the top -->
        <div class="qm-dsearch" data-d-search-wrap>
          <div class="qm-search">
            ${ICONS.search}
            <input type="search" data-d-search placeholder="${esc(this.searchAll)}"
                   aria-label="${esc(this.searchAll)}" autocomplete="off" />
          </div>
        </div>

        <!-- DESKTOP miller -->
        <div class="qm-miller">
          <nav class="qm-cats" aria-label="Categories"></nav>
          <section class="qm-items">
            <div class="qm-items__head">
              <span class="qm-items__title" data-d-title></span>
              <span class="qm-items__count" data-d-count></span>
            </div>
            <div class="qm-items__list" data-d-list role="group" aria-label="${esc(this.label)} options"></div>
          </section>
        </div>

        <!-- MOBILE sheet -->
        <div class="qm-sheet-view" data-screen="1">
          <div class="qm-handle" data-handle aria-hidden="true"></div>
          <div class="qm-stage">
            <!-- screen 1: categories -->
            <div class="qm-screen" data-screen="1">
              <div class="qm-shead">
                <span class="qm-shead__title">${esc(this.label)}</span>
                <button class="qm-icon-btn qm-x" data-close type="button" aria-label="Close filter">${ICONS.x}</button>
              </div>
              <div class="qm-ssearch">
                <div class="qm-search">
                  ${ICONS.search}
                  <input type="search" data-s1-search placeholder="${esc(this.searchAll)}"
                         aria-label="${esc(this.searchAll)}" autocomplete="off" />
                </div>
              </div>
              <div class="qm-slist" data-s1-list></div>
            </div>
            <!-- screen 2: items -->
            <div class="qm-screen" data-screen="2">
              <div class="qm-shead qm-shead--screen2">
                <button class="qm-icon-btn qm-chev" data-back type="button" aria-label="Back to categories">${ICONS.chevL}</button>
                <span class="qm-shead__title" data-s2-title></span>
                <span class="qm-shead__count" data-s2-count></span>
              </div>
              <div class="qm-ssearch">
                <div class="qm-search">
                  ${ICONS.search}
                  <input type="search" data-s2-search placeholder="Filter"
                         aria-label="Filter within category" autocomplete="off" />
                </div>
              </div>
              <div class="qm-slist" data-s2-list role="group"></div>
            </div>
          </div>
          <!-- mobile footer lives inside sheet so it tracks the sheet height -->
          <footer class="qm-footer" data-m-footer></footer>
        </div>

        <!-- DESKTOP footer (sibling of miller, hidden on mobile by layout) -->
        <footer class="qm-footer" data-d-footer></footer>
      `;
      this.overlay.appendChild(this.panel);
      document.body.appendChild(this.overlay);

      // cache refs
      const $ = sel => this.panel.querySelector(sel);
      this.el = {
        cats: $(".qm-cats"),
        dTitle: $("[data-d-title]"),
        dCount: $("[data-d-count]"),
        dList: $("[data-d-list]"),
        dSearch: $("[data-d-search]"),
        dFooter: $("[data-d-footer]"),
        sheet: $(".qm-sheet-view"),
        handle: $("[data-handle]"),
        s1Search: $("[data-s1-search]"),
        s1List: $("[data-s1-list]"),
        s2Title: $("[data-s2-title]"),
        s2Count: $("[data-s2-count]"),
        s2Search: $("[data-s2-search]"),
        s2List: $("[data-s2-list]"),
        mFooter: $("[data-m-footer]")
      };
      this.el.s1SearchWrap = this.el.s1Search.closest(".qm-ssearch");
      this.el.s2SearchWrap = this.el.s2Search.closest(".qm-ssearch");
      this.el.dSearchWrap = this.el.dSearch.closest(".qm-dsearch");
      // cross-category search only shows when there are > 15 options overall
      this.el.s1SearchWrap.hidden = this.allItems.length <= 15;
      this.el.dSearchWrap.hidden = this.allItems.length <= 15;
    }

    /* ---- Event wiring -------------------------------------------------- */
    _wire() {
      this.trigger.addEventListener("click", () => this.toggleOpen());
      this.overlay.addEventListener("mousedown", e => {
        if (e.target === this.overlay) this.dismiss();
      });
      document.addEventListener("keydown", e => {
        if (!this.isOpen) return;
        if (e.key === "Escape") {
          e.preventDefault();
          this.dismiss();
        }
        if (e.key === "Tab") this._trapTab(e);
      });

      // Close / back buttons (mobile)
      this.panel.querySelector("[data-close]").addEventListener("click", () => this.dismiss());
      this.panel.querySelector("[data-back]").addEventListener("click", () => this.goScreen(1));

      // Search inputs
      this.el.s1Search.addEventListener("input", () => this._renderScreen1());
      this.el.s2Search.addEventListener("input", () => this._renderScreen2List());
      this.el.dSearch.addEventListener("input", () => this._renderDesktop());

      // Reposition anchored popovers on resize/scroll; re-render on mode change.
      this._onResize = () => {
        if (!this.isOpen) return;
        this._renderForViewport();
        if (this.mode !== "sheet") this._position();
      };
      window.addEventListener("resize", this._onResize);
      window.addEventListener("scroll", () => {
        if (this.isOpen && this.mode !== "sheet") this._position();
      }, true);
      // react to viewport-width and input-type (touch vs pointer) changes
      this.mqNarrow.addEventListener("change", this._onResize);
      this.mqTouch.addEventListener("change", this._onResize);
      this._wireSwipe();
    }

    /* ---- Open / close -------------------------------------------------- */
    toggleOpen() {
      this.isOpen ? this.dismiss() : this.open();
    }
    open() {
      this.staged = new Set(this.applied); // restore last applied
      this.isOpen = true;
      this._lastFocus = document.activeElement;
      this.mobileScreen = 1;
      this.el.sheet.setAttribute("data-screen", "1");
      this.el.s1Search.value = "";
      this.el.s2Search.value = "";
      this.el.dSearch.value = "";
      // accordion starts with the default section open for orientation
      this.expanded = new Set(this.narrowNav === "accordion" ? [this.activeCat] : []);

      // set the presentation mode + content before showing so the open
      // transition starts from the correct closed state
      this._renderForViewport();
      if (this.mode !== "sheet") this._position();
      this.overlay.setAttribute("data-open", "true");
      // force reflow so the panel transition runs
      // eslint-disable-next-line no-unused-expressions
      this.panel.offsetHeight;
      this.panel.setAttribute("data-open", "true");
      this.trigger.setAttribute("aria-expanded", "true");

      // initial focus
      requestAnimationFrame(() => {
        if (this.usesSheetView) this.el.s1Search.focus();else if (!this.el.dSearchWrap.hidden) this.el.dSearch.focus();else (this.el.cats.querySelector('[aria-current="true"]') || this.el.cats.firstElementChild)?.focus();
      });
    }
    dismiss() {
      // Selections apply live, so closing keeps them (no separate confirm).
      this._close();
    }
    applyAndClose() {
      // selection is already applied live; "Search" just closes the panel
      this.applied = new Set(this.staged);
      this._renderSummary();
      this._close();
    }
    _close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.panel.removeAttribute("data-open");
      this.panel.setAttribute("data-closing", "true");
      this.trigger.setAttribute("aria-expanded", "false");
      const done = () => {
        this.overlay.removeAttribute("data-open");
        this.panel.removeAttribute("data-closing");
        this.panel.removeEventListener("transitionend", done);
      };
      this.panel.addEventListener("transitionend", done);
      // safety timeout (reduced-motion / no transition)
      setTimeout(done, 300);
      if (this._lastFocus && this._lastFocus.focus) this._lastFocus.focus();
    }

    /* ---- Desktop popover positioning ----------------------------------- */
    _position() {
      const r = this.trigger.getBoundingClientRect();
      const gap = 8;
      const pw = this.panel.offsetWidth;
      let left = r.left;
      if (left + pw > window.innerWidth - 12) left = window.innerWidth - 12 - pw;
      if (left < 12) left = 12;
      let top = r.bottom + gap;
      const ph = this.panel.offsetHeight;
      if (top + ph > window.innerHeight - 12) {
        // flip above if not enough room below
        const above = r.top - gap - ph;
        if (above > 12) top = above;
      }
      this.panel.style.left = left + "px";
      this.panel.style.top = top + "px";
    }

    /* ---- Render dispatch ----------------------------------------------- */
    _renderForViewport() {
      const mode = this.mode;
      this.panel.setAttribute("data-mode", mode);
      this.overlay.setAttribute("data-mode", mode);
      this.panel.setAttribute("data-narrow", this.narrowNav);
      if (mode === "sheet") {
        // Clear inline popover anchoring so the sheet's full-width CSS wins.
        this.panel.style.left = "";
        this.panel.style.top = "";
      }
      if (this.usesSheetView) {
        if (this.narrowNav === "accordion") {
          // single screen of expanding sections — no push navigation
          this.mobileScreen = 1;
          this.el.sheet.setAttribute("data-screen", "1");
        }
        this._renderScreen1();
        if (this.narrowNav !== "accordion" && this.mobileScreen === 2 && this.mobileCat) {
          this.el.s2Search.value = "";
          this._renderScreen2(this.mobileCat);
        }
        this._renderMobileFooter();
      } else {
        // landed on the wide layout: keep category context from a drill-down
        if (this.mobileScreen === 2 && this.mobileCat) this.activeCat = this.mobileCat;
        this._renderDesktop();
      }
    }

    /* ---- DESKTOP render ------------------------------------------------ */
    _renderDesktop() {
      const q = (this.el.dSearch.value || "").trim().toLowerCase();
      const searching = !!q && !this.el.dSearchWrap.hidden;

      // categories rail (clicking a category clears any active search)
      this.el.cats.innerHTML = "";
      this.categories.forEach(c => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "qm-cat";
        b.setAttribute("data-cat", c.id);
        if (!searching && c.id === this.activeCat) b.setAttribute("aria-current", "true");
        b.title = c.name;
        const sel = this._countInCat(c.id);
        b.innerHTML = `<span class="qm-cat__name">${esc(c.name)}</span>` + (sel ? `<span class="qm-cat__badge">${sel}</span>` : "") + `<span class="qm-cat__chev qm-chev">${ICONS.chevR}</span>`;
        b.addEventListener("click", () => {
          this.activeCat = c.id;
          if (this.el.dSearch.value) this.el.dSearch.value = "";
          this._renderDesktop();
        });
        this.el.cats.appendChild(b);
      });
      this.el.dList.innerHTML = "";
      if (searching) {
        // cross-category search → flat list, each row tagged with its category
        const matches = this.allItems.filter(it => it.code.toLowerCase().includes(q) || it.label.toLowerCase().includes(q) || it.catName.toLowerCase().includes(q));
        this.el.dTitle.textContent = "Search results";
        this.el.dTitle.title = "Search results";
        this.el.dCount.textContent = matches.length + (matches.length === 1 ? " match" : " matches");
        if (!matches.length) {
          this.el.dList.appendChild(this._emptyState(this.el.dSearch.value.trim()));
        } else {
          matches.forEach(it => this.el.dList.appendChild(this._itemRow(it.catId, it.code, it.label, it.catName)));
        }
      } else {
        const cat = this._catById(this.activeCat);
        this.el.dTitle.textContent = cat.name;
        this.el.dTitle.title = cat.name;
        this.el.dCount.textContent = cat.items.length + " items";
        this.el.dList.appendChild(this._selectAllRow(cat));
        cat.items.forEach(([code, label]) => {
          this.el.dList.appendChild(this._itemRow(this.activeCat, code, label));
        });
      }
      this._renderDesktopFooter();
    }
    _renderDesktopFooter() {
      const n = this.staged.size;
      this.el.dFooter.innerHTML = "";
      const count = document.createElement("div");
      count.className = "qm-footer__count";
      count.setAttribute("aria-live", "polite");
      count.innerHTML = n ? `<strong>${n}</strong> selected` : "None selected";
      const actions = document.createElement("div");
      actions.className = "qm-footer__actions";
      actions.appendChild(this._btn("Clear", "qm-btn--ghost", () => this.clearAll(), n === 0));
      actions.appendChild(this._btn("Search", "qm-btn--primary", () => this.applyAndClose(), n === 0));
      this.el.dFooter.append(count, actions);
    }

    /* ---- MOBILE screen 1 (categories / cross-search) ------------------- */
    _renderScreen1() {
      const q = this.el.s1Search.value.trim().toLowerCase();
      this.el.s1List.innerHTML = "";
      if (q) {
        // cross-category search → flat list, each tagged with its category
        const matches = this.allItems.filter(it => it.code.toLowerCase().includes(q) || it.label.toLowerCase().includes(q) || it.catName.toLowerCase().includes(q));
        if (!matches.length) {
          this.el.s1List.appendChild(this._emptyState(q));
        } else matches.forEach(it => {
          const row = this._itemRow(it.catId, it.code, it.label, it.catName);
          this.el.s1List.appendChild(row);
        });
      } else if (this.narrowNav === "accordion") {
        this.categories.forEach(c => this.el.s1List.appendChild(this._accSection(c)));
      } else {
        this.categories.forEach(c => {
          const sel = this._countInCat(c.id);
          const row = document.createElement("button");
          row.type = "button";
          row.className = "qm-catrow";
          row.setAttribute("data-row", "");
          row.title = c.name;
          row.setAttribute("aria-label", `${c.name}${sel ? `, ${sel} selected` : ""}, ${c.items.length} options`);
          row.innerHTML = `<span class="qm-catrow__name">${esc(c.name)}</span>` + (sel ? `<span class="qm-catrow__badge">${sel}</span>` : "") + `<span class="qm-catrow__chev qm-chev">${ICONS.chevR}</span>`;
          row.addEventListener("click", () => this.openCategory(c.id));
          this.el.s1List.appendChild(row);
        });
      }
      this._renderMobileFooter();
    }

    /* ---- Accordion section (expanding-sections narrow mode) ------------- */
    _accSection(cat) {
      const sel = this._countInCat(cat.id);
      const open = this.expanded.has(cat.id);
      const sec = document.createElement("section");
      sec.className = "qm-acc";
      sec.setAttribute("data-acc", cat.id);
      sec.setAttribute("data-open", String(open));
      const head = document.createElement("button");
      head.type = "button";
      head.className = "qm-acc__head";
      head.setAttribute("data-row", "");
      head.setAttribute("aria-expanded", String(open));
      head.title = cat.name;
      head.setAttribute("aria-label", `${cat.name}${sel ? `, ${sel} selected` : ""}, ${cat.items.length} options`);
      head.innerHTML = `<span class="qm-acc__chev qm-chev">${ICONS.chevR}</span>` + `<span class="qm-catrow__name">${esc(cat.name)}</span>` + (sel ? `<span class="qm-catrow__badge" data-acc-badge>${sel}</span>` : `<span class="qm-catrow__badge" data-acc-badge hidden></span>`);
      head.addEventListener("click", () => this._toggleSection(cat.id, sec, head));
      const body = document.createElement("div");
      body.className = "qm-acc__body";
      const inner = document.createElement("div");
      inner.className = "qm-acc__inner";
      inner.appendChild(this._selectAllRow(cat));
      cat.items.forEach(([code, label]) => inner.appendChild(this._itemRow(cat.id, code, label)));
      body.appendChild(inner);
      sec.append(head, body);
      return sec;
    }
    _toggleSection(catId, sec, head) {
      const open = !this.expanded.has(catId);
      if (open) this.expanded.add(catId);else this.expanded.delete(catId);
      sec.setAttribute("data-open", String(open));
      head.setAttribute("aria-expanded", String(open));
    }
    openCategory(catId) {
      this.mobileCat = catId;
      this.el.s2Search.value = "";
      this._renderScreen2(catId);
      this.goScreen(2);
    }
    goScreen(n) {
      this.mobileScreen = n;
      this.el.sheet.setAttribute("data-screen", String(n));
      this._renderMobileFooter();
      requestAnimationFrame(() => {
        if (n === 2) this.panel.querySelector("[data-back]").focus();else this.el.s1Search.focus();
      });
    }

    /* ---- MOBILE screen 2 (items in one category) ----------------------- */
    _renderScreen2(catId) {
      const cat = this._catById(catId);
      this.el.s2Title.textContent = cat.name;
      this.el.s2Title.title = cat.name;
      this.el.s2Count.textContent = cat.items.length + " items";
      this.el.s2Search.placeholder = "Filter within " + cat.name;
      this.el.s2Search.setAttribute("aria-label", "Filter within " + cat.name);
      this.el.s2List.setAttribute("aria-label", cat.name + " options");
      // in-category search only shows for longer lists (> 15 options)
      this.el.s2SearchWrap.hidden = cat.items.length <= 15;
      if (cat.items.length <= 15) this.el.s2Search.value = "";
      this._renderScreen2List();
    }
    _renderScreen2List() {
      const cat = this._catById(this.mobileCat);
      const q = this.el.s2Search.value.trim().toLowerCase();
      this.el.s2List.innerHTML = "";
      const items = cat.items.filter(([code, label]) => !q || code.toLowerCase().includes(q) || label.toLowerCase().includes(q));
      if (!q) this.el.s2List.appendChild(this._selectAllRow(cat));
      if (!items.length) {
        this.el.s2List.appendChild(this._emptyState(this.el.s2Search.value.trim()));
        return;
      }
      items.forEach(([code, label]) => this.el.s2List.appendChild(this._itemRow(this.mobileCat, code, label)));
    }

    /* ---- Mobile footer (screen-dependent) ------------------------------ */
    _renderMobileFooter() {
      const n = this.staged.size;
      this.el.mFooter.innerHTML = "";
      const count = document.createElement("div");
      count.className = "qm-footer__count";
      count.setAttribute("aria-live", "polite");
      count.innerHTML = n ? `<strong>${n}</strong> selected` : "None selected";
      const actions = document.createElement("div");
      actions.className = "qm-footer__actions";
      if (this.mobileScreen === 2) {
        actions.appendChild(this._btn("Done", "qm-btn--primary", () => this.goScreen(1)));
      } else {
        actions.appendChild(this._btn("Clear", "qm-btn--ghost", () => this.clearAll(), n === 0));
        actions.appendChild(this._btn("Search", "qm-btn--primary", () => this.applyAndClose(), n === 0));
      }
      this.el.mFooter.append(count, actions);
    }

    /* ---- Shared row builders ------------------------------------------- */
    _itemRow(catId, code, label, catName) {
      const id = itemId(catId, code);
      const row = document.createElement("button");
      row.type = "button";
      row.className = "qm-row";
      row.setAttribute("data-row", "");
      row.setAttribute("role", "checkbox");
      const checked = this.staged.has(id);
      row.setAttribute("aria-checked", String(checked));
      row.setAttribute("data-checked", String(checked));
      row.setAttribute("data-id", id);
      // show just the option code as plain text (description kept for a11y only)
      const desc = label && label !== code ? label : "";
      row.setAttribute("aria-label", `${code}${catName ? `, ${catName}` : ""}${desc ? ` — ${desc}` : ""}`);
      if (desc) row.title = desc;
      row.innerHTML = `<span class="qm-check" aria-hidden="true"></span>` + `<span class="qm-row__code">${esc(code)}</span>` + (catName ? `<span class="qm-row__cat">${esc(catName)}</span>` : "");
      const toggle = () => this.toggleItem(id, row);
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", e => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      });
      return row;
    }
    _selectAllRow(cat) {
      const ids = cat.items.map(([code]) => itemId(cat.id, code));
      const sel = ids.filter(id => this.staged.has(id)).length;
      const state = sel === 0 ? "false" : sel === ids.length ? "true" : "mixed";
      const row = document.createElement("button");
      row.type = "button";
      row.className = "qm-row qm-row--all";
      row.setAttribute("data-row", "");
      row.setAttribute("role", "checkbox");
      row.setAttribute("aria-checked", state);
      row.setAttribute("data-checked", state);
      row.setAttribute("aria-label", "Select all in " + cat.name);
      row.innerHTML = `<span class="qm-check" aria-hidden="true"></span>` + `<span class="qm-row__label">Select all</span>` + `<span class="qm-row__cat">${ids.length}</span>`;
      const toggle = () => {
        // read live state so repeated clicks toggle correctly (all → deselect all)
        const selNow = ids.filter(id => this.staged.has(id)).length;
        const turnOn = selNow !== ids.length; // none/mixed → all; all → none
        ids.forEach(id => turnOn ? this.staged.add(id) : this.staged.delete(id));
        this._refreshAfterToggle();
      };
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", e => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      });
      return row;
    }
    toggleItem(id, row) {
      if (this.staged.has(id)) this.staged.delete(id);else this.staged.add(id);
      const checked = this.staged.has(id);
      row.setAttribute("aria-checked", String(checked));
      row.setAttribute("data-checked", String(checked));
      // update select-all + counts/footer without full re-render (keeps scroll/focus)
      this._refreshAfterToggle({
        skipRows: true
      });
    }

    // Refresh derived UI (select-all, badges, counts, footer) after a change.
    _refreshAfterToggle(opts = {}) {
      // Selections apply live: keep the committed set in sync on every toggle
      // and update the trigger chip immediately (not only on "Search").
      this.applied = new Set(this.staged);
      this._renderSummary();
      this.onChange && this.onChange(Array.from(this.applied));
      if (this.usesSheetView) {
        if (this.narrowNav === "accordion" && !this.el.s1Search.value.trim()) {
          // re-sync every open section's rows, select-all, and header badge
          this.el.s1List.querySelectorAll(".qm-acc").forEach(sec => {
            const catId = sec.getAttribute("data-acc");
            this._syncList(sec, catId);
            const badge = sec.querySelector("[data-acc-badge]");
            const sel = this._countInCat(catId);
            if (badge) {
              badge.textContent = String(sel);
              badge.hidden = sel === 0;
            }
          });
        } else if (this.mobileScreen === 2) {
          // re-sync select-all + every row's checked state in current list
          this._syncList(this.el.s2List, this.mobileCat);
        } else if (this.el.s1Search.value.trim()) {
          this._syncSearchList(this.el.s1List);
        }
        this._renderMobileFooter();
      } else if ((this.el.dSearch.value || "").trim() && !this.el.dSearchWrap.hidden) {
        // searching across categories → flat results: sync rows + every rail badge
        this._syncSearchList(this.el.dList);
        this.categories.forEach(c => this._syncCatBadge(c.id));
        this._renderDesktopFooter();
      } else {
        this._syncList(this.el.dList, this.activeCat);
        this._syncCatBadge(this.activeCat);
        this._renderDesktopFooter();
      }
    }

    // Update a desktop category row's selected-count badge in place.
    _syncCatBadge(catId) {
      const btn = this.el.cats.querySelector('[data-cat="' + catId + '"]');
      if (!btn) return;
      const n = this._countInCat(catId);
      let badge = btn.querySelector(".qm-cat__badge");
      if (n > 0) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "qm-cat__badge";
          btn.insertBefore(badge, btn.querySelector(".qm-cat__chev"));
        }
        badge.textContent = String(n);
      } else if (badge) {
        badge.remove();
      }
    }

    // Re-sync select-all row + item rows inside a category list container.
    _syncList(container, catId) {
      const cat = this._catById(catId);
      const ids = cat.items.map(([code]) => itemId(catId, code));
      const sel = ids.filter(id => this.staged.has(id)).length;
      const allRow = container.querySelector(".qm-row--all");
      if (allRow) {
        const state = sel === 0 ? "false" : sel === ids.length ? "true" : "mixed";
        allRow.setAttribute("aria-checked", state);
        allRow.setAttribute("data-checked", state);
      }
      container.querySelectorAll(".qm-row[data-id]").forEach(row => {
        const checked = this.staged.has(row.getAttribute("data-id"));
        row.setAttribute("aria-checked", String(checked));
        row.setAttribute("data-checked", String(checked));
      });
    }
    _syncSearchList(container) {
      container.querySelectorAll(".qm-row[data-id]").forEach(row => {
        const checked = this.staged.has(row.getAttribute("data-id"));
        row.setAttribute("aria-checked", String(checked));
        row.setAttribute("data-checked", String(checked));
      });
    }
    clearAll() {
      this.staged.clear();
      this.applied = new Set(this.staged);
      this._renderSummary();
      this.onChange && this.onChange(Array.from(this.applied));
      if (this.usesSheetView) this._renderScreen1();else this._renderDesktop();
    }
    _countInCat(catId) {
      return this._itemsByCat(catId).reduce((n, [code]) => n + (this.staged.has(itemId(catId, code)) ? 1 : 0), 0);
    }

    /* ---- Trigger summary ----------------------------------------------- */
    _renderSummary() {
      this.trigger.setAttribute("aria-controls", this.panelId);
      this.trigger.setAttribute("aria-haspopup", "dialog");
      if (!this.chip) return;

      // The × (clear) and the blue count badge are governed by CSS — hidden
      // at rest, revealed on hover/focus. JS just sets the state + content.
      const n = this.applied.size;
      const label = this.label;
      if (n === 0) {
        // empty → label + chevron
        this.chip.setAttribute("data-state", "empty");
        this.chipText.textContent = label;
        this.chipText.removeAttribute("title");
      } else if (n === 1) {
        // single → the selected value's code
        const id = this.applied.values().next().value;
        const code = id.slice(id.indexOf(":") + 1);
        this.chip.setAttribute("data-state", "single");
        this.chipText.textContent = code;
        this.chipText.title = code;
      } else {
        // multi → label + count badge (badge shown on hover/focus)
        this.chip.setAttribute("data-state", "multi");
        this.chipText.textContent = label;
        this.chipText.removeAttribute("title");
        this.chipBadge.textContent = String(n);
      }
      this.trigger.setAttribute("aria-label", n ? `${label} filter, ${n} selected` : `${label} filter`);
    }

    /* ---- Helpers ------------------------------------------------------- */
    _btn(label, cls, onClick, disabled) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "qm-btn " + cls;
      b.textContent = label;
      if (disabled) b.disabled = true;
      b.addEventListener("click", onClick);
      return b;
    }
    _emptyState(q) {
      const d = document.createElement("div");
      d.className = "qm-empty";
      d.innerHTML = `<div>No filings match <span class="qm-empty__q">"${esc(q)}"</span></div>`;
      const clr = this._btn("Clear search", "qm-btn--outline", () => {
        this.el.s1Search.value = "";
        this.el.s2Search.value = "";
        if (this.usesSheetView && this.mobileScreen === 2) this._renderScreen2List();else this._renderScreen1();
      });
      d.appendChild(clr);
      return d;
    }

    /* ---- Focus trap ---------------------------------------------------- */
    _trapTab(e) {
      const focusables = this.panel.querySelectorAll('button:not(:disabled), [href], input, [tabindex]:not([tabindex="-1"])');
      const visible = Array.prototype.filter.call(focusables, el => el.offsetParent !== null);
      if (!visible.length) return;
      const first = visible[0],
        last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    /* ---- Swipe-to-dismiss (mobile handle) ------------------------------ */
    _wireSwipe() {
      let startY = null,
        dy = 0;
      const handle = this.el.handle;
      const onDown = e => {
        if (this.mode !== "sheet") return; // swipe-to-dismiss is sheet-only
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        dy = 0;
        this.panel.style.transition = "none";
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      };
      const onMove = e => {
        if (startY === null) return;
        dy = Math.max(0, (e.touches ? e.touches[0].clientY : e.clientY) - startY);
        this.panel.style.transform = `translateY(${dy}px)`;
      };
      const onUp = () => {
        this.panel.style.transition = "";
        this.panel.style.transform = "";
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        if (dy > 110) this.dismiss();
        startY = null;
      };
      handle.addEventListener("pointerdown", onDown);
    }
    destroy() {
      try {
        this.overlay.remove();
      } catch (e) {}
      window.removeEventListener("resize", this._onResize);
      try {
        this.mqNarrow.removeEventListener("change", this._onResize);
      } catch (e) {}
      try {
        this.mqTouch.removeEventListener("change", this._onResize);
      } catch (e) {}
    }
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[c]);
  }

  /* ---- Boot ------------------------------------------------------------ */
  // Expose for embedding; each trigger declares its dataset via data-dataset.
  window.QMFilter = FilingFilter;
  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-qm-filter]").forEach(trigger => {
      const dataset = trigger.getAttribute("data-dataset") || "filings";
      const narrowNav = trigger.getAttribute("data-narrow-nav") || undefined;
      trigger._qm = new FilingFilter(trigger, {
        dataset,
        narrowNav
      });
    });

    // Optional checkbox to flip narrow nav live. data-qm-narrow-toggle="<id>"
    // targets one filter; empty targets every faceted filter on the page.
    document.querySelectorAll("[data-qm-narrow-toggle]").forEach(cb => {
      const id = cb.getAttribute("data-qm-narrow-toggle");
      const triggers = id ? [document.getElementById(id)] : Array.from(document.querySelectorAll("[data-qm-filter]"));
      const filters = triggers.map(t => t && t._qm).filter(Boolean);
      if (!filters.length) return;
      cb.checked = filters[0].narrowNav === "accordion";
      cb.addEventListener("change", () => filters.forEach(f => f.setNarrowNav(cb.checked ? "accordion" : "drilldown")));
    });
  });
})();
function FacetedMultiSelect({
  dataset = 'filings',
  categories,
  label,
  searchAll,
  mono,
  defaultIndex,
  narrowNav,
  value,
  onChange,
  style,
  ...rest
}) {
  const btnRef = React.useRef(null);
  const instRef = React.useRef(null);
  React.useEffect(() => {
    ensureQmFacetedCss();
    const opts = {
      dataset,
      narrowNav,
      onChange
    };
    if (categories) {
      opts.customDataset = {
        label: label || 'Filter',
        searchAll: searchAll || 'Search',
        categories,
        mono: !!mono,
        defaultIndex: defaultIndex || 0,
        narrow: narrowNav
      };
    }
    const inst = new window.QMFilter(btnRef.current, opts);
    instRef.current = inst;
    if (value && value.length) {
      inst.applied = new Set(value);
      inst.staged = new Set(value);
      inst._renderSummary();
    }
    return () => {
      try {
        inst.destroy();
      } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resolvedLabel = label || {
    filings: 'Filing type',
    sectors: 'Industry / sector',
    screener: 'Add filter criteria'
  }[dataset] || 'Filter';
  return /*#__PURE__*/React.createElement("div", {
    className: "qm-filter",
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "qm-chip",
    "data-state": "empty"
  }, /*#__PURE__*/React.createElement("button", _extends({
    ref: btnRef,
    className: "qm-chip__main",
    type: "button",
    "aria-haspopup": "dialog",
    "aria-expanded": "false"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "qm-chip__text",
    "data-chip-text": true
  }, resolvedLabel), /*#__PURE__*/React.createElement("span", {
    className: "qm-chip__badge",
    "data-chip-badge": true
  }), /*#__PURE__*/React.createElement("svg", {
    className: "qm-chip__chev",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  })))));
}
Object.assign(__ds_scope, { FacetedMultiSelect });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FacetedMultiSelect.jsx", error: String((e && e.message) || e) }); }

// components/forms/InputNumber.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii InputNumber — numeric field with steppers, modelled on PrimeVue's
 * InputNumber. Reuses the form-field tokens for the field and the form
 * label/helper tokens for `label` + `helperText`.
 *
 * Stepper layouts:
 *   'stacked'    — up/down chevrons stacked at the right edge (default)
 *   'horizontal' — − button left, + button right, value centered
 *   'none'       — no buttons
 *
 * `prefix`/`suffix` render inline (e.g. currency); `decimals` fixes the display
 * precision on blur; `min`/`max` clamp; `step` sizes each increment.
 */
const NUM_SIZES = {
  sm: {
    h: 28,
    px: 10,
    font: 14,
    lh: 20,
    btn: 28
  },
  md: {
    h: 32,
    px: 8,
    font: 14,
    lh: 20,
    btn: 32
  },
  lg: {
    h: 38,
    px: 14,
    font: 18,
    lh: 24,
    btn: 38
  }
};
function ChevBtn({
  dir,
  onStep,
  disabled,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    tabIndex: -1,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: e => {
      e.preventDefault();
      onStep();
    },
    onPointerDown: e => e.preventDefault(),
    "aria-label": dir > 0 ? 'Increment' : 'Decrement',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      background: hover && !disabled ? 'var(--surface-100)' : 'transparent',
      color: 'var(--form-field-icon-color)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: 0,
      outline: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      transform: dir > 0 ? 'none' : 'rotate(180deg)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 15l6-6 6 6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
function InputNumber({
  value,
  onChange,
  min,
  max,
  step = 1,
  decimals,
  prefix,
  suffix,
  buttonLayout = 'stacked',
  showButtons = true,
  size = 'md',
  invalid = false,
  disabled = false,
  fullWidth = false,
  label,
  helperText,
  helperTone = 'neutral',
  placeholder,
  id,
  style,
  ...rest
}) {
  const s = NUM_SIZES[size] || NUM_SIZES.md;
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const rid = React.useId();
  const inputId = id || rid;
  const clamp = v => {
    if (min != null) v = Math.max(min, v);
    if (max != null) v = Math.min(max, v);
    return v;
  };
  const fmt = v => v == null || v === '' ? '' : decimals != null ? Number(v).toFixed(decimals) : String(v);
  const display = focus ? draft : fmt(value);
  const commit = raw => {
    const n = parseFloat(raw);
    onChange && onChange(isNaN(n) ? null : clamp(n));
  };
  const stepBy = d => {
    const base = value == null || value === '' ? 0 : Number(value);
    onChange && onChange(clamp(base + d * step));
  };
  const border = disabled ? 'var(--form-field-border-color)' : invalid ? 'var(--form-field-invalid-border)' : focus ? 'var(--form-field-focus-border)' : hover ? 'var(--form-field-hover-border)' : 'var(--form-field-border-color)';
  const horizontal = showButtons && buttonLayout === 'horizontal';
  const stacked = showButtons && buttonLayout === 'stacked';
  const wrap = {
    display: 'inline-flex',
    alignItems: 'stretch',
    width: '100%',
    height: s.h,
    boxSizing: 'border-box',
    background: 'var(--form-field-bg)',
    border: `1px solid ${border}`,
    borderRadius: 'var(--radius-sm)',
    overflow: 'hidden',
    opacity: disabled ? 'var(--disabled-opacity)' : 1,
    transition: 'border-color var(--duration-fast) var(--ease)'
  };
  const field = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      minWidth: 0,
      gap: 4,
      padding: `0 ${s.px}px`,
      justifyContent: horizontal ? 'center' : 'flex-start'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--form-field-color)',
      fontFamily: 'var(--font-sans)',
      fontSize: s.font,
      flexShrink: 0
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    inputMode: "decimal",
    value: display,
    placeholder: placeholder,
    disabled: disabled,
    "aria-invalid": invalid || undefined,
    onFocus: () => {
      setDraft(value == null ? '' : String(value));
      setFocus(true);
    },
    onBlur: () => {
      setFocus(false);
      commit(draft);
    },
    onChange: e => {
      setDraft(e.target.value);
      const n = parseFloat(e.target.value);
      if (!isNaN(n)) onChange && onChange(n);
    },
    onKeyDown: e => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        stepBy(1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        stepBy(-1);
      }
    },
    style: {
      flex: horizontal ? '0 1 auto' : 1,
      width: horizontal ? 'auto' : undefined,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: s.font,
      lineHeight: `${s.lh}px`,
      color: 'var(--form-field-color)',
      textAlign: horizontal ? 'center' : 'left'
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--form-field-color)',
      fontFamily: 'var(--font-sans)',
      fontSize: s.font,
      flexShrink: 0
    }
  }, suffix));
  const tone = invalid && helperTone === 'neutral' ? 'error' : helperTone;
  const helperColor = tone === 'error' ? 'var(--form-helper-error)' : tone === 'positive' ? 'var(--form-helper-positive)' : 'var(--form-helper-neutral)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 'var(--form-label-gap)',
      width: fullWidth ? '100%' : undefined,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--form-label-size)',
      fontWeight: 'var(--form-label-weight)',
      color: 'var(--form-label-color)',
      lineHeight: 1.2
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: wrap,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, horizontal && /*#__PURE__*/React.createElement(MinusBtn, {
    onStep: () => stepBy(-1),
    disabled: disabled || min != null && Number(value) <= min,
    btn: s.btn
  }), field, stacked && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: 22,
      flexShrink: 0,
      borderLeft: '1px solid var(--surface-100)'
    }
  }, /*#__PURE__*/React.createElement(ChevBtn, {
    dir: 1,
    onStep: () => stepBy(1),
    disabled: disabled || max != null && Number(value) >= max,
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(ChevBtn, {
    dir: -1,
    onStep: () => stepBy(-1),
    disabled: disabled || min != null && Number(value) <= min,
    style: {
      flex: 1,
      borderTop: '1px solid var(--surface-100)'
    }
  })), horizontal && /*#__PURE__*/React.createElement(PlusBtn, {
    onStep: () => stepBy(1),
    disabled: disabled || max != null && Number(value) >= max,
    btn: s.btn
  })), helperText && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--form-helper-size)',
      lineHeight: 1.3,
      color: helperColor
    }
  }, helperText));
}

// horizontal steppers: dedicated − / + buttons flanking the field
function MinusBtn({
  onStep,
  disabled,
  btn
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    tabIndex: -1,
    disabled: disabled,
    "aria-label": "Decrement",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: e => {
      e.preventDefault();
      onStep();
    },
    onPointerDown: e => e.preventDefault(),
    style: {
      width: btn,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRight: '1px solid var(--form-field-border-color)',
      background: hover && !disabled ? 'var(--surface-100)' : 'var(--surface-50)',
      color: 'var(--form-field-icon-color)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })));
}
function PlusBtn({
  onStep,
  disabled,
  btn
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    tabIndex: -1,
    disabled: disabled,
    "aria-label": "Increment",
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: e => {
      e.preventDefault();
      onStep();
    },
    onPointerDown: e => e.preventDefault(),
    style: {
      width: btn,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderLeft: '1px solid var(--form-field-border-color)',
      background: hover && !disabled ? 'var(--surface-100)' : 'var(--surface-50)',
      color: 'var(--form-field-icon-color)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })));
}
Object.assign(__ds_scope, { InputNumber });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/InputNumber.jsx", error: String((e && e.message) || e) }); }

// components/forms/InputText.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii InputText — text field. 32px default height, 1px surface-200
 * border, primary border on focus (no ring, per field tokens).
 * Supports type="password", sizes, invalid state, leading/trailing icons,
 * an optional field `label`, and `helperText` (neutral / error / positive).
 */
function InputText({
  value,
  onChange,
  placeholder,
  type = 'text',
  size = 'md',
  invalid = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  label,
  helperText,
  helperTone = 'neutral',
  id,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      h: 28,
      px: 10,
      py: 4,
      font: 14,
      lh: 20
    },
    md: {
      h: 32,
      px: 8,
      py: 5,
      font: 14,
      lh: 20
    },
    lg: {
      h: 38,
      px: 14,
      py: 7,
      font: 18,
      lh: 24
    }
  };
  const s = sizes[size] || sizes.md;
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const rid = React.useId();
  const inputId = id || rid;
  const border = disabled ? 'var(--input-text-border-color)' : invalid ? 'var(--input-text-invalid-border)' : focus ? 'var(--input-text-focus-border)' : hover ? 'var(--input-text-hover-border)' : 'var(--input-text-border-color)';
  const wrap = {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    height: s.h,
    boxSizing: 'border-box',
    background: 'var(--input-text-bg)',
    border: `1px solid ${border}`,
    borderRadius: 'var(--input-text-radius)',
    padding: `0 ${s.px}px`,
    gap: 'var(--gap-md)',
    opacity: disabled ? 'var(--disabled-opacity)' : 1,
    transition: 'border-color var(--duration-fast) var(--ease)'
  };
  const input = {
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'var(--font-sans)',
    fontSize: s.font,
    lineHeight: `${s.lh}px`,
    color: 'var(--input-text-color)',
    padding: `${s.py}px 0`
  };
  const iconStyle = {
    display: 'inline-flex',
    color: 'var(--input-text-icon-color)',
    flexShrink: 0
  };
  const tone = invalid && helperTone === 'neutral' ? 'error' : helperTone;
  const helperColor = tone === 'error' ? 'var(--form-helper-error)' : tone === 'positive' ? 'var(--form-helper-positive)' : 'var(--form-helper-neutral)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 'var(--form-label-gap)',
      width: fullWidth ? '100%' : undefined,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--form-label-size)',
      fontWeight: 'var(--form-label-weight)',
      color: 'var(--form-label-color)',
      lineHeight: 1.2
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: wrap,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, leftIcon && /*#__PURE__*/React.createElement("span", {
    style: iconStyle
  }, leftIcon), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    "aria-invalid": invalid || undefined,
    style: input,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest)), rightIcon && /*#__PURE__*/React.createElement("span", {
    style: iconStyle
  }, rightIcon)), helperText && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--form-helper-size)',
      lineHeight: 1.3,
      color: helperColor
    }
  }, helperText));
}
Object.assign(__ds_scope, { InputText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/InputText.jsx", error: String((e && e.message) || e) }); }

// components/forms/ListItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii ListItem — a reusable menu / list row: optional leading checkbox and
 * icon, a label with optional sublabel, and trailing content (a checkmark by
 * default when `selected` and no checkbox). Used inside Select's overlay and
 * standalone in Listbox-style lists. States: hover, keyboard-`active`,
 * `selected`, `disabled`.
 */
function MiniCheck({
  checked
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 16,
      height: 16,
      flexShrink: 0,
      boxSizing: 'border-box',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${checked ? 'var(--check-checked-border)' : 'var(--check-border)'}`,
      background: checked ? 'var(--check-checked-bg)' : 'var(--check-bg)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease)'
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5",
    stroke: "var(--check-icon-color)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
function CheckIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flexShrink: 0,
      color: 'var(--list-item-selected-icon)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
function ListItem({
  icon,
  label,
  sublabel,
  trailing,
  selected = false,
  disabled = false,
  active = false,
  checkbox = false,
  checked = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const bg = disabled ? 'transparent' : selected ? 'var(--list-item-selected-bg)' : active || hover ? 'var(--list-item-hover-bg)' : 'transparent';
  const fg = disabled ? 'var(--list-item-disabled-fg)' : selected ? 'var(--list-item-selected-fg)' : 'var(--list-item-color)';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "option",
    "aria-selected": selected,
    "aria-disabled": disabled || undefined,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--list-item-gap)',
      padding: 'var(--list-item-padding-y) var(--list-item-padding-x)',
      borderRadius: 'var(--list-item-radius)',
      background: bg,
      color: fg,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 'var(--leading-sm)',
      opacity: disabled ? 'var(--disabled-opacity)' : 1,
      userSelect: 'none',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), checkbox && /*#__PURE__*/React.createElement(MiniCheck, {
    checked: checked
  }), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexShrink: 0,
      color: selected ? 'var(--list-item-selected-icon)' : 'var(--list-item-icon-color)'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      flex: 1,
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: selected ? 'var(--weight-medium)' : 'var(--weight-regular)'
    }
  }, label), sublabel != null && sublabel !== '' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--list-item-sublabel-fg)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, sublabel)), trailing !== undefined ? trailing : selected && !checkbox ? /*#__PURE__*/React.createElement(CheckIcon, null) : null);
}
Object.assign(__ds_scope, { ListItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ListItem.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii RadioButton — 17.5px circle. Checked = QM blue ring + dot.
 * Compose several with the same `name` for a group.
 */
function RadioButton({
  checked = false,
  onChange,
  label,
  value,
  name,
  size = 'md',
  disabled = false,
  style,
  ...rest
}) {
  const dim = {
    sm: 14,
    md: 17.5,
    lg: 21
  }[size] || 17.5;
  const dot = {
    sm: 5,
    md: 7,
    lg: 9
  }[size] || 7;
  const [hover, setHover] = React.useState(false);
  const [focusRing, setFocusRing] = React.useState(false);
  const border = disabled ? 'var(--surface-200)' : checked ? 'var(--primary)' : hover ? 'var(--surface-300)' : 'var(--surface-200)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--gap-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--disabled-opacity)' : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      userSelect: 'none',
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(value ?? e.target.checked),
    onFocus: e => {
      try {
        setFocusRing(e.target.matches(':focus-visible'));
      } catch (_) {
        setFocusRing(true);
      }
    },
    onBlur: () => setFocusRing(false),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim,
      height: dim,
      flexShrink: 0,
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${border}`,
      borderRadius: 'var(--radius-full)',
      background: 'var(--surface-0)',
      boxShadow: focusRing ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--duration-fast) var(--ease), box-shadow var(--duration-fast) var(--ease)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: dot,
      height: dot,
      borderRadius: 'var(--radius-full)',
      background: 'var(--primary)'
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { RadioButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Select — dropdown with an overlay option list. Field trigger matches
 * InputText; overlay is a surface-0 panel with 1px border and a primary-tinted
 * selected option (rows mirror the ListItem visual + tokens).
 *
 * Features: filter/search, grouped options, custom item template (icon + label
 * + sublabel), clear button, checkmark on selected, loading state, multi-select
 * (checkboxes), disabled options, and full keyboard nav (arrows / type-ahead).
 */
const SELECT_SIZES = {
  sm: {
    h: 28,
    px: 10,
    font: 14,
    lh: 20
  },
  md: {
    h: 32,
    px: 8,
    font: 14,
    lh: 20
  },
  lg: {
    h: 38,
    px: 14,
    font: 18,
    lh: 24
  }
};
function toGroups(options) {
  const norm = it => typeof it === 'string' ? {
    label: it,
    value: it
  } : it;
  const grouped = options.some(o => o && typeof o === 'object' && Array.isArray(o.items));
  if (grouped) return options.map(g => ({
    label: g.label,
    items: (g.items || []).map(norm)
  }));
  return [{
    label: null,
    items: options.map(norm)
  }];
}
function MiniCheck({
  checked
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 16,
      height: 16,
      flexShrink: 0,
      boxSizing: 'border-box',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${checked ? 'var(--check-checked-border)' : 'var(--surface-300)'}`,
      background: checked ? 'var(--check-checked-bg)' : 'var(--check-bg)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--duration-fast) var(--ease), border-color var(--duration-fast) var(--ease)'
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5",
    stroke: "var(--check-icon-color)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
function Spinner({
  size = 16
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flexShrink: 0,
      animation: 'qm-spin 0.7s linear infinite',
      color: 'var(--select-icon-color)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeOpacity: "0.25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 0-9-9",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }));
}
function OptionRow({
  item,
  selected,
  active,
  multiple,
  itemTemplate,
  onClick,
  innerRef
}) {
  const [hover, setHover] = React.useState(false);
  const disabled = !!item.disabled;
  const bg = disabled ? 'transparent' : selected && !multiple ? 'var(--list-item-selected-bg)' : active || hover ? 'var(--list-item-hover-bg)' : 'transparent';
  const fg = disabled ? 'var(--list-item-disabled-fg)' : selected ? 'var(--list-item-selected-fg)' : 'var(--list-item-color)';
  return /*#__PURE__*/React.createElement("div", {
    ref: innerRef,
    role: "option",
    "aria-selected": selected,
    "aria-disabled": disabled || undefined,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--list-item-gap)',
      padding: 'var(--list-item-padding-y) var(--list-item-padding-x)',
      borderRadius: 'var(--list-item-radius)',
      background: bg,
      color: fg,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 'var(--leading-sm)',
      opacity: disabled ? 'var(--disabled-opacity)' : 1,
      userSelect: 'none',
      boxSizing: 'border-box'
    }
  }, multiple && /*#__PURE__*/React.createElement(MiniCheck, {
    checked: selected
  }), itemTemplate ? /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, itemTemplate(item, {
    selected
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, item.icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexShrink: 0,
      color: selected ? 'var(--list-item-selected-icon)' : 'var(--list-item-icon-color)'
    }
  }, item.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      flex: 1,
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: selected ? 'var(--weight-medium)' : 'var(--weight-regular)'
    }
  }, item.label), item.sublabel != null && item.sublabel !== '' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--list-item-sublabel-fg)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, item.sublabel))), selected && !multiple && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flexShrink: 0,
      color: 'var(--list-item-selected-icon)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
function Select({
  value,
  onChange,
  options = [],
  placeholder = 'Select',
  size = 'md',
  invalid = false,
  disabled = false,
  fullWidth = false,
  filter = false,
  filterPlaceholder = 'Search',
  accordion = false,
  multiple = false,
  showClear = false,
  loading = false,
  itemTemplate,
  emptyMessage = 'No results found',
  maxOverlayHeight = 260,
  style,
  ...rest
}) {
  const s = SELECT_SIZES[size] || SELECT_SIZES.md;
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [focusRing, setFocusRing] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(-1);
  const [collapsed, setCollapsed] = React.useState({});
  const toggleGroup = label => setCollapsed(c => ({
    ...c,
    [label]: !c[label]
  }));
  const rootRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const filterRef = React.useRef(null);
  const listRef = React.useRef(null);
  const optRefs = React.useRef({});
  const typeahead = React.useRef({
    str: '',
    t: 0
  });
  const selectedValues = multiple ? Array.isArray(value) ? value : [] : value;
  const isSel = v => multiple ? selectedValues.includes(v) : value === v;
  const groups = React.useMemo(() => toGroups(options), [options]);
  const allItems = React.useMemo(() => groups.flatMap(g => g.items), [groups]);
  const selectedItems = allItems.filter(it => isSel(it.value));

  // Build the visible row list (group headers + options), applying the filter.
  const rows = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = it => !q || String(it.label).toLowerCase().includes(q) || it.sublabel && String(it.sublabel).toLowerCase().includes(q);
    const out = [];
    groups.forEach(g => {
      const items = g.items.filter(match);
      if (!items.length) return;
      if (g.label) {
        // when accordion, a collapsed section hides its items (search always expands)
        const expanded = !accordion || q ? true : !collapsed[g.label];
        out.push({
          type: 'group',
          label: g.label,
          expanded
        });
        if (!expanded) return;
      }
      items.forEach(it => out.push({
        type: 'option',
        item: it
      }));
    });
    return out;
  }, [groups, query, accordion, collapsed]);
  const selectableIdx = rows.map((r, i) => r.type === 'option' && !r.item.disabled ? i : -1).filter(i => i >= 0);
  const hasValue = multiple ? selectedItems.length > 0 : value != null && value !== '';
  React.useEffect(() => {
    const h = e => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close();
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // keep the active row in view
  React.useEffect(() => {
    if (!open) return;
    const el = optRefs.current[active],
      list = listRef.current;
    if (!el || !list) return;
    const top = el.offsetTop,
      bot = top + el.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top - 4;else if (bot > list.scrollTop + list.clientHeight) list.scrollTop = bot - list.clientHeight + 4;
  }, [active, open]);
  const openMenu = () => {
    if (disabled || loading) return;
    setOpen(true);
    const firstSel = rows.findIndex(r => r.type === 'option' && isSel(r.item.value) && !r.item.disabled);
    setActive(firstSel >= 0 ? firstSel : selectableIdx[0] ?? -1);
    if (filter) requestAnimationFrame(() => filterRef.current && filterRef.current.focus());
  };
  const close = () => {
    setOpen(false);
    setQuery('');
    setActive(-1);
  };
  const toggle = () => open ? close() : openMenu();
  const choose = item => {
    if (item.disabled) return;
    if (multiple) {
      const next = selectedValues.includes(item.value) ? selectedValues.filter(v => v !== item.value) : [...selectedValues, item.value];
      onChange && onChange(next);
      if (filter) filterRef.current && filterRef.current.focus();
    } else {
      onChange && onChange(item.value);
      close();
      triggerRef.current && triggerRef.current.focus();
    }
  };
  const clear = e => {
    e.stopPropagation();
    onChange && onChange(multiple ? [] : null);
  };
  const step = dir => {
    if (!selectableIdx.length) return;
    const pos = selectableIdx.indexOf(active);
    let next;
    if (pos === -1) next = dir > 0 ? selectableIdx[0] : selectableIdx[selectableIdx.length - 1];else next = selectableIdx[(pos + dir + selectableIdx.length) % selectableIdx.length];
    setActive(next);
  };
  const onKeyDown = e => {
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape', 'Home', 'End'].includes(e.key)) {
      if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) {
        e.preventDefault();
        openMenu();
        return;
      }
      if (!open) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        step(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        step(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActive(selectableIdx[0] ?? -1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActive(selectableIdx[selectableIdx.length - 1] ?? -1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const r = rows[active];
        if (r && r.type === 'option') choose(r.item);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        close();
        triggerRef.current && triggerRef.current.focus();
      }
      return;
    }
    if (e.key === ' ' && !filter) {
      e.preventDefault();
      if (!open) openMenu();else {
        const r = rows[active];
        if (r && r.type === 'option') choose(r.item);
      }
      return;
    }
    if (e.key === 'Tab') {
      close();
      return;
    }
    // type-ahead (only when there's no filter input capturing keys)
    if (!filter && e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const now = Date.now();
      typeahead.current.str = now - typeahead.current.t > 700 ? e.key : typeahead.current.str + e.key;
      typeahead.current.t = now;
      const q = typeahead.current.str.toLowerCase();
      if (!open) openMenu();
      const hit = rows.findIndex(r => r.type === 'option' && !r.item.disabled && String(r.item.label).toLowerCase().startsWith(q));
      if (hit >= 0) setActive(hit);
    }
  };
  const border = disabled ? 'var(--select-field-border-color)' : invalid ? 'var(--select-field-invalid-border)' : open ? 'var(--select-field-focus-border)' : hover ? 'var(--select-field-hover-border)' : 'var(--select-field-border-color)';
  const triggerLabel = multiple ? selectedItems.length ? selectedItems.map(i => i.label).join(', ') : placeholder : selectedItems[0] ? selectedItems[0].label : placeholder;
  return /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    style: {
      position: 'relative',
      display: 'inline-block',
      width: fullWidth ? '100%' : 220,
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes qm-spin{to{transform:rotate(360deg)}}'), /*#__PURE__*/React.createElement("button", _extends({
    ref: triggerRef,
    type: "button",
    disabled: disabled,
    role: "combobox",
    "aria-expanded": open,
    "aria-haspopup": "listbox",
    onClick: toggle,
    onKeyDown: onKeyDown,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: e => {
      try {
        setFocusRing(e.target.matches(':focus-visible'));
      } catch (_) {
        setFocusRing(true);
      }
    },
    onBlur: () => setFocusRing(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--gap-sm)',
      width: '100%',
      height: s.h,
      boxSizing: 'border-box',
      padding: `0 ${s.px}px`,
      background: 'var(--select-field-bg)',
      border: `1px solid ${border}`,
      borderRadius: 'var(--select-field-radius)',
      fontFamily: 'var(--font-sans)',
      fontSize: s.font,
      lineHeight: `${s.lh}px`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: hasValue ? 'var(--select-field-color)' : 'var(--select-field-placeholder)',
      opacity: disabled ? 'var(--disabled-opacity)' : 1,
      outline: 'none',
      boxShadow: focusRing ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--duration-fast) var(--ease), box-shadow var(--duration-fast) var(--ease)'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      flex: 1,
      textAlign: 'left'
    }
  }, triggerLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      flexShrink: 0
    }
  }, showClear && hasValue && !disabled && !loading && /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "Clear",
    tabIndex: -1,
    onClick: clear,
    onPointerDown: e => e.stopPropagation(),
    style: {
      display: 'inline-flex',
      color: 'var(--select-clear-icon-color)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))), loading ? /*#__PURE__*/React.createElement(Spinner, null) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      color: 'var(--select-icon-color)',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--duration-fast) var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'var(--overlay-bg)',
      border: '1px solid var(--overlay-border)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-overlay)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, filter && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-xs)',
      borderBottom: '1px solid var(--surface-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      height: 30,
      boxSizing: 'border-box',
      padding: '0 8px',
      border: '1px solid var(--form-field-border-color)',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--form-field-bg)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      color: 'var(--select-icon-color)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7",
    stroke: "currentColor",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4-4",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("input", {
    ref: filterRef,
    value: query,
    onChange: e => {
      setQuery(e.target.value);
    },
    onKeyDown: onKeyDown,
    placeholder: filterPlaceholder,
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--form-field-color)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    role: "listbox",
    "aria-multiselectable": multiple || undefined,
    style: {
      padding: 'var(--space-xs)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--select-list-gap)',
      maxHeight: maxOverlayHeight,
      overflowY: 'auto'
    }
  }, loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 8px',
      color: 'var(--select-empty-fg)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(Spinner, null), " Loading\u2026") : rows.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 8px',
      color: 'var(--select-empty-fg)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14
    }
  }, emptyMessage) : rows.map((r, i) => r.type === 'group' ? accordion ? /*#__PURE__*/React.createElement("button", {
    key: 'g' + i,
    type: "button",
    role: "presentation",
    onClick: () => toggleGroup(r.label),
    onPointerDown: e => e.preventDefault(),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 6,
      boxSizing: 'border-box',
      padding: '7px 10px',
      margin: '2px calc(var(--space-xs) * -1)',
      border: 'none',
      background: 'var(--select-group-bg)',
      borderRadius: 0,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--select-group-size)',
      fontWeight: 'var(--weight-semibold)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      color: 'var(--select-group-fg)',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", null, r.label), /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flexShrink: 0,
      transform: r.expanded ? 'none' : 'rotate(180deg)',
      transition: 'transform var(--duration-fast) var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 15l6-6 6 6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))) : /*#__PURE__*/React.createElement("div", {
    key: 'g' + i,
    style: {
      padding: '8px 8px 4px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--select-group-size)',
      fontWeight: 'var(--weight-semibold)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      color: 'var(--select-group-fg)'
    }
  }, r.label) : /*#__PURE__*/React.createElement(OptionRow, {
    key: 'o' + i,
    item: r.item,
    selected: isSel(r.item.value),
    active: active === i,
    multiple: multiple,
    itemTemplate: itemTemplate,
    onClick: () => choose(r.item),
    innerRef: el => {
      if (el) optRefs.current[i] = el;
    }
  })))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/ToggleButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii ToggleButton group — segmented control on a surface-50 track.
 * The selected segment lifts to a white "content" card. Common for
 * chart type, view density, or timeframe toggles.
 */
function ToggleButton({
  options = [],
  value,
  onChange,
  size = 'md',
  disabled = false,
  style,
  ...rest
}) {
  const norm = options.map(o => typeof o === 'string' ? {
    label: o,
    value: o
  } : o);
  const cfg = {
    sm: {
      pad: '1px 10.5px',
      font: 12.25,
      lh: 16
    },
    md: {
      pad: '1px 14px',
      font: 14,
      lh: 20
    },
    lg: {
      pad: '2px 17.5px',
      font: 15.75,
      lh: 24
    }
  }[size] || {
    pad: '1px 14px',
    font: 14,
    lh: 20
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "group",
    style: {
      display: 'inline-flex',
      gap: 'var(--gap-sm)',
      padding: 4,
      background: 'var(--surface-50)',
      border: '1px solid var(--surface-50)',
      borderRadius: 'var(--radius-sm)',
      opacity: disabled ? 'var(--disabled-opacity)' : 1,
      ...style
    }
  }, rest), norm.map(o => {
    const sel = o.value === value;
    return /*#__PURE__*/React.createElement(Seg, {
      key: o.value,
      option: o,
      selected: sel,
      pad: cfg.pad,
      font: cfg.font,
      lh: cfg.lh,
      disabled: disabled,
      onClick: () => !disabled && onChange && onChange(o.value)
    });
  }));
}
function Seg({
  option,
  selected,
  pad,
  font,
  lh,
  disabled,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const [focusRing, setFocusRing] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: e => {
      try {
        setFocusRing(e.target.matches(':focus-visible'));
      } catch (_) {
        setFocusRing(true);
      }
    },
    onBlur: () => setFocusRing(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--gap-md)',
      padding: pad,
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      outline: 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: font,
      fontWeight: selected ? 'var(--weight-medium)' : 'var(--weight-regular)',
      lineHeight: `${lh}px`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: selected ? 'var(--surface-0)' : 'transparent',
      color: selected ? 'var(--surface-900)' : hover ? 'var(--surface-700)' : 'var(--text-secondary)',
      boxShadow: focusRing ? 'var(--focus-ring)' : selected ? 'var(--shadow-xs)' : 'none',
      transition: 'background var(--duration-fast) var(--ease), color var(--duration-fast) var(--ease), box-shadow var(--duration-fast) var(--ease)'
    }
  }, option.icon, option.label);
}
Object.assign(__ds_scope, { ToggleButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ToggleButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/ToggleSwitch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii ToggleSwitch — 35×21 track, 14px handle. Off = surface-300 track;
 * On = QM blue track. Track hover darkens.
 */
function ToggleSwitch({
  checked = false,
  onChange,
  label,
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [focusRing, setFocusRing] = React.useState(false);
  const trackOff = hover && !disabled ? 'var(--switch-track-off-hover)' : 'var(--switch-track-off)';
  const trackOn = hover && !disabled ? 'var(--switch-track-on-hover)' : 'var(--switch-track-on)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--gap-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 'var(--disabled-opacity)' : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      userSelect: 'none',
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked),
    onFocus: e => {
      try {
        setFocusRing(e.target.matches(':focus-visible'));
      } catch (_) {
        setFocusRing(true);
      }
    },
    onBlur: () => setFocusRing(false),
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 35,
      height: 21,
      flexShrink: 0,
      borderRadius: 'var(--radius-full)',
      background: disabled ? 'var(--switch-track-disabled)' : checked ? trackOn : trackOff,
      boxShadow: focusRing ? 'var(--focus-ring)' : 'none',
      transition: 'background var(--duration-base) var(--ease), box-shadow var(--duration-fast) var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3.5,
      left: checked ? 17.5 : 3.5,
      width: 14,
      height: 14,
      borderRadius: 'var(--radius-full)',
      background: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      transition: 'left var(--duration-base) var(--ease)'
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { ToggleSwitch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ToggleSwitch.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Accordion — stacked collapsible panels. 1px surface-200 borders,
 * semibold headers, chevron toggle. `multiple` allows several open at once.
 */
function Accordion({
  items = [],
  multiple = false,
  defaultOpen = [],
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = i => setOpen(prev => {
    const next = new Set(multiple ? prev : []);
    if (prev.has(i)) next.delete(i);else next.add(i);
    return next;
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: '1px solid var(--surface-200)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)',
      ...style
    }
  }, rest), items.map((it, i) => {
    const isOpen = open.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderTop: i === 0 ? 'none' : '1px solid var(--surface-200)'
      }
    }, /*#__PURE__*/React.createElement(Header, {
      title: it.title,
      isOpen: isOpen,
      onClick: () => toggle(i)
    }), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 8px 12px',
        fontSize: 14,
        lineHeight: 'var(--leading-normal)',
        color: 'var(--text-primary)'
      }
    }, it.content));
  }));
}
function Header({
  title,
  isOpen,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '6px 8px',
      border: 'none',
      background: 'var(--surface-0)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 'var(--leading-base)',
      color: isOpen || hover ? 'var(--text-primary)' : 'var(--text-muted)',
      textAlign: 'left'
    }
  }, title, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flexShrink: 0,
      transform: isOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--duration-fast) var(--ease)',
      color: isOpen || hover ? 'var(--text-primary)' : 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Card — border-first container, structured like PrimeVue's Card
 * (header / body › caption › content › footer). surface-0 background, 1px
 * surface-200 border, 4px radius, low-elevation by default (pass `raised`
 * for an overlay shadow). All geometry is token-driven — padding and gaps
 * come from the --card-* variables so a theme can retune density.
 */
function Card({
  title,
  subtitle,
  actions,
  header,
  footer,
  children,
  raised = false,
  style,
  bodyStyle,
  ...rest
}) {
  const hasCaption = title || subtitle || actions;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--card-bg)',
      border: '1px solid var(--card-border)',
      borderRadius: 'var(--card-radius)',
      boxShadow: raised ? 'var(--card-shadow)' : 'none',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      color: 'var(--card-fg)',
      ...style
    }
  }, rest), header && /*#__PURE__*/React.createElement("div", {
    className: "qm-card-header"
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--card-padding)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--card-gap)',
      fontSize: 14,
      lineHeight: 'var(--leading-base)',
      ...bodyStyle
    }
  }, hasCaption && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--gap-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--card-caption-gap)',
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--card-title-size)',
      fontWeight: 'var(--card-title-weight)',
      color: 'var(--card-title-fg)',
      lineHeight: 1.2
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--card-subtitle-fg)',
      lineHeight: 1.3
    }
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0
    }
  }, actions)), children != null && children !== false && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--card-content-padding)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 'var(--card-footer-padding-top)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const EXIT_MS = 200; // keep in sync with --motion-exit-duration

/** Respect the user's reduced-motion preference. */
function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!m) return;
    const on = () => setReduce(m.matches);
    on();
    m.addEventListener ? m.addEventListener('change', on) : m.addListener(on);
    return () => {
      m.removeEventListener ? m.removeEventListener('change', on) : m.removeListener(on);
    };
  }, []);
  return reduce;
}

/**
 * Qmodii Dialog — centered modal over a 40% scrim. surface-0 panel, 4px
 * radius, 16px padding, 16px title. Header (title + close), body, and optional
 * footer actions.
 *
 * Open/close use M3 "emphasized" motion: enter 400ms decelerate (fade + rise +
 * subtle scale), exit 200ms accelerate. Honors prefers-reduced-motion.
 *
 * Keyboard: Escape dismisses (onClose); Enter completes the primary action
 * (onConfirm), skipped when focus is in a textarea or on a button/link inside
 * the dialog. On open, focus moves to [data-autofocus] (or the panel).
 */
function Dialog({
  open,
  onClose,
  onConfirm,
  title,
  children,
  footer,
  width = 420,
  style,
  ...rest
}) {
  const [mounted, setMounted] = React.useState(open);
  const [shown, setShown] = React.useState(false);
  const reduce = usePrefersReducedMotion();
  const panelRef = React.useRef(null);

  // Escape dismisses; Enter completes the primary action (unless focus is in a
  // textarea, or on a button/link the user is about to activate themselves).
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose && onClose();
      } else if (e.key === 'Enter' && onConfirm) {
        const t = e.target;
        const tag = t && t.tagName;
        if (tag === 'TEXTAREA') return;
        if ((tag === 'BUTTON' || tag === 'A') && panelRef.current && panelRef.current.contains(t)) return;
        e.preventDefault();
        onConfirm();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, onConfirm]);
  React.useEffect(() => {
    if (open) {
      setMounted(true);
      const r = requestAnimationFrame(() => requestAnimationFrame(() => {
        setShown(true);
        // move focus into the dialog so keys are captured & focus is trapped
        const p = panelRef.current;
        if (p) {
          const target = p.querySelector('[data-autofocus]') || p;
          target.focus();
        }
      }));
      return () => cancelAnimationFrame(r);
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), reduce ? 0 : EXIT_MS);
    return () => clearTimeout(t);
  }, [open, reduce]);
  if (!mounted) return null;
  const dur = shown ? 'var(--motion-enter-duration)' : 'var(--motion-exit-duration)';
  const ease = shown ? 'var(--motion-enter-ease)' : 'var(--motion-exit-ease)';
  const panelTransition = reduce ? undefined : `opacity ${dur} ${ease}, transform ${dur} ${ease}`;
  const scrimTransition = reduce ? undefined : `opacity var(--motion-scrim-duration) linear`;
  return /*#__PURE__*/React.createElement("div", {
    onMouseDown: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'var(--mask-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      opacity: shown ? 1 : 0,
      transition: scrimTransition
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    ref: panelRef,
    role: "dialog",
    "aria-modal": "true",
    tabIndex: -1,
    onMouseDown: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      maxHeight: '90vh',
      overflow: 'auto',
      background: 'var(--surface-0)',
      border: '1px solid var(--surface-200)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-dialog)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column',
      opacity: shown ? 1 : 0,
      transform: shown ? 'none' : 'translateY(16px) scale(0.96)',
      transformOrigin: 'center',
      transition: panelTransition,
      willChange: 'opacity, transform',
      outline: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--gap-md)',
      padding: '16px 16px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 'var(--weight-semibold)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      border: 'none',
      background: 'transparent',
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 16px',
      fontSize: 14,
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-secondary)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--gap-md)',
      padding: '0 16px 16px'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Divider — separates content, modelled on PrimeVue's Divider.
 * `layout` horizontal (default) or vertical; `type` solid / dashed / dotted;
 * `align` positions optional inline content. Styled from --divider-* tokens.
 *
 * Vertical dividers stretch to the parent's height — place inside a flex row.
 */
function Divider({
  layout = 'horizontal',
  type = 'solid',
  align,
  children,
  style,
  ...rest
}) {
  const color = 'var(--divider-color)';
  if (layout === 'vertical') {
    return /*#__PURE__*/React.createElement("div", _extends({
      role: "separator",
      "aria-orientation": "vertical",
      style: {
        alignSelf: 'stretch',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '1em',
        margin: '0 var(--divider-margin)',
        borderLeft: `var(--divider-thickness) ${type} ${color}`,
        ...style
      }
    }, rest), children && /*#__PURE__*/React.createElement("span", {
      style: {
        background: 'var(--surface-0)',
        color: 'var(--divider-content-fg)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--divider-content-size)',
        padding: 'var(--divider-content-gap) 0',
        whiteSpace: 'nowrap'
      }
    }, children));
  }
  const line = grow => /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flex: grow ? 1 : '0 0 8px',
      height: 0,
      borderTop: `var(--divider-thickness) ${type} ${color}`
    }
  });
  if (!children) {
    return /*#__PURE__*/React.createElement("div", _extends({
      role: "separator",
      "aria-orientation": "horizontal",
      style: {
        borderTop: `var(--divider-thickness) ${type} ${color}`,
        margin: 'var(--divider-margin) 0',
        ...style
      }
    }, rest));
  }
  const a = align || 'center';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    "aria-orientation": "horizontal",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--divider-content-gap)',
      margin: 'var(--divider-margin) 0',
      ...style
    }
  }, rest), line(a !== 'left'), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--divider-content-fg)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--divider-content-size)',
      whiteSpace: 'nowrap'
    }
  }, children), line(a !== 'right'));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Divider.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Drawer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const EXIT_MS = 200; // keep in sync with --motion-exit-duration

/** Respect the user's reduced-motion preference. */
function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!m) return;
    const on = () => setReduce(m.matches);
    on();
    m.addEventListener ? m.addEventListener('change', on) : m.addListener(on);
    return () => {
      m.removeEventListener ? m.removeEventListener('change', on) : m.removeListener(on);
    };
  }, []);
  return reduce;
}

/**
 * Qmodii Drawer — edge-anchored panel over a scrim. surface-0, 1px border on
 * the inner edge, header + body + optional footer. Slides from any side.
 *
 * Open/close use M3 "emphasized" motion: enter 400ms decelerate (slide in),
 * exit 200ms accelerate. Honors prefers-reduced-motion.
 */
function Drawer({
  open,
  onClose,
  title,
  position = 'right',
  children,
  footer,
  size = 320,
  style,
  ...rest
}) {
  const [mounted, setMounted] = React.useState(open);
  const [shown, setShown] = React.useState(false);
  const reduce = usePrefersReducedMotion();
  React.useEffect(() => {
    if (open) {
      setMounted(true);
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(r);
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), reduce ? 0 : EXIT_MS);
    return () => clearTimeout(t);
  }, [open, reduce]);
  if (!mounted) return null;
  const horizontal = position === 'left' || position === 'right';
  const hidden = position === 'right' ? 'translateX(100%)' : position === 'left' ? 'translateX(-100%)' : position === 'top' ? 'translateY(-100%)' : 'translateY(100%)';
  const dur = shown ? 'var(--motion-enter-duration)' : 'var(--motion-exit-duration)';
  const ease = shown ? 'var(--motion-enter-ease)' : 'var(--motion-exit-ease)';
  const panelTransition = reduce ? undefined : `transform ${dur} ${ease}`;
  const scrimTransition = reduce ? undefined : `opacity var(--motion-scrim-duration) linear`;
  const panel = {
    position: 'absolute',
    top: horizontal ? 0 : position === 'top' ? 0 : 'auto',
    bottom: horizontal ? 0 : position === 'bottom' ? 0 : 'auto',
    left: position === 'right' ? 'auto' : 0,
    right: position === 'left' ? 'auto' : 0,
    width: horizontal ? size : 'auto',
    height: horizontal ? 'auto' : size,
    background: 'var(--surface-0)',
    borderLeft: position === 'right' ? '1px solid var(--surface-200)' : 'none',
    borderRight: position === 'left' ? '1px solid var(--surface-200)' : 'none',
    borderTop: position === 'bottom' ? '1px solid var(--surface-200)' : 'none',
    borderBottom: position === 'top' ? '1px solid var(--surface-200)' : 'none',
    boxShadow: 'var(--shadow-dialog)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'var(--font-sans)',
    color: 'var(--text-primary)',
    transform: shown ? 'none' : hidden,
    transition: panelTransition,
    willChange: 'transform',
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    onMouseDown: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'var(--mask-bg)',
      opacity: shown ? 1 : 0,
      transition: scrimTransition
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    onMouseDown: e => e.stopPropagation(),
    style: panel
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--gap-md)',
      padding: '8px 12px',
      borderBottom: '1px solid var(--surface-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 'var(--weight-semibold)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      border: 'none',
      background: 'transparent',
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 12,
      fontSize: 14,
      lineHeight: 'var(--leading-normal)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 12px',
      borderTop: '1px solid var(--surface-200)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Menu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Menu — command / context menu, modelled on PrimeVue's Menu.
 *
 * `model` is a flat array of items:
 *   { label, icon?, command?, disabled?, url?, target? }
 *   { separator: true }                      → a divider
 *   { label, items: [...] }                  → a submenu-label group (a heading
 *                                              followed by its items)
 *
 * Inline by default. Pass a `trigger` element for popup mode: it toggles a
 * panel anchored below the trigger, closes on outside-click / Esc, and is
 * keyboard-operable (↑/↓ move, Enter/Space activate, Esc close).
 */
function CaretIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
function MenuItemRow({
  item,
  active,
  onActivate,
  onHover,
  innerRef
}) {
  const [hover, setHover] = React.useState(false);
  const disabled = !!item.disabled;
  const on = (active || hover) && !disabled;
  const Tag = item.url ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Tag, {
    ref: innerRef,
    role: "menuitem",
    "aria-disabled": disabled || undefined,
    href: item.url || undefined,
    target: item.target || undefined,
    onClick: disabled ? undefined : onActivate,
    onMouseEnter: () => {
      setHover(true);
      onHover && onHover();
    },
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--menu-item-gap)',
      padding: '7px 10px',
      borderRadius: 'var(--menu-item-radius)',
      background: on ? 'var(--menu-item-focus-bg)' : 'transparent',
      color: disabled ? 'var(--list-item-disabled-fg)' : on ? 'var(--menu-item-focus-fg)' : 'var(--menu-item-fg)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 'var(--leading-sm)',
      opacity: disabled ? 'var(--disabled-opacity)' : 1,
      userSelect: 'none',
      boxSizing: 'border-box'
    }
  }, item.icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexShrink: 0,
      color: on && !disabled ? 'var(--menu-item-focus-fg)' : 'var(--menu-item-icon)'
    }
  }, item.icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, item.label), item.shortcut && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontSize: 12,
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)'
    }
  }, item.shortcut));
}
function Panel({
  model,
  onClose,
  style
}) {
  // flatten to rows, tracking which are activatable
  const rows = [];
  model.forEach((it, i) => {
    if (it.separator) {
      rows.push({
        type: 'sep',
        key: 's' + i
      });
      return;
    }
    if (Array.isArray(it.items)) {
      rows.push({
        type: 'group',
        key: 'g' + i,
        label: it.label
      });
      it.items.forEach((sub, j) => rows.push({
        type: 'item',
        key: 'g' + i + 'i' + j,
        item: sub
      }));
    } else {
      rows.push({
        type: 'item',
        key: 'i' + i,
        item: it
      });
    }
  });
  const itemIdx = rows.map((r, i) => r.type === 'item' && !r.item.disabled ? i : -1).filter(i => i >= 0);
  const [active, setActive] = React.useState(-1);
  const refs = React.useRef({});
  const listRef = React.useRef(null);
  const activate = item => {
    if (item.disabled) return;
    item.command && item.command();
    onClose && onClose();
  };
  const move = dir => {
    if (!itemIdx.length) return;
    const pos = itemIdx.indexOf(active);
    const next = pos === -1 ? dir > 0 ? itemIdx[0] : itemIdx[itemIdx.length - 1] : itemIdx[(pos + dir + itemIdx.length) % itemIdx.length];
    setActive(next);
    const el = refs.current[next];
    if (el) el.focus();
  };
  const onKeyDown = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      move(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(itemIdx[0] ?? -1);
      const el = refs.current[itemIdx[0]];
      if (el) el.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = itemIdx[itemIdx.length - 1];
      setActive(last ?? -1);
      const el = refs.current[last];
      if (el) el.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      const r = rows[active];
      if (r && r.type === 'item') {
        e.preventDefault();
        activate(r.item);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose && onClose();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    role: "menu",
    onKeyDown: onKeyDown,
    style: {
      background: 'var(--menu-bg)',
      border: '1px solid var(--menu-border)',
      borderRadius: 'var(--menu-radius)',
      boxShadow: 'var(--menu-shadow)',
      padding: 'var(--space-xs)',
      minWidth: 200,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--menu-list-gap)',
      ...style
    }
  }, rows.map((r, i) => r.type === 'sep' ? /*#__PURE__*/React.createElement("div", {
    key: r.key,
    role: "separator",
    style: {
      height: 1,
      background: 'var(--menu-separator-border)',
      margin: '4px calc(var(--space-xs) * -1)'
    }
  }) : r.type === 'group' ? /*#__PURE__*/React.createElement("div", {
    key: r.key,
    style: {
      padding: '8px 10px 4px',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 'var(--menu-submenu-label-weight)',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      color: 'var(--menu-submenu-label-fg)'
    }
  }, r.label) : /*#__PURE__*/React.createElement(MenuItemRow, {
    key: r.key,
    item: r.item,
    active: active === i,
    onActivate: () => activate(r.item),
    onHover: () => setActive(i),
    innerRef: el => {
      if (el) refs.current[i] = el;
    }
  })));
}
function Menu({
  model = [],
  trigger,
  align = 'left',
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = e => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  if (!trigger) return /*#__PURE__*/React.createElement(Panel, _extends({
    model: model,
    style: style
  }, rest));
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: rootRef,
    style: {
      position: 'relative',
      display: 'inline-block'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(o => !o),
    style: {
      display: 'inline-flex'
    }
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      [align === 'right' ? 'right' : 'left']: 0,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    model: model,
    onClose: () => setOpen(false),
    style: style
  })));
}
Object.assign(__ds_scope, { Menu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Menu.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/TabMenu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii TabMenu — navigation tabs (no content panels), modelled on PrimeVue's
 * TabMenu. Two styles: 'underline' (QM-blue bar under the active item, default)
 * and 'chip' (pill tabs on a surface-50 track). Items may be links (`url`) or
 * plain buttons. Controlled via `value`/`onChange` or uncontrolled with
 * `defaultValue`. Styled from --tab-* tokens.
 */
function TabMenu({
  model = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  style,
  ...rest
}) {
  const firstVal = model[0] ? model[0].value ?? 0 : undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? firstVal);
  const active = value !== undefined ? value : internal;
  const chip = variant === 'chip';
  const select = (v, item) => {
    if (item.disabled) return;
    setInternal(v);
    onChange && onChange(v, item);
  };
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: chip ? 'var(--gap-md)' : 'var(--space-lg)',
      padding: 0,
      background: 'transparent',
      borderRadius: 0,
      borderBottom: chip ? 'none' : '1px solid var(--tab-border)',
      width: chip ? 'fit-content' : '100%'
    }
  }, model.map((t, i) => {
    const v = t.value ?? i;
    return /*#__PURE__*/React.createElement(TabNavItem, {
      key: v,
      tab: t,
      active: v === active,
      chip: chip,
      onSelect: () => select(v, t)
    });
  })));
}
function TabNavItem({
  tab,
  active,
  chip,
  onSelect
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = tab.url ? 'a' : 'button';
  const common = {
    href: tab.url || undefined,
    target: tab.target || undefined,
    role: 'tab',
    'aria-selected': active,
    'aria-disabled': tab.disabled || undefined,
    onClick: e => {
      if (tab.url && tab.disabled) e.preventDefault();
      onSelect();
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  };
  if (chip) {
    return /*#__PURE__*/React.createElement(Tag, _extends({}, common, {
      type: tab.url ? undefined : 'button',
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--gap-md)',
        height: 32,
        padding: '0 12px',
        border: `1px solid ${active ? 'var(--tab-chip-selected-border)' : hover ? 'var(--tab-chip-hover-border)' : 'var(--tab-chip-border)'}`,
        borderRadius: 'var(--radius-sm)',
        background: active ? 'var(--tab-chip-selected-bg)' : 'var(--tab-chip-bg)',
        color: active ? 'var(--tab-chip-selected-fg)' : 'var(--tab-fg)',
        textDecoration: 'none',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: active ? 'var(--tab-active-weight)' : 'var(--weight-regular)',
        cursor: tab.disabled ? 'not-allowed' : 'pointer',
        opacity: tab.disabled ? 'var(--disabled-opacity)' : 1,
        transition: 'border-color var(--duration-fast) var(--ease), background var(--duration-fast) var(--ease)',
        outline: 'none'
      }
    }), tab.icon, tab.label);
  }
  return /*#__PURE__*/React.createElement(Tag, _extends({}, common, {
    type: tab.url ? undefined : 'button',
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--gap-md)',
      height: 32,
      padding: 0,
      border: 'none',
      background: 'transparent',
      textDecoration: 'none',
      cursor: tab.disabled ? 'not-allowed' : 'pointer',
      opacity: tab.disabled ? 'var(--disabled-opacity)' : 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 'var(--tab-active-weight)',
      color: active ? 'var(--tab-active-fg)' : hover ? 'var(--text-primary)' : 'var(--tab-fg)',
      outline: 'none'
    }
  }), tab.icon, tab.label, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -1,
      height: 2,
      background: active ? 'var(--tab-active-bar)' : 'transparent',
      borderRadius: 1
    }
  }));
}
Object.assign(__ds_scope, { TabMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/TabMenu.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Qmodii Tabs — horizontal tab navigation. Two styles:
 *  - 'traditional' (default): underline bar in QM blue under the active tab
 *  - 'chip': pill tabs on a surface-50 track
 * Controlled via `value`/`onChange` or uncontrolled with `defaultValue`.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  variant = 'traditional',
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (tabs[0] && tabs[0].value));
  const active = value !== undefined ? value : internal;
  const select = v => {
    setInternal(v);
    onChange && onChange(v);
  };
  const chip = variant === 'chip';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: chip ? 'var(--gap-md)' : 'var(--space-lg)',
      padding: 0,
      background: 'transparent',
      borderRadius: 0,
      borderBottom: chip ? 'none' : '1px solid var(--surface-200)',
      width: chip ? 'fit-content' : '100%'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement(TabBtn, {
    key: t.value,
    tab: t,
    active: t.value === active,
    chip: chip,
    onClick: () => select(t.value)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 0',
      fontSize: 14,
      lineHeight: 'var(--leading-normal)',
      color: 'var(--text-primary)'
    }
  }, (tabs.find(t => t.value === active) || {}).content));
}
function TabBtn({
  tab,
  active,
  chip,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  if (chip) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--gap-md)',
        height: 32,
        padding: '0 12px',
        border: `1px solid ${active ? 'var(--tab-chip-selected-border)' : hover ? 'var(--tab-chip-hover-border)' : 'var(--tab-chip-border)'}`,
        borderRadius: 'var(--radius-sm)',
        background: active ? 'var(--tab-chip-selected-bg)' : 'var(--tab-chip-bg)',
        color: active ? 'var(--tab-chip-selected-fg)' : 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: active ? 'var(--weight-semibold)' : 'var(--weight-regular)',
        cursor: 'pointer',
        transition: 'border-color var(--duration-fast) var(--ease), background var(--duration-fast) var(--ease)'
      }
    }, tab.icon, tab.label);
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--gap-md)',
      height: 32,
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 'var(--weight-semibold)',
      color: active ? 'var(--primary)' : hover ? 'var(--text-primary)' : 'var(--text-secondary)'
    }
  }, tab.icon, tab.label, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -1,
      height: 2,
      background: active ? 'var(--primary)' : 'transparent',
      borderRadius: 1
    }
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AreaChart = __ds_scope.AreaChart;

__ds_ns.CandlestickChart = __ds_scope.CandlestickChart;

__ds_ns.Change = __ds_scope.Change;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.Paginator = __ds_scope.Paginator;

__ds_ns.SymbolTag = __ds_scope.SymbolTag;

__ds_ns.TimeHorizon = __ds_scope.TimeHorizon;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Message = __ds_scope.Message;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.DatePicker = __ds_scope.DatePicker;

__ds_ns.FacetedMultiSelect = __ds_scope.FacetedMultiSelect;

__ds_ns.InputNumber = __ds_scope.InputNumber;

__ds_ns.InputText = __ds_scope.InputText;

__ds_ns.ListItem = __ds_scope.ListItem;

__ds_ns.RadioButton = __ds_scope.RadioButton;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.ToggleButton = __ds_scope.ToggleButton;

__ds_ns.ToggleSwitch = __ds_scope.ToggleSwitch;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.Menu = __ds_scope.Menu;

__ds_ns.TabMenu = __ds_scope.TabMenu;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
