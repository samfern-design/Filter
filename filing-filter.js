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

  /* ---- Data: SEC-style filing categories & types ----------------------- */
  // Each item id is `${catId}:${code}` and is globally unique.
  const CATEGORIES = [
    { id: "6k", name: "6K Related", items: [
      ["6-K", "Report of foreign private issuer"],
      ["6-K/A", "Report of foreign private issuer (amended)"],
    ]},
    { id: "8k", name: "8K", items: [
      ["8-K", "Current report"],
      ["8-K/A", "Current report (amended)"],
      ["8-K12B", "Notification under Rule 12b"],
      ["8-K12G3", "Notification of securities of successor issuers"],
      ["8-K15D5", "Notification of assumption of duty to report"],
    ]},
    { id: "annual", name: "Annual Reports", items: [
      ["10-K", "Annual report"],
      ["10-K/A", "Annual report (amended)"],
      ["10-KT", "Transition annual report"],
      ["10-KT/A", "Transition annual report (amended)"],
      ["10-KSB", "Annual report — small business"],
      ["10-KSB/A", "Annual report — small business (amended)"],
      ["10-K405", "Annual report (Item 405)"],
      ["10-K405/A", "Annual report (Item 405, amended)"],
      ["20-F", "Annual report — foreign private issuer"],
      ["20-F/A", "Annual report — foreign private issuer (amended)"],
      ["40-F", "Annual report — Canadian issuer"],
      ["40-F/A", "Annual report — Canadian issuer (amended)"],
      ["11-K", "Annual report of employee stock purchase plan"],
      ["11-K/A", "Annual report of employee stock purchase plan (amended)"],
      ["11-KT", "Transition report of employee stock purchase plan"],
      ["ARS", "Annual report to security holders"],
      ["ARS/A", "Annual report to security holders (amended)"],
      ["18-K", "Annual report — foreign governments"],
      ["18-K/A", "Annual report — foreign governments (amended)"],
      ["N-CSR", "Certified annual shareholder report of management investment companies"],
      ["N-CSR/A", "Certified annual shareholder report (amended)"],
    ]},
    { id: "funds", name: "Funds", items: [
      ["N-1A", "Registration statement for open-end management investment companies"],
      ["N-CSRS", "Certified semi-annual shareholder report"],
      ["N-Q", "Quarterly schedule of portfolio holdings"],
      ["N-PX", "Annual report of proxy voting record"],
      ["NPORT-P", "Monthly portfolio investments report (public)"],
      ["497", "Definitive materials filed under Rule 497"],
      ["497K", "Summary prospectus for open-end investment companies"],
      ["485APOS", "Post-effective amendment (paragraph (a))"],
      ["485BPOS", "Post-effective amendment (paragraph (b))"],
      ["N-CEN", "Annual report for registered investment companies"],
    ]},
    { id: "insider", name: "Insider Trading", items: [
      ["3", "Initial statement of beneficial ownership"],
      ["3/A", "Initial statement of beneficial ownership (amended)"],
      ["4", "Statement of changes in beneficial ownership"],
      ["4/A", "Statement of changes in beneficial ownership (amended)"],
      ["5", "Annual statement of beneficial ownership"],
      ["5/A", "Annual statement of beneficial ownership (amended)"],
      ["144", "Notice of proposed sale of securities"],
    ]},
    { id: "paper", name: "Paper Submissions", items: [
      ["10-K (paper)", "Annual report — paper submission"],
      ["8-K (paper)", "Current report — paper submission"],
      ["SC 13D (paper)", "Beneficial ownership report — paper submission"],
      ["DEF 14A (paper)", "Definitive proxy statement — paper submission"],
    ]},
    { id: "proxy", name: "Proxy Statements", items: [
      ["DEF 14A", "Definitive proxy statement"],
      ["DEFA14A", "Additional definitive proxy soliciting materials"],
      ["DEFR14A", "Revised definitive proxy statement"],
      ["PRE 14A", "Preliminary proxy statement"],
      ["PREC14A", "Preliminary proxy statement — contested solicitation"],
      ["DEFM14A", "Definitive proxy statement relating to a merger"],
      ["DEFC14A", "Definitive proxy statement — contested solicitation"],
      ["DEF 14C", "Definitive information statement"],
      ["PRE 14C", "Preliminary information statement"],
    ]},
    { id: "utility", name: "Public Utility Holding Company Act", items: [
      ["U-1", "Application or declaration"],
      ["U5S", "Annual report for holding companies"],
      ["35-CERT", "Certificate of notification"],
      ["U-3A-2", "Statement claiming exemption"],
    ]},
    { id: "quarterly", name: "Quarterly Reports", items: [
      ["10-Q", "Quarterly report"],
      ["10-Q/A", "Quarterly report (amended)"],
      ["10-QT", "Transition quarterly report"],
      ["10-QT/A", "Transition quarterly report (amended)"],
      ["10-QSB", "Quarterly report — small business"],
      ["10-QSB/A", "Quarterly report — small business (amended)"],
    ]},
    { id: "regterm", name: "Registration / Termination", items: [
      ["15-12B", "Termination of registration of a class of securities (12(b))"],
      ["15-12G", "Termination of registration of a class of securities (12(g))"],
      ["15-15D", "Suspension of duty to file reports"],
      ["RW", "Registration withdrawal request"],
    ]},
  ];

  const itemId = (catId, code) => catId + ":" + code;

  // Flat index for cross-category search.
  const ALL_ITEMS = [];
  CATEGORIES.forEach((c) => c.items.forEach(([code, label]) =>
    ALL_ITEMS.push({ id: itemId(c.id, code), code, label, catId: c.id, catName: c.name })
  ));
  const itemsByCat = (catId) => CATEGORIES.find((c) => c.id === catId).items;
  const catById = (catId) => CATEGORIES.find((c) => c.id === catId);

  /* ---- Icons ----------------------------------------------------------- */
  const ICONS = {
    x: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>',
    chevR: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5l5 5-5 5"/></svg>',
    chevL: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5l-5 5 5 5"/></svg>',
    search: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M11 11l3 3" stroke-linecap="round"/></svg>',
  };

  /* ====================================================================== */
  class FilingFilter {
    constructor(trigger) {
      this.trigger = trigger;
      // chip parts (the trigger is the chip's main button)
      this.chip = trigger.closest(".qm-chip");
      this.chipText = this.chip && this.chip.querySelector("[data-chip-text]");
      this.chipBadge = this.chip && this.chip.querySelector("[data-chip-badge]");
      this.chipClear = this.chip && this.chip.querySelector("[data-chip-clear]");
      this.applied = new Set();   // last applied selection
      this.staged = new Set();    // working copy while open
      this.isOpen = false;
      this.activeCat = CATEGORIES[2].id; // desktop active column (Annual Reports)
      this.mobileScreen = 1;
      this.mobileCat = null;
      this.mq = window.matchMedia("(max-width: 767px)");
      this._buildDom();
      this._wire();
      this._renderSummary();
    }

    get isMobile() { return this.mq.matches; }

    /* ---- DOM scaffold (built once) ------------------------------------ */
    _buildDom() {
      this.overlay = document.createElement("div");
      this.overlay.className = "qm-overlay";

      this.panel = document.createElement("div");
      this.panel.className = "qm-panel";
      this.panel.setAttribute("role", "dialog");
      this.panel.setAttribute("aria-modal", "true");
      this.panel.setAttribute("aria-label", "Filing type filter");
      this.panel.id = "qm-filter-panel";

      this.panel.innerHTML = `
        <!-- DESKTOP miller -->
        <div class="qm-miller">
          <nav class="qm-cats" aria-label="Filing categories"></nav>
          <section class="qm-items">
            <div class="qm-items__head">
              <span class="qm-items__title" data-d-title></span>
              <span class="qm-items__count" data-d-count></span>
            </div>
            <div class="qm-items__list" data-d-list role="group" aria-label="Filing types"></div>
          </section>
        </div>

        <!-- MOBILE sheet -->
        <div class="qm-sheet-view" data-screen="1">
          <div class="qm-handle" data-handle aria-hidden="true"></div>
          <div class="qm-stage">
            <!-- screen 1: categories -->
            <div class="qm-screen" data-screen="1">
              <div class="qm-shead">
                <span class="qm-shead__title">Filing type</span>
                <button class="qm-icon-btn qm-x" data-close type="button" aria-label="Close filter">${ICONS.x}</button>
              </div>
              <div class="qm-ssearch">
                <div class="qm-search">
                  ${ICONS.search}
                  <input type="search" data-s1-search placeholder="Search all filings"
                         aria-label="Search all filings" autocomplete="off" />
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
      const $ = (sel) => this.panel.querySelector(sel);
      this.el = {
        cats: $(".qm-cats"),
        dTitle: $("[data-d-title]"),
        dCount: $("[data-d-count]"),
        dList: $("[data-d-list]"),
        dFooter: $("[data-d-footer]"),
        sheet: $(".qm-sheet-view"),
        handle: $("[data-handle]"),
        s1Search: $("[data-s1-search]"),
        s1List: $("[data-s1-list]"),
        s2Title: $("[data-s2-title]"),
        s2Count: $("[data-s2-count]"),
        s2Search: $("[data-s2-search]"),
        s2List: $("[data-s2-list]"),
        mFooter: $("[data-m-footer]"),
      };
    }

    /* ---- Event wiring -------------------------------------------------- */
    _wire() {
      this.trigger.addEventListener("click", () => this.toggleOpen());

      if (this.chipClear) {
        this.chipClear.addEventListener("click", (e) => {
          e.stopPropagation();
          this.clearApplied();
        });
      }

      this.overlay.addEventListener("mousedown", (e) => {
        if (e.target === this.overlay) this.dismiss();
      });

      document.addEventListener("keydown", (e) => {
        if (!this.isOpen) return;
        if (e.key === "Escape") { e.preventDefault(); this.dismiss(); }
        if (e.key === "Tab") this._trapTab(e);
      });

      // Close / back buttons (mobile)
      this.panel.querySelector("[data-close]").addEventListener("click", () => this.dismiss());
      this.panel.querySelector("[data-back]").addEventListener("click", () => this.goScreen(1));

      // Search inputs
      this.el.s1Search.addEventListener("input", () => this._renderScreen1());
      this.el.s2Search.addEventListener("input", () => this._renderScreen2List());

      // Reposition desktop popover on resize/scroll; re-render on breakpoint change.
      this._onResize = () => {
        if (!this.isOpen) return;
        this._renderForViewport();
        if (!this.isMobile) this._position();
      };
      window.addEventListener("resize", this._onResize);
      window.addEventListener("scroll", () => { if (this.isOpen && !this.isMobile) this._position(); }, true);

      this._wireSwipe();
    }

    /* ---- Open / close -------------------------------------------------- */
    toggleOpen() { this.isOpen ? this.dismiss() : this.open(); }

    open() {
      this.staged = new Set(this.applied); // restore last applied
      this.isOpen = true;
      this._lastFocus = document.activeElement;
      this.mobileScreen = 1;
      this.el.sheet.setAttribute("data-screen", "1");
      this.el.s1Search.value = "";
      this.el.s2Search.value = "";

      this.overlay.setAttribute("data-open", "true");
      // force reflow so the panel transition runs
      // eslint-disable-next-line no-unused-expressions
      this.panel.offsetHeight;
      this.panel.setAttribute("data-open", "true");
      this.trigger.setAttribute("aria-expanded", "true");

      this._renderForViewport();
      if (!this.isMobile) this._position();

      // initial focus
      requestAnimationFrame(() => {
        if (this.isMobile) this.el.s1Search.focus();
        else (this.el.cats.querySelector('[aria-current="true"]') || this.el.cats.firstElementChild)?.focus();
      });
    }

    dismiss() {
      // cancel: drop staged edits
      this._close();
    }

    applyAndClose() {
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
      if (this.isMobile) {
        // Clear any inline popover anchoring from a prior desktop open —
        // otherwise it overrides the sheet's full-width CSS positioning.
        this.panel.style.left = "";
        this.panel.style.top = "";
        this._renderScreen1();
        if (this.mobileScreen === 2 && this.mobileCat) {
          this.el.s2Search.value = "";
          this._renderScreen2(this.mobileCat);
        }
        this._renderMobileFooter();
      } else {
        // landed on desktop: keep category context from a mobile drill-down
        if (this.mobileScreen === 2 && this.mobileCat) this.activeCat = this.mobileCat;
        this._renderDesktop();
      }
    }

    /* ---- DESKTOP render ------------------------------------------------ */
    _renderDesktop() {
      // categories rail
      this.el.cats.innerHTML = "";
      CATEGORIES.forEach((c) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "qm-cat";
        b.setAttribute("data-cat", c.id);
        if (c.id === this.activeCat) b.setAttribute("aria-current", "true");
        b.title = c.name;
        const sel = this._countInCat(c.id);
        b.innerHTML =
          `<span class="qm-cat__name">${esc(c.name)}</span>` +
          (sel ? `<span class="qm-cat__badge">${sel}</span>` : "") +
          `<span class="qm-cat__chev qm-chev">${ICONS.chevR}</span>`;
        b.addEventListener("click", () => { this.activeCat = c.id; this._renderDesktop(); });
        this.el.cats.appendChild(b);
      });

      const cat = catById(this.activeCat);
      this.el.dTitle.textContent = cat.name;
      this.el.dTitle.title = cat.name;
      this.el.dCount.textContent = cat.items.length + " items";

      this.el.dList.innerHTML = "";
      this.el.dList.appendChild(this._selectAllRow(cat));
      cat.items.forEach(([code, label]) => {
        this.el.dList.appendChild(this._itemRow(this.activeCat, code, label));
      });

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
        const matches = ALL_ITEMS.filter((it) =>
          it.code.toLowerCase().includes(q) || it.label.toLowerCase().includes(q) ||
          it.catName.toLowerCase().includes(q));
        if (!matches.length) { this.el.s1List.appendChild(this._emptyState(q)); }
        else matches.forEach((it) => {
          const row = this._itemRow(it.catId, it.code, it.label, it.catName);
          this.el.s1List.appendChild(row);
        });
      } else {
        CATEGORIES.forEach((c) => {
          const sel = this._countInCat(c.id);
          const row = document.createElement("button");
          row.type = "button";
          row.className = "qm-catrow";
          row.setAttribute("data-row", "");
          row.title = c.name;
          row.setAttribute("aria-label",
            `${c.name}${sel ? `, ${sel} selected` : ""}, ${c.items.length} filing types`);
          row.innerHTML =
            `<span class="qm-catrow__name">${esc(c.name)}</span>` +
            (sel ? `<span class="qm-catrow__badge">${sel}</span>` : "") +
            `<span class="qm-catrow__chev qm-chev">${ICONS.chevR}</span>`;
          row.addEventListener("click", () => this.openCategory(c.id));
          this.el.s1List.appendChild(row);
        });
      }
      this._renderMobileFooter();
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
        if (n === 2) this.panel.querySelector("[data-back]").focus();
        else this.el.s1Search.focus();
      });
    }

    /* ---- MOBILE screen 2 (items in one category) ----------------------- */
    _renderScreen2(catId) {
      const cat = catById(catId);
      this.el.s2Title.textContent = cat.name;
      this.el.s2Title.title = cat.name;
      this.el.s2Count.textContent = cat.items.length + " items";
      this.el.s2Search.placeholder = "Filter within " + cat.name;
      this.el.s2Search.setAttribute("aria-label", "Filter within " + cat.name);
      this.el.s2List.setAttribute("aria-label", cat.name + " filing types");
      this._renderScreen2List();
    }

    _renderScreen2List() {
      const cat = catById(this.mobileCat);
      const q = this.el.s2Search.value.trim().toLowerCase();
      this.el.s2List.innerHTML = "";

      const items = cat.items.filter(([code, label]) =>
        !q || code.toLowerCase().includes(q) || label.toLowerCase().includes(q));

      if (!q) this.el.s2List.appendChild(this._selectAllRow(cat));

      if (!items.length) { this.el.s2List.appendChild(this._emptyState(this.el.s2Search.value.trim())); return; }
      items.forEach(([code, label]) =>
        this.el.s2List.appendChild(this._itemRow(this.mobileCat, code, label)));
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
      row.setAttribute("aria-label", `${code} — ${label}${catName ? ` (${catName})` : ""}`);
      row.innerHTML =
        `<span class="qm-check" aria-hidden="true"></span>` +
        `<span class="qm-row__code">${esc(code)}</span>` +
        `<span class="qm-row__label" title="${esc(label)}">${esc(label)}</span>` +
        (catName ? `<span class="qm-row__cat">${esc(catName)}</span>` : "");
      const toggle = () => this.toggleItem(id, row);
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); }
      });
      return row;
    }

    _selectAllRow(cat) {
      const ids = cat.items.map(([code]) => itemId(cat.id, code));
      const sel = ids.filter((id) => this.staged.has(id)).length;
      const state = sel === 0 ? "false" : sel === ids.length ? "true" : "mixed";
      const row = document.createElement("button");
      row.type = "button";
      row.className = "qm-row qm-row--all";
      row.setAttribute("data-row", "");
      row.setAttribute("role", "checkbox");
      row.setAttribute("aria-checked", state);
      row.setAttribute("data-checked", state);
      row.setAttribute("aria-label", "Select all filing types in " + cat.name);
      row.innerHTML =
        `<span class="qm-check" aria-hidden="true"></span>` +
        `<span class="qm-row__label">Select all</span>` +
        `<span class="qm-row__cat">${ids.length}</span>`;
      const toggle = () => {
        const turnOn = state !== "true"; // none/mixed -> all; all -> none
        ids.forEach((id) => turnOn ? this.staged.add(id) : this.staged.delete(id));
        this._refreshAfterToggle();
      };
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); }
      });
      return row;
    }

    toggleItem(id, row) {
      if (this.staged.has(id)) this.staged.delete(id); else this.staged.add(id);
      const checked = this.staged.has(id);
      row.setAttribute("aria-checked", String(checked));
      row.setAttribute("data-checked", String(checked));
      // update select-all + counts/footer without full re-render (keeps scroll/focus)
      this._refreshAfterToggle({ skipRows: true });
    }

    // Refresh derived UI (select-all, badges, counts, footer) after a change.
    _refreshAfterToggle(opts = {}) {
      if (this.isMobile) {
        if (this.mobileScreen === 2) {
          // re-sync select-all + every row's checked state in current list
          this._syncList(this.el.s2List, this.mobileCat);
        } else if (this.el.s1Search.value.trim()) {
          this._syncSearchList(this.el.s1List);
        }
        this._renderMobileFooter();
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
      const cat = catById(catId);
      const ids = cat.items.map(([code]) => itemId(catId, code));
      const sel = ids.filter((id) => this.staged.has(id)).length;
      const allRow = container.querySelector(".qm-row--all");
      if (allRow) {
        const state = sel === 0 ? "false" : sel === ids.length ? "true" : "mixed";
        allRow.setAttribute("aria-checked", state);
        allRow.setAttribute("data-checked", state);
      }
      container.querySelectorAll(".qm-row[data-id]").forEach((row) => {
        const checked = this.staged.has(row.getAttribute("data-id"));
        row.setAttribute("aria-checked", String(checked));
        row.setAttribute("data-checked", String(checked));
      });
    }

    _syncSearchList(container) {
      container.querySelectorAll(".qm-row[data-id]").forEach((row) => {
        const checked = this.staged.has(row.getAttribute("data-id"));
        row.setAttribute("aria-checked", String(checked));
        row.setAttribute("data-checked", String(checked));
      });
    }

    clearAll() {
      this.staged.clear();
      if (this.isMobile) this._renderScreen1();
      else this._renderDesktop();
    }

    _countInCat(catId) {
      return itemsByCat(catId).reduce((n, [code]) =>
        n + (this.staged.has(itemId(catId, code)) ? 1 : 0), 0);
    }

    /* ---- Trigger summary ----------------------------------------------- */
    _renderSummary() {
      this.trigger.setAttribute("aria-controls", "qm-filter-panel");
      this.trigger.setAttribute("aria-haspopup", "dialog");
      if (!this.chip) return;

      // The × (clear) and the blue count badge are governed by CSS — hidden
      // at rest, revealed on hover/focus. JS just sets the state + content.
      const n = this.applied.size;
      const label = "Filing type";
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
      this.trigger.setAttribute("aria-label",
        n ? `${label} filter, ${n} selected` : `${label} filter`);
    }

    // Clear the applied selection from the chip's × (panel closed).
    clearApplied() {
      this.applied.clear();
      this.staged.clear();
      this._renderSummary();
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
      d.innerHTML =
        `<div>No filings match <span class="qm-empty__q">"${esc(q)}"</span></div>`;
      const clr = this._btn("Clear search", "qm-btn--outline", () => {
        this.el.s1Search.value = "";
        this.el.s2Search.value = "";
        if (this.isMobile && this.mobileScreen === 2) this._renderScreen2List();
        else this._renderScreen1();
      });
      d.appendChild(clr);
      return d;
    }

    /* ---- Focus trap ---------------------------------------------------- */
    _trapTab(e) {
      const focusables = this.panel.querySelectorAll(
        'button:not(:disabled), [href], input, [tabindex]:not([tabindex="-1"])');
      const visible = Array.prototype.filter.call(focusables, (el) => el.offsetParent !== null);
      if (!visible.length) return;
      const first = visible[0], last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    /* ---- Swipe-to-dismiss (mobile handle) ------------------------------ */
    _wireSwipe() {
      let startY = null, dy = 0;
      const handle = this.el.handle;
      const onDown = (e) => {
        if (!this.isMobile) return;
        startY = (e.touches ? e.touches[0].clientY : e.clientY);
        dy = 0;
        this.panel.style.transition = "none";
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      };
      const onMove = (e) => {
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
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ---- Boot ------------------------------------------------------------ */
  window.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("qm-add-filter");
    if (trigger) window.qmFilter = new FilingFilter(trigger);
  });
})();
