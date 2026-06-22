/* ==========================================================================
   range-filter.js
   Single-criterion value editor (e.g. a screener's "P/E" filter).
   - Screen 1: search + preset ranges (single-select).
   - Screen 2: manual From/To range.
   - Header carries help (?) and remove (trash); screen 2 adds a back button.
   Dropdown on pointer devices, compact bottom sheet on touch. One value;
   applies live on choose/apply. Data-driven via a RANGE_FILTERS registry.
   ========================================================================== */

(function () {
  "use strict";

  /* ---- Data: range-filter definitions ---------------------------------- */
  // preset: { id, label, desc, from, to }  (null = open-ended)
  const RANGE_FILTERS = {
    pe: {
      label: "P/E",
      title: "Price to earnings ratio",
      help: "Share price divided by earnings per share (trailing twelve months).",
      unit: "",
      step: 1,
      presets: [
        { id: "50p",   label: "50 and above", desc: "Extremely high", from: 50,  to: null },
        { id: "35-50", label: "35 to 50",     desc: "Very high",      from: 35,  to: 50 },
        { id: "25-35", label: "25 to 35",     desc: "High",           from: 25,  to: 35 },
        { id: "15-25", label: "15 to 25",     desc: "Moderate",       from: 15,  to: 25 },
        { id: "5-15",  label: "5 to 15",      desc: "Low",            from: 5,   to: 15 },
        { id: "0-5",   label: "0 to 5",       desc: "Very low",       from: 0,   to: 5 },
      ],
    },
    yield: {
      label: "Div yield",
      title: "Dividend yield",
      help: "Annual dividends per share divided by share price.",
      unit: "%",
      step: 0.5,
      presets: [
        { id: "6p",  label: "6% and above", desc: "Very high", from: 6, to: null },
        { id: "4-6", label: "4% to 6%",     desc: "High",      from: 4, to: 6 },
        { id: "2-4", label: "2% to 4%",     desc: "Moderate",  from: 2, to: 4 },
        { id: "0-2", label: "0% to 2%",     desc: "Low",       from: 0, to: 2 },
        { id: "0",   label: "No dividend",  desc: "0%",        from: 0, to: 0 },
      ],
    },
    mktcap: {
      label: "Market cap",
      title: "Market capitalization",
      help: "Total market value of a company's outstanding shares.",
      unit: "$",
      step: 1,
      presets: [
        { id: "mega",  label: "Mega ($200B+)",       desc: "200B and above", from: 200000, to: null },
        { id: "large", label: "Large ($10B–$200B)",  desc: "10B to 200B",    from: 10000,  to: 200000 },
        { id: "mid",   label: "Mid ($2B–$10B)",      desc: "2B to 10B",      from: 2000,   to: 10000 },
        { id: "small", label: "Small ($300M–$2B)",   desc: "300M to 2B",     from: 300,    to: 2000 },
        { id: "micro", label: "Micro (under $300M)", desc: "Below 300M",     from: null,   to: 300 },
      ],
    },
    nearmoney: {
      label: "Near money",
      title: "Near money %",
      help: "Show option strikes within this percentage of the spot price.",
      unit: "%",
      step: 1,
      custom: "single",   // custom is a single value, not a From/To range
      presets: [
        { id: "all", label: "All",  from: null, to: null },
        { id: "2",   label: "2%",   from: 2,  to: 2 },
        { id: "5",   label: "5%",   from: 5,  to: 5 },
        { id: "10",  label: "10%",  from: 10, to: 10 },
        { id: "15",  label: "15%",  from: 15, to: 15 },
        { id: "20",  label: "20%",  from: 20, to: 20 },
        { id: "25",  label: "25%",  from: 25, to: 25 },
      ],
    },
    expiry: {
      label: "Expiry",
      title: "Expiry",
      help: "Filter option expiries by cadence or a custom date range.",
      custom: "dates",   // custom screen is a From/To date range
      presets: [
        { id: "all",         label: "All" },
        { id: "weeklies",    label: "Weeklies" },
        { id: "monthlies",   label: "Monthlies" },
        { id: "quarterlies", label: "Quarterlies" },
      ],
    },
  };

  const ICONS = {
    chevDown: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>',
    chevL: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5l-5 5 5 5"/></svg>',
    chevR: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5l5 5-5 5"/></svg>',
    cal: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.5" y="3.2" width="11" height="10.3" rx="1.5"/><path d="M2.5 6.2h11M5.5 1.6v3M10.5 1.6v3" stroke-linecap="round"/></svg>',
    trash: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10"/></svg>',
    check: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5l3 3 7-7"/></svg>',
    sliders: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 5h7M11 5h3M2 11h3M7 11h7"/><circle cx="9.5" cy="5" r="1.6"/><circle cx="5.5" cy="11" r="1.6"/></svg>',
    search: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M11 11l3 3" stroke-linecap="round"/></svg>',
  };

  let UID = 0;

  /* ====================================================================== */
  class RangeFilter {
    constructor(trigger, options = {}) {
      this.trigger = trigger;
      this.cfg = RANGE_FILTERS[options.filter] || RANGE_FILTERS.pe;
      this.panelId = "qm-rf-panel-" + (++UID);
      this.chip = trigger.closest(".qm-rf-chip") || trigger;
      this.chipText = this.chip.querySelector("[data-rf-text]");
      this.value = null;           // { from, to, presetId, text }
      this.customs = [];           // saved customs { id, from, to, kind }
      this._cid = 0;
      this.customMode = this.cfg.custom || "range"; // range | single | dates
      // default selection: omit/"empty" → empty; preset id or "first" → preselected
      const def = options.default !== undefined ? options.default : this.cfg.default;
      if (def && def !== "empty" && def !== "none") {
        const p = def === "first" ? this.cfg.presets[0]
                                  : this.cfg.presets.find((x) => x.id === def);
        if (p) this.value = { from: p.from, to: p.to, presetId: p.id, text: this._presetText(p) };
      }
      this.isOpen = false;
      this.screen = 1;
      this.mqTouch = window.matchMedia("(pointer: coarse)");
      this._build();
      this._wire();
      this._renderChip();
    }

    get isSheet() { return this.mqTouch.matches; }

    _build() {
      const c = this.cfg;
      this.overlay = document.createElement("div");
      this.overlay.className = "qm-rf-overlay";

      this.panel = document.createElement("div");
      this.panel.className = "qm-rf-panel";
      this.panel.setAttribute("role", "dialog");
      this.panel.setAttribute("aria-modal", "true");
      this.panel.setAttribute("aria-label", c.title);
      this.panel.setAttribute("data-screen", "1");
      this.panel.id = this.panelId;

      this.panel.innerHTML = `
        <div class="qm-rf-head">
          <button class="qm-icon-btn qm-rf-icon" data-back type="button"
                  aria-label="Back to presets" hidden>${ICONS.chevL}</button>
          <span class="qm-rf-head__title">${esc(c.title)}</span>
          <span class="qm-rf-head__help" title="${esc(c.help)}" aria-label="${esc(c.help)}">?</span>
        </div>
        <div class="qm-rf-stage">
          <div class="qm-rf-track">
            <!-- screen 1: presets -->
            <section class="qm-rf-screen" data-screen="1">
              <div class="qm-rf-search">
                <div class="qm-search">${ICONS.search}
                  <input type="search" data-search placeholder="Search"
                         aria-label="Search ${esc(c.title)} presets" autocomplete="off" />
                </div>
              </div>
              <div class="qm-rf-list" role="radiogroup" aria-label="${esc(c.title)} presets" data-list></div>
              <div class="qm-rf-foot">
                <button class="qm-rf-manual-btn" data-manual type="button">
                  ${ICONS.sliders} Custom
                </button>
              </div>
            </section>
            <!-- screen 2: custom (range / single value / date range) -->
            <section class="qm-rf-screen" data-screen="2">
              ${this._customScreenHtml(c)}
              <div class="qm-rf-foot">
                <button class="qm-btn qm-btn--ghost" data-manual-clear type="button">Clear</button>
                <span class="qm-rf-foot__spacer"></span>
                <button class="qm-btn qm-btn--primary" data-apply type="button">Apply</button>
              </div>
            </section>
          </div>
        </div>
      `;

      this.overlay.appendChild(this.panel);
      document.body.appendChild(this.overlay);

      const $ = (s) => this.panel.querySelector(s);
      this.el = {
        back: $("[data-back]"),
        search: $("[data-search]"),
        list: $("[data-list]"),
        manual: $("[data-manual]"),
        from: $("[data-from]"),
        to: $("[data-to]"),
        apply: $("[data-apply]"),
        manualClear: $("[data-manual-clear]"),
        // calendar (dates mode only)
        fromText: $("[data-from-text]"),
        toText: $("[data-to-text]"),
        fromDisp: $("[data-from-display]"),
        toDisp: $("[data-to-display]"),
        cal: $("[data-cal]"),
        calLabel: $("[data-cal-label]"),
        prev: $("[data-prev]"),
        next: $("[data-next]"),
      };
      this.el.searchWrap = this.el.search.closest(".qm-rf-search");
    }

    // Custom-screen markup per mode (range / single / dates).
    _customScreenHtml(c) {
      const mode = c.custom || "range";
      if (mode === "dates") {
        return `
          <div class="qm-rf-daterange">
            <button class="qm-rf-datefield" data-from-display type="button">
              <span data-from-text>From</span>${ICONS.cal}
            </button>
            <button class="qm-rf-datefield" data-to-display type="button">
              <span data-to-text>To</span>${ICONS.cal}
            </button>
          </div>
          <div class="qm-rf-cal">
            <div class="qm-rf-cal__nav">
              <button class="qm-icon-btn qm-rf-icon" data-prev type="button" aria-label="Previous month">${ICONS.chevL}</button>
              <span class="qm-rf-cal__label" data-cal-label></span>
              <button class="qm-icon-btn qm-rf-icon" data-next type="button" aria-label="Next month">${ICONS.chevR}</button>
            </div>
            <div class="qm-rf-cal__grid" data-cal role="grid"></div>
          </div>`;
      }
      const unit = c.unit
        ? `<div class="qm-rf-unit">${mode === "single" ? "Value" : "Values"} in ${esc(c.unit === "$" ? "$ millions" : c.unit)}</div>`
        : "";
      if (mode === "single") {
        return `<div class="qm-rf-manual">
            <label class="qm-rf-field"><span>Value</span>
              <input class="qm-rf-input" type="number" inputmode="decimal" step="${c.step}" data-from placeholder="e.g. 7" /></label>
          </div>${unit}`;
      }
      return `<div class="qm-rf-manual">
          <label class="qm-rf-field"><span>From</span>
            <input class="qm-rf-input" type="number" inputmode="decimal" step="${c.step}" data-from placeholder="Min" /></label>
          <label class="qm-rf-field"><span>To</span>
            <input class="qm-rf-input" type="number" inputmode="decimal" step="${c.step}" data-to placeholder="Max" /></label>
        </div>${unit}`;
    }

    _wire() {
      this.trigger.addEventListener("click", () => this.isOpen ? this.close() : this.open());
      this.overlay.addEventListener("mousedown", (e) => {
        if (e.target === this.overlay) this.close();
      });
      document.addEventListener("keydown", (e) => {
        if (this.isOpen && e.key === "Escape") { e.preventDefault(); this.close(); }
      });
      this.el.back.addEventListener("click", () => this.goScreen(1));
      this.el.manual.addEventListener("click", () => this.goScreen(2));
      this.el.search.addEventListener("input", () => this._renderPresets());
      this.el.apply.addEventListener("click", () => this._applyManual());
      this.el.manualClear.addEventListener("click", () => {
        if (this.customMode === "dates") { this.calFrom = null; this.calTo = null; this._renderDates(); }
        else { if (this.el.from) this.el.from.value = ""; if (this.el.to) this.el.to.value = ""; }
        this.value = null; this._renderChip();
      });
      // calendar (dates mode)
      if (this.el.cal) {
        const shift = (delta) => {
          this.calMonth = new Date(this.calMonth.getFullYear(), this.calMonth.getMonth() + delta, 1);
          this._renderCalendar();
        };
        this.el.prev.addEventListener("click", () => shift(-1));
        this.el.next.addEventListener("click", () => shift(1));
        this.el.fromDisp.addEventListener("click", () => {
          if (this.calFrom) { this.calMonth = this._startMonth(this.calFrom); this._renderCalendar(); }
        });
        this.el.toDisp.addEventListener("click", () => {
          const d = this.calTo || this.calFrom;
          if (d) { this.calMonth = this._startMonth(d); this._renderCalendar(); }
        });
      }
      window.addEventListener("resize", () => { if (this.isOpen && !this.isSheet) this._position(); });
      window.addEventListener("scroll", () => { if (this.isOpen && !this.isSheet) this._position(); }, true);
    }

    open() {
      this.isOpen = true;
      this._lastFocus = document.activeElement;
      this.goScreen(1, true);
      this.el.search.value = "";
      this._renderPresets();
      // seed the custom screen from the current value
      if (this.customMode === "dates") {
        this.calFrom = this.value && typeof this.value.from === "string" ? this._parseISO(this.value.from) : null;
        this.calTo = this.value && typeof this.value.to === "string" ? this._parseISO(this.value.to) : null;
        this.calMonth = this._startMonth(this.calFrom || new Date());
        this._renderDates();
      } else {
        if (this.el.from) this.el.from.value = this.value && this.value.from != null ? this.value.from : "";
        if (this.el.to) this.el.to.value = this.value && this.value.to != null ? this.value.to : "";
      }

      this.overlay.setAttribute("data-open", "true");
      this.panel.offsetHeight; // reflow
      this.panel.setAttribute("data-open", "true");
      this.trigger.setAttribute("aria-expanded", "true");
      if (!this.isSheet) this._position();
      requestAnimationFrame(() => this.el.search.focus());
    }

    close() {
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
      setTimeout(done, 300);
      if (this._lastFocus && this._lastFocus.focus) this._lastFocus.focus();
    }

    goScreen(n, silent) {
      this.screen = n;
      this.panel.setAttribute("data-screen", String(n));
      if (silent) this.panel.removeAttribute("data-dir");
      else this.panel.setAttribute("data-dir", n === 2 ? "fwd" : "back");
      this.el.back.hidden = n !== 2;
      if (!silent) requestAnimationFrame(() => {
        const t = n === 2 ? (this.el.from || this.el.fromDisp) : this.el.search;
        if (t && t.focus) t.focus();
      });
    }

    _position() {
      const r = this.trigger.getBoundingClientRect();
      const gap = 8, pw = this.panel.offsetWidth, ph = this.panel.offsetHeight;
      let left = Math.min(r.left, window.innerWidth - 12 - pw);
      if (left < 12) left = 12;
      let top = r.bottom + gap;
      if (top + ph > window.innerHeight - 12) {
        const above = r.top - gap - ph;
        if (above > 12) top = above;
      }
      this.panel.style.left = left + "px";
      this.panel.style.top = top + "px";
    }

    /* ---- Presets + saved customs (single-select) ---------------------- */
    _renderPresets() {
      // show the search only for longer menus (> 15 options)
      const total = this.cfg.presets.length + this.customs.length;
      if (this.el.searchWrap) {
        this.el.searchWrap.hidden = total <= 15;
        if (total <= 15) this.el.search.value = "";
      }
      const q = this.el.search.value.trim().toLowerCase();
      this.el.list.innerHTML = "";
      const presets = this.cfg.presets.filter((p) =>
        !q || p.label.toLowerCase().includes(q) || (p.desc || "").toLowerCase().includes(q));
      const customs = this.customs.filter((c) =>
        !q || this._customLabel(c).toLowerCase().includes(q) || "custom".includes(q));

      presets.forEach((p) => this.el.list.appendChild(this._optRow({
        id: p.id, label: p.label, desc: p.desc || "", text: this._presetText(p),
        from: p.from, to: p.to,
      })));

      if (customs.length) {
        const sub = document.createElement("div");
        sub.className = "qm-rf-subhead";
        sub.textContent = "Custom";
        this.el.list.appendChild(sub);
        customs.forEach((c) => this.el.list.appendChild(this._optRow({
          id: c.id, label: this._customLabel(c), desc: "",
          text: this._customLabel(c), from: c.from, to: c.to, deletable: true,
        })));
      }

      if (!presets.length && !customs.length) {
        const empty = document.createElement("div");
        empty.className = "qm-rf-unit";
        empty.style.textAlign = "center";
        empty.textContent = "No matches — try Custom.";
        this.el.list.appendChild(empty);
      }
    }

    _optRow(o) {
      const sel = !!(this.value && this.value.presetId === o.id);
      const row = document.createElement("div");
      row.className = "qm-rf-row";
      row.setAttribute("data-sel", String(sel));

      const main = document.createElement("button");
      main.type = "button";
      main.className = "qm-rf-opt";
      main.setAttribute("role", "radio");
      main.setAttribute("aria-checked", String(sel));
      main.innerHTML =
        `<span class="qm-rf-opt__text">` +
          `<span class="qm-rf-opt__label">${esc(o.label)}</span>` +
          (o.desc ? `<span class="qm-rf-opt__desc">${esc(o.desc)}</span>` : "") +
        `</span>` +
        `<span class="qm-rf-opt__check">${ICONS.check}</span>`;
      main.addEventListener("click", () => {
        this.value = { from: o.from, to: o.to, presetId: o.id, text: o.text };
        this._renderChip();
        this.close();
      });
      row.appendChild(main);

      if (o.deletable) {
        const del = document.createElement("button");
        del.type = "button";
        del.className = "qm-rf-opt__del";
        del.setAttribute("aria-label", "Delete custom " + o.label);
        del.innerHTML = ICONS.trash;
        del.addEventListener("click", (e) => { e.stopPropagation(); this._deleteCustom(o.id); });
        row.appendChild(del);
      }
      return row;
    }

    _deleteCustom(id) {
      this.customs = this.customs.filter((c) => c.id !== id);
      if (this.value && this.value.presetId === id) { this.value = null; this._renderChip(); }
      this._renderPresets();
    }

    /* ---- Custom range -> saved under the main menu --------------------- */
    _applyManual() {
      let from, to;
      if (this.customMode === "dates") {
        from = this.calFrom ? this._toISO(this.calFrom) : null;
        to = this.calTo ? this._toISO(this.calTo) : null;
      } else {
        from = this.el.from.value === "" ? null : Number(this.el.from.value);
        // single-value metrics store the value as from === to
        to = this.customMode === "single"
          ? from
          : (this.el.to.value === "" ? null : Number(this.el.to.value));
      }
      if (from == null && to == null) {
        this.value = null;
        this._renderChip();
        this.close();
        return;
      }
      const kind = this.customMode === "dates" ? "dates" : "range";
      // save the custom (dedupe identical), select it, and close
      let entry = this.customs.find((c) => c.from === from && c.to === to && c.kind === kind);
      if (!entry) { entry = { id: "custom-" + (++this._cid), from, to, kind }; this.customs.push(entry); }
      this.value = { from, to, presetId: entry.id, text: this._customLabel(entry) };
      this._renderChip();
      this.close();
    }

    /* ---- Chip + formatting -------------------------------------------- */
    _renderChip() {
      const v = this.value;
      this.chip.setAttribute("data-set", String(!!v));
      this.chip.setAttribute("aria-haspopup", "dialog");
      this.chip.setAttribute("aria-controls", this.panelId);
      if (!this.chipText) return;
      this.chipText.textContent = v ? `${this.cfg.label} ${v.text}` : this.cfg.label;
    }

    // chip text for a preset (categorical → its label; numeric → formatted)
    _presetText(p) {
      if (p.from === undefined && p.to === undefined) return p.label;
      return this._fmt({ from: p.from, to: p.to });
    }
    // list/chip text for a saved custom
    _customLabel(c) {
      return c.kind === "dates" ? this._fmtDates(c.from, c.to) : this._fmt(c);
    }
    _fmtDates(from, to) {
      const d = (s) => new Date(s + "T00:00:00").toLocaleDateString("en-US",
        { month: "short", day: "numeric", year: "numeric" });
      if (from && !to) return "From " + d(from);
      if (!from && to) return "Until " + d(to);
      return `${d(from)} – ${d(to)}`;
    }

    /* ---- Inline range calendar (dates mode) --------------------------- */
    _startMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
    _sameDay(a, b) {
      return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
    }
    _toISO(d) {
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${d.getFullYear()}-${m}-${day}`;
    }
    _parseISO(s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }
    _fmtDay(d) { return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }

    _renderDates() {
      if (this.el.fromText) this.el.fromText.textContent = this.calFrom ? this._fmtDay(this.calFrom) : "From";
      if (this.el.toText) this.el.toText.textContent = this.calTo ? this._fmtDay(this.calTo) : "To";
      if (this.el.fromDisp) this.el.fromDisp.setAttribute("data-set", String(!!this.calFrom));
      if (this.el.toDisp) this.el.toDisp.setAttribute("data-set", String(!!this.calTo));
      this._renderCalendar();
    }

    _renderCalendar() {
      const grid = this.el.cal;
      if (!grid) return;
      grid.innerHTML = "";
      this.el.calLabel.textContent = this.calMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].forEach((w) => {
        const s = document.createElement("span");
        s.className = "qm-rf-cal__wd";
        s.textContent = w;
        grid.appendChild(s);
      });
      const y = this.calMonth.getFullYear(), m = this.calMonth.getMonth();
      const offset = (new Date(y, m, 1).getDay() + 6) % 7; // Monday-first
      for (let i = 0; i < offset; i++) {
        const e = document.createElement("span");
        e.className = "qm-rf-cal__cell--empty";
        grid.appendChild(e);
      }
      const days = new Date(y, m + 1, 0).getDate();
      const today = new Date();
      for (let d = 1; d <= days; d++) {
        const date = new Date(y, m, d);
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "qm-rf-cal__day";
        cell.textContent = String(d);
        if (this._sameDay(date, today)) cell.setAttribute("data-today", "true");
        const isEnd = (this.calFrom && this._sameDay(date, this.calFrom)) ||
                      (this.calTo && this._sameDay(date, this.calTo));
        if (isEnd) cell.setAttribute("data-end", "true");
        if (this.calFrom && this.calTo && date > this.calFrom && date < this.calTo)
          cell.setAttribute("data-inrange", "true");
        cell.addEventListener("click", () => this._pickDay(date));
        grid.appendChild(cell);
      }
    }

    _pickDay(date) {
      if (!this.calFrom || (this.calFrom && this.calTo)) {
        this.calFrom = date; this.calTo = null;            // start a new range
      } else if (date < this.calFrom) {
        this.calTo = this.calFrom; this.calFrom = date;    // picked before start → swap
      } else {
        this.calTo = date;
      }
      this._renderDates();
    }

    _fmt(v) {
      if (v.from == null && v.to == null) return "All";
      const u = this.cfg.unit === "$" ? "" : this.cfg.unit; // $ handled by magnitude
      const n = (x) => {
        if (this.cfg.unit === "$") {
          if (x >= 1000) return (x / 1000) + "B";
          return x + "M";
        }
        return x + u;
      };
      if (v.from != null && v.to == null) return `${n(v.from)}+`;
      if (v.from == null && v.to != null) return `≤${n(v.to)}`;
      if (v.from === v.to) return `${n(v.from)}`;
      return `${n(v.from)}–${n(v.to)}`;
    }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ---- Boot ------------------------------------------------------------ */
  window.QMRangeFilter = RangeFilter;
  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-qm-range]").forEach((trigger) => {
      const filter = trigger.getAttribute("data-filter") || "pe";
      const def = trigger.getAttribute("data-default") || undefined;
      trigger._qm = new RangeFilter(trigger, { filter, default: def });
    });
  });
})();
