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
  const FILING_CATEGORIES = [
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

  /* ---- Data: GICS-style industry / sector taxonomy --------------------- */
  // Items carry the industry name as their "code" (shown as the row text).
  const SECTOR_CATEGORIES = [
    { id: "energy", name: "Energy", items: [
      ["Oil & Gas Drilling", ""],
      ["Oil & Gas Equipment & Services", ""],
      ["Integrated Oil & Gas", ""],
      ["Oil & Gas Exploration & Production", ""],
      ["Oil & Gas Refining & Marketing", ""],
      ["Oil & Gas Storage & Transportation", ""],
      ["Coal & Consumable Fuels", ""],
    ]},
    { id: "materials", name: "Materials", items: [
      ["Commodity Chemicals", ""],
      ["Diversified Chemicals", ""],
      ["Specialty Chemicals", ""],
      ["Industrial Gases", ""],
      ["Construction Materials", ""],
      ["Metal & Glass Containers", ""],
      ["Paper Packaging", ""],
      ["Aluminum", ""],
      ["Diversified Metals & Mining", ""],
      ["Copper", ""],
      ["Gold", ""],
      ["Silver", ""],
      ["Steel", ""],
      ["Forest Products", ""],
      ["Paper Products", ""],
    ]},
    { id: "industrials", name: "Industrials", items: [
      ["Aerospace & Defense", ""],
      ["Building Products", ""],
      ["Construction & Engineering", ""],
      ["Electrical Components & Equipment", ""],
      ["Heavy Electrical Equipment", ""],
      ["Industrial Conglomerates", ""],
      ["Industrial Machinery", ""],
      ["Trading Companies & Distributors", ""],
      ["Commercial Printing", ""],
      ["Environmental & Facilities Services", ""],
      ["Human Resource & Employment Services", ""],
      ["Air Freight & Logistics", ""],
      ["Passenger Airlines", ""],
      ["Marine Transportation", ""],
      ["Rail Transportation", ""],
      ["Cargo Ground Transportation", ""],
    ]},
    { id: "discretionary", name: "Consumer Discretionary", items: [
      ["Automotive Parts & Equipment", ""],
      ["Automobile Manufacturers", ""],
      ["Consumer Electronics", ""],
      ["Home Furnishings", ""],
      ["Homebuilding", ""],
      ["Household Appliances", ""],
      ["Leisure Products", ""],
      ["Apparel, Accessories & Luxury Goods", ""],
      ["Hotels, Resorts & Cruise Lines", ""],
      ["Restaurants", ""],
      ["Apparel Retail", ""],
      ["Specialty Retail", ""],
      ["Broadline Retail", ""],
    ]},
    { id: "staples", name: "Consumer Staples", items: [
      ["Drug Retail", ""],
      ["Food Distributors", ""],
      ["Food Retail", ""],
      ["Consumer Staples Merchandise Retail", ""],
      ["Brewers", ""],
      ["Distillers & Vintners", ""],
      ["Soft Drinks & Non-alcoholic Beverages", ""],
      ["Agricultural Products & Services", ""],
      ["Packaged Foods & Meats", ""],
      ["Tobacco", ""],
      ["Household Products", ""],
      ["Personal Care Products", ""],
    ]},
    { id: "health", name: "Health Care", items: [
      ["Health Care Equipment", ""],
      ["Health Care Supplies", ""],
      ["Health Care Distributors", ""],
      ["Health Care Services", ""],
      ["Health Care Facilities", ""],
      ["Managed Health Care", ""],
      ["Health Care Technology", ""],
      ["Biotechnology", ""],
      ["Pharmaceuticals", ""],
      ["Life Sciences Tools & Services", ""],
    ]},
    { id: "financials", name: "Financials", items: [
      ["Diversified Banks", ""],
      ["Regional Banks", ""],
      ["Commercial & Residential Mortgage Finance", ""],
      ["Consumer Finance", ""],
      ["Asset Management & Custody Banks", ""],
      ["Investment Banking & Brokerage", ""],
      ["Diversified Financial Services", ""],
      ["Multi-Sector Holdings", ""],
      ["Financial Exchanges & Data", ""],
      ["Insurance Brokers", ""],
      ["Life & Health Insurance", ""],
      ["Property & Casualty Insurance", ""],
      ["Reinsurance", ""],
    ]},
    { id: "infotech", name: "Information Technology", items: [
      ["IT Consulting & Other Services", ""],
      ["Internet Services & Infrastructure", ""],
      ["Application Software", ""],
      ["Systems Software", ""],
      ["Communications Equipment", ""],
      ["Technology Hardware, Storage & Peripherals", ""],
      ["Electronic Equipment & Instruments", ""],
      ["Electronic Components", ""],
      ["Electronic Manufacturing Services", ""],
      ["Semiconductor Materials & Equipment", ""],
      ["Semiconductors", ""],
    ]},
    { id: "comms", name: "Communication Services", items: [
      ["Alternative Carriers", ""],
      ["Integrated Telecommunication Services", ""],
      ["Wireless Telecommunication Services", ""],
      ["Advertising", ""],
      ["Broadcasting", ""],
      ["Cable & Satellite", ""],
      ["Publishing", ""],
      ["Movies & Entertainment", ""],
      ["Interactive Home Entertainment", ""],
      ["Interactive Media & Services", ""],
    ]},
    { id: "utilities", name: "Utilities", items: [
      ["Electric Utilities", ""],
      ["Gas Utilities", ""],
      ["Multi-Utilities", ""],
      ["Water Utilities", ""],
      ["Independent Power Producers & Energy Traders", ""],
      ["Renewable Electricity", ""],
    ]},
    { id: "realestate", name: "Real Estate", items: [
      ["Diversified REITs", ""],
      ["Industrial REITs", ""],
      ["Hotel & Resort REITs", ""],
      ["Office REITs", ""],
      ["Health Care REITs", ""],
      ["Multi-Family Residential REITs", ""],
      ["Single-Family Residential REITs", ""],
      ["Retail REITs", ""],
      ["Telecom Tower REITs", ""],
      ["Data Center REITs", ""],
      ["Real Estate Operating Companies", ""],
      ["Real Estate Development", ""],
      ["Real Estate Services", ""],
    ]},
  ];

  /* ---- Data: market-screener filter criteria --------------------------- */
  // Categories = criteria groups; items = individual screener filters.
  // Groups are disjoint so each criterion is unique.
  const SCREENER_CATEGORIES = [
    { id: "classification", name: "Classification", items: [
      ["Exchange", ""],
      ["Sector", ""],
      ["Industry", ""],
      ["Country", ""],
      ["Index Membership", ""],
      ["Security Type", ""],
      ["Optionable", ""],
      ["Shortable", ""],
    ]},
    { id: "valuation", name: "Valuation", items: [
      ["Market Capitalization", ""],
      ["P/E Ratio (TTM)", ""],
      ["Forward P/E Ratio", ""],
      ["PEG Ratio", ""],
      ["Price / Sales", ""],
      ["Price / Book", ""],
      ["Price / Cash Flow", ""],
      ["EV / EBITDA", ""],
      ["Enterprise Value", ""],
    ]},
    { id: "profitability", name: "Profitability", items: [
      ["Profit Margin", ""],
      ["Operating Margin", ""],
      ["Gross Margin", ""],
      ["Return on Equity", ""],
      ["Return on Assets", ""],
      ["Return on Invested Capital", ""],
    ]},
    { id: "dividends", name: "Dividends", items: [
      ["Dividend Yield", ""],
      ["Dividend Per Share", ""],
      ["Payout Ratio", ""],
      ["Dividend Growth (5Y)", ""],
      ["Years of Dividend Growth", ""],
      ["Ex-Dividend Date", ""],
    ]},
    { id: "growth", name: "Growth", items: [
      ["Revenue Growth (YoY)", ""],
      ["Revenue Growth (5Y)", ""],
      ["EPS Growth (YoY)", ""],
      ["EPS Growth (5Y)", ""],
      ["EPS Growth (Next Year)", ""],
    ]},
    { id: "price", name: "Price & Volume", items: [
      ["Last Price", ""],
      ["Price Change ($)", ""],
      ["Price Change (%)", ""],
      ["Price Performance (90 Days)", ""],
      ["52-Week High", ""],
      ["52-Week Low", ""],
      ["Beta", ""],
      ["Average Volume (90-Day)", ""],
      ["Relative Volume", ""],
      ["Gap (%)", ""],
    ]},
    { id: "technicals", name: "Technicals", items: [
      ["RSI (14)", ""],
      ["50-Day Moving Average", ""],
      ["200-Day Moving Average", ""],
      ["MACD", ""],
      ["Average True Range", ""],
      ["20-Day Volatility", ""],
    ]},
    { id: "financials", name: "Financial Health", items: [
      ["Total Debt / Equity", ""],
      ["Current Ratio", ""],
      ["Quick Ratio", ""],
      ["Free Cash Flow", ""],
      ["Total Revenue", ""],
      ["Net Income", ""],
      ["Total Cash", ""],
    ]},
    { id: "ownership", name: "Ownership", items: [
      ["Institutional Ownership", ""],
      ["Insider Ownership", ""],
      ["Short Float", ""],
      ["Float", ""],
      ["Shares Outstanding", ""],
    ]},
  ];

  /* ---- Dataset registry — the component is data-driven ----------------- */
  const DATASETS = {
    filings: {
      label: "Filing type",
      searchAll: "Search all filings",
      categories: FILING_CATEGORIES,
      defaultIndex: 2,   // Annual Reports
      mono: true,        // codes read as market symbols
    },
    sectors: {
      label: "Industry / sector",
      searchAll: "Search all industries",
      categories: SECTOR_CATEGORIES,
      defaultIndex: 0,   // Energy
      mono: false,       // names read as plain text
    },
    screener: {
      label: "Add filter criteria",
      searchAll: "Search filters",
      categories: SCREENER_CATEGORIES,
      defaultIndex: 0,   // Classification
      mono: false,
    },
  };


  /* ---- Icons ----------------------------------------------------------- */
  const ICONS = {
    x: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>',
    chevR: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5l5 5-5 5"/></svg>',
    chevL: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5l-5 5 5 5"/></svg>',
    search: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M11 11l3 3" stroke-linecap="round"/></svg>',
  };

  /* ====================================================================== */
  class FilingFilter {
    constructor(trigger, options = {}) {
      this.trigger = trigger;
      // dataset config (data-driven; defaults to filings)
      const ds = DATASETS[options.dataset] || DATASETS.filings;
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
      this.categories.forEach((c) => c.items.forEach(([code, label]) =>
        this.allItems.push({ id: itemId(c.id, code), code, label, catId: c.id, catName: c.name })
      ));
      // chip parts (the trigger is the chip's main button)
      this.chip = trigger.closest(".qm-chip");
      this.chipText = this.chip && this.chip.querySelector("[data-chip-text]");
      this.chipBadge = this.chip && this.chip.querySelector("[data-chip-badge]");
      this.applied = new Set();   // last applied selection
      this.staged = new Set();    // working copy while open
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

    _catById(catId) { return this.categories.find((c) => c.id === catId); }
    _itemsByCat(catId) { return this._catById(catId).items; }

    // Presentation mode:
    //  - "miller"    : wide viewport → two-column dropdown
    //  - "drilldown" : narrow + pointer device → dropdown with drill-down flow
    //  - "sheet"     : narrow + touch device → floating bottom sheet
    get mode() {
      if (!this.mqNarrow.matches) return "miller";
      return this.mqTouch.matches ? "sheet" : "drilldown";
    }
    // Both narrow modes share the drill-down (screens) rendering.
    get usesSheetView() { return this.mode !== "miller"; }

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
      this.panel.id = "qm-filter-panel";

      this.panel.innerHTML = `
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
    toggleOpen() { this.isOpen ? this.dismiss() : this.open(); }

    open() {
      this.staged = new Set(this.applied); // restore last applied
      this.isOpen = true;
      this._lastFocus = document.activeElement;
      this.mobileScreen = 1;
      this.el.sheet.setAttribute("data-screen", "1");
      this.el.s1Search.value = "";
      this.el.s2Search.value = "";
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
        if (this.usesSheetView) this.el.s1Search.focus();
        else (this.el.cats.querySelector('[aria-current="true"]') || this.el.cats.firstElementChild)?.focus();
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
      // categories rail
      this.el.cats.innerHTML = "";
      this.categories.forEach((c) => {
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

      const cat = this._catById(this.activeCat);
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
        const matches = this.allItems.filter((it) =>
          it.code.toLowerCase().includes(q) || it.label.toLowerCase().includes(q) ||
          it.catName.toLowerCase().includes(q));
        if (!matches.length) { this.el.s1List.appendChild(this._emptyState(q)); }
        else matches.forEach((it) => {
          const row = this._itemRow(it.catId, it.code, it.label, it.catName);
          this.el.s1List.appendChild(row);
        });
      } else if (this.narrowNav === "accordion") {
        this.categories.forEach((c) => this.el.s1List.appendChild(this._accSection(c)));
      } else {
        this.categories.forEach((c) => {
          const sel = this._countInCat(c.id);
          const row = document.createElement("button");
          row.type = "button";
          row.className = "qm-catrow";
          row.setAttribute("data-row", "");
          row.title = c.name;
          row.setAttribute("aria-label",
            `${c.name}${sel ? `, ${sel} selected` : ""}, ${c.items.length} options`);
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
      head.setAttribute("aria-label",
        `${cat.name}${sel ? `, ${sel} selected` : ""}, ${cat.items.length} options`);
      head.innerHTML =
        `<span class="qm-acc__chev qm-chev">${ICONS.chevR}</span>` +
        `<span class="qm-catrow__name">${esc(cat.name)}</span>` +
        (sel ? `<span class="qm-catrow__badge" data-acc-badge>${sel}</span>` : `<span class="qm-catrow__badge" data-acc-badge hidden></span>`);
      head.addEventListener("click", () => this._toggleSection(cat.id, sec, head));

      const body = document.createElement("div");
      body.className = "qm-acc__body";
      const inner = document.createElement("div");
      inner.className = "qm-acc__inner";
      inner.appendChild(this._selectAllRow(cat));
      cat.items.forEach(([code, label]) =>
        inner.appendChild(this._itemRow(cat.id, code, label)));
      body.appendChild(inner);

      sec.append(head, body);
      return sec;
    }

    _toggleSection(catId, sec, head) {
      const open = !this.expanded.has(catId);
      if (open) this.expanded.add(catId); else this.expanded.delete(catId);
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
        if (n === 2) this.panel.querySelector("[data-back]").focus();
        else this.el.s1Search.focus();
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
      this.el.s2List.setAttribute("aria-label", cat.name + " filing types");
      this._renderScreen2List();
    }

    _renderScreen2List() {
      const cat = this._catById(this.mobileCat);
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
      // show just the option code as plain text (description kept for a11y only)
      const desc = label && label !== code ? label : "";
      row.setAttribute("aria-label", `${code}${catName ? `, ${catName}` : ""}${desc ? ` — ${desc}` : ""}`);
      if (desc) row.title = desc;
      row.innerHTML =
        `<span class="qm-check" aria-hidden="true"></span>` +
        `<span class="qm-row__code">${esc(code)}</span>` +
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
      row.setAttribute("aria-label", "Select all in " + cat.name);
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
      // Selections apply live: keep the committed set in sync on every toggle
      // and update the trigger chip immediately (not only on "Search").
      this.applied = new Set(this.staged);
      this._renderSummary();
      if (this.usesSheetView) {
        if (this.narrowNav === "accordion" && !this.el.s1Search.value.trim()) {
          // re-sync every open section's rows, select-all, and header badge
          this.el.s1List.querySelectorAll(".qm-acc").forEach((sec) => {
            const catId = sec.getAttribute("data-acc");
            this._syncList(sec, catId);
            const badge = sec.querySelector("[data-acc-badge]");
            const sel = this._countInCat(catId);
            if (badge) { badge.textContent = String(sel); badge.hidden = sel === 0; }
          });
        } else if (this.mobileScreen === 2) {
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
      const cat = this._catById(catId);
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
      this.applied = new Set(this.staged);
      this._renderSummary();
      if (this.usesSheetView) this._renderScreen1();
      else this._renderDesktop();
    }

    _countInCat(catId) {
      return this._itemsByCat(catId).reduce((n, [code]) =>
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
      this.trigger.setAttribute("aria-label",
        n ? `${label} filter, ${n} selected` : `${label} filter`);
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
        if (this.usesSheetView && this.mobileScreen === 2) this._renderScreen2List();
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
        if (this.mode !== "sheet") return; // swipe-to-dismiss is sheet-only
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
  // Expose for embedding; each trigger declares its dataset via data-dataset.
  window.QMFilter = FilingFilter;
  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-qm-filter]").forEach((trigger) => {
      const dataset = trigger.getAttribute("data-dataset") || "filings";
      const narrowNav = trigger.getAttribute("data-narrow-nav") || undefined;
      trigger._qm = new FilingFilter(trigger, { dataset, narrowNav });
    });
  });
})();
