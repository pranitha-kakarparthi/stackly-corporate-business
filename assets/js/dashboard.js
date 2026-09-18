/**
 * STACKLY - DASHBOARD ENGINE & ROLE-AWARE RENDERING
 * - Route protection (redirect to sign-in.html if unauthenticated)
 * - Dynamic role adaptation (Admin, Manager, Employee, Customer, Vendor)
 * - Live metrics, responsive vector charts, and searchable data tables
 * - Instant role switcher for reviewers
 */

(function () {
  "use strict";

  // 1. Session & Auth Guard (Strict Production RBAC)
  const currentUser = window.CB_Storage
    ? window.CB_Storage.getCurrentUser()
    : null;

  if (!currentUser) {
    window.location.replace("sign-in.html");
    return;
  }

  // Enforce role-based access to dedicated dashboard pages
  const currentPath = window.location.pathname
    .replace(/\\/g, "/")
    .toLowerCase();
  const authorizedRole = (currentUser.role || "Manager").toLowerCase();
  const authorizedPage = `dashboard-${authorizedRole}.html`;

  if (
    currentPath.includes("dashboard-") &&
    !currentPath.includes(authorizedPage)
  ) {
    window.location.replace(authorizedPage);
    return;
  }

  // 2. Role Configuration & Content Data
  const ROLE_CONFIGS = {
    Admin: {
      tag: "Enterprise System Administrator",
      stats: [
        {
          label: "Active Corporate Users",
          value: "1,428",
          delta: "+12.4%",
          positive: true,
          iconClass: "blue",
        },
        {
          label: "Platform Availability",
          value: "99.99%",
          delta: "SOC2 Type II",
          positive: true,
          iconClass: "emerald",
        },
        {
          label: "Audit Security Events",
          value: "0 Critical",
          delta: "Nominal",
          positive: true,
          iconClass: "purple",
        },
        {
          label: "Active Retainers Managed",
          value: "48 Entities",
          delta: "+$4.2B AUM",
          positive: true,
          iconClass: "amber",
        },
      ],
      tableTitle: "Global Corporate Access & User Directory",
      columns: [
        "User / Executive",
        "Corporate Role",
        "Email Address",
        "Account Status",
        "Actions",
      ],
      rows: [
        {
          col1: "Victoria Alexander",
          col2: "Admin (CEO)",
          col3: "admin@corporatebusiness.com",
          status: "Active",
          statusClass: "active",
        },
        {
          col1: "Marcus Sterling",
          col2: "Manager (Allocations)",
          col3: "manager@corporatebusiness.com",
          status: "Active",
          statusClass: "active",
        },
        {
          col1: "Elena Rostova",
          col2: "Employee (M&A Strategy)",
          col3: "employee@corporatebusiness.com",
          status: "Active",
          statusClass: "active",
        },
        {
          col1: "David Chen",
          col2: "Customer (COO Vanguard)",
          col3: "client@vanguardholding.com",
          status: "Active",
          statusClass: "active",
        },
        {
          col1: "Sarah Jenkins",
          col2: "Vendor (Apex Legal)",
          col3: "vendor@apexadvisory.com",
          status: "Active",
          statusClass: "active",
        },
      ],
      timeline: [
        {
          title: "Global SOC-2 Type II audit report re-certified",
          time: "18m ago",
        },
        {
          title: "Enterprise SSO integration finalized for Vanguard Group",
          time: "2h ago",
        },
        {
          title: "Admin security permissions verified by Victoria Alexander",
          time: "5h ago",
        },
      ],
    },
    Manager: {
      tag: "Director of Strategic Allocations",
      stats: [
        {
          label: "Deal Pipeline Under Review",
          value: "$840M",
          delta: "+18.5%",
          positive: true,
          iconClass: "blue",
        },
        {
          label: "Active M&A Mandates",
          value: "14 Deals",
          delta: "8 in Due Diligence",
          positive: true,
          iconClass: "emerald",
        },
        {
          label: "Advisory Team Utilization",
          value: "91.4%",
          delta: "Optimal",
          positive: true,
          iconClass: "purple",
        },
        {
          label: "Quarterly Target Pacing",
          value: "114%",
          delta: "Exceeded",
          positive: true,
          iconClass: "amber",
        },
      ],
      tableTitle: "Active Deal Pipeline & Transaction Tracking",
      columns: [
        "Project / Asset Mandate",
        "Industry Sector",
        "Target Valuation",
        "Deal Stage",
        "Actions",
      ],
      rows: [
        {
          col1: "Project Helios (Cross-Border Acquisition)",
          col2: "Clean Energy & Infrastructure",
          col3: "$320M",
          status: "Due Diligence",
          statusClass: "review",
        },
        {
          col1: "Project Titan (Corporate Restructuring)",
          col2: "Industrial Manufacturing",
          col3: "$180M",
          status: "Negotiation",
          statusClass: "pending",
        },
        {
          col1: "Project Apex (EBITDA Turnaround)",
          col2: "Enterprise Cloud Logistics",
          col3: "$95M",
          status: "Closed",
          statusClass: "active",
        },
        {
          col1: "Project Zenith (Carve-out Advisory)",
          col2: "Biotechnology & Health",
          col3: "$245M",
          status: "Due Diligence",
          statusClass: "review",
        },
      ],
      timeline: [
        {
          title: "Financial model validated for Project Helios ($320M)",
          time: "45m ago",
        },
        {
          title: "Negotiation term sheet submitted to European consortium",
          time: "3h ago",
        },
        {
          title: "Executive committee briefing completed with Marcus Sterling",
          time: "1d ago",
        },
      ],
    },
    Employee: {
      tag: "Senior Advisory Strategy Associate",
      stats: [
        {
          label: "Assigned Advisory Briefs",
          value: "6 Deliverables",
          delta: "2 Due This Week",
          positive: true,
          iconClass: "blue",
        },
        {
          label: "Weekly Hours Logged",
          value: "38.5 hrs",
          delta: "98% Billable",
          positive: true,
          iconClass: "emerald",
        },
        {
          label: "Diligence Checklists Completed",
          value: "24 / 26",
          delta: "92%",
          positive: true,
          iconClass: "purple",
        },
        {
          label: "Peer Review Score",
          value: "4.95 / 5.0",
          delta: "Top Decile",
          positive: true,
          iconClass: "amber",
        },
      ],
      tableTitle: "My Active Deliverables & Research Mandates",
      columns: [
        "Deliverable Name",
        "Engagement Lead",
        "Due Date",
        "Status",
        "Actions",
      ],
      rows: [
        {
          col1: "Q3 Synergies & Valuation Model - Project Helios",
          col2: "Marcus Sterling",
          col3: "Sep 22, 2026",
          status: "In Review",
          statusClass: "review",
        },
        {
          col1: "Regulatory Antitrust Clearance Brief - Germany",
          col2: "Victoria Alexander",
          col3: "Sep 26, 2026",
          status: "In Progress",
          statusClass: "pending",
        },
        {
          col1: "Post-Merger Governance Blueprint - Apex Group",
          col2: "Sarah Jenkins",
          col3: "Oct 04, 2026",
          status: "Approved",
          statusClass: "active",
        },
      ],
      timeline: [
        {
          title: "Uploaded revised EBITDA sensitivity matrix to secure vault",
          time: "1h ago",
        },
        {
          title: "Completed market benchmarking research for Swiss acquisition",
          time: "4h ago",
        },
      ],
    },
    Customer: {
      tag: "Corporate Enterprise Retainer Client",
      stats: [
        {
          label: "Advisory Retainer Status",
          value: "Platinum Tier",
          delta: "Active Contract",
          positive: true,
          iconClass: "blue",
        },
        {
          label: "Completed Deliverables",
          value: "18 Reports",
          delta: "All Signed",
          positive: true,
          iconClass: "emerald",
        },
        {
          label: "Strategic Value Unlocked",
          value: "+$48.5M",
          delta: "EBITDA Impact",
          positive: true,
          iconClass: "purple",
        },
        {
          label: "Next Executive Board Briefing",
          value: "In 3 Days",
          delta: "10:00 AM EST",
          positive: true,
          iconClass: "amber",
        },
      ],
      tableTitle: "Enterprise Mandates & Deliverable Repository",
      columns: [
        "Mandate Dossier",
        "Advisory Lead",
        "Delivery Date",
        "Review Status",
        "Actions",
      ],
      rows: [
        {
          col1: "Cross-Border Capital Allocation Blueprint 2026-2029",
          col2: "Victoria Alexander",
          col3: "Aug 28, 2026",
          status: "Approved",
          statusClass: "active",
        },
        {
          col1: "ESG Governance Framework & Board Resolution",
          col2: "Elena Rostova",
          col3: "Sep 02, 2026",
          status: "Approved",
          statusClass: "active",
        },
        {
          col1: "Strategic Acquisition Target Dossier (Confidential)",
          col2: "Marcus Sterling",
          col3: "Sep 15, 2026",
          status: "New Delivery",
          statusClass: "review",
        },
      ],
      timeline: [
        {
          title: "New confidential advisory briefing uploaded to portal",
          time: "2h ago",
        },
        { title: "Invoice #CB-2026-881 marked as settled", time: "3d ago" },
      ],
    },
    Vendor: {
      tag: "Certified Advisory & Legal Partner",
      stats: [
        {
          label: "Active Vendor Engagements",
          value: "3 Mandates",
          delta: "Full Compliance",
          positive: true,
          iconClass: "blue",
        },
        {
          label: "SLA Performance Metric",
          value: "99.8%",
          delta: "Exceeded",
          positive: true,
          iconClass: "emerald",
        },
        {
          label: "Submitted Invoices",
          value: "$145,000",
          delta: "Approved for Pay",
          positive: true,
          iconClass: "purple",
        },
        {
          label: "Partner Compliance Rating",
          value: "Tier 1 Certified",
          delta: "Verified",
          positive: true,
          iconClass: "amber",
        },
      ],
      tableTitle: "Active Procurement & Service Level Engagements",
      columns: [
        "Service Contract",
        "Legal Entity",
        "Term Period",
        "Compliance Status",
        "Actions",
      ],
      rows: [
        {
          col1: "Due Diligence Legal & Audit Services 2026",
          col2: "Stackly Advisory Group",
          col3: "12 Months",
          status: "Compliant",
          statusClass: "active",
        },
        {
          col1: "Antitrust Advisory Subcontract - Project Helios",
          col2: "Consortium Lead",
          col3: "Project Term",
          status: "Active",
          statusClass: "active",
        },
        {
          col1: "Annual Information Security Attestation",
          col2: "Internal Audit",
          col3: "Renewed",
          status: "Verified",
          statusClass: "active",
        },
      ],
      timeline: [
        {
          title: "Annual ISO/IEC security compliance attestation accepted",
          time: "1d ago",
        },
        {
          title: "Statement of work executed for Q4 transaction audit",
          time: "4d ago",
        },
      ],
    },
  };

  // 3. Render Dashboard based on User Role
  function renderDashboard(role) {
    const config = ROLE_CONFIGS[role] || ROLE_CONFIGS.Admin;

    // Header & User info
    const userNameEl = document.getElementById("dash-user-name");
    const userRoleEl = document.getElementById("dash-user-role");
    const userInitialsEl = document.getElementById("dash-user-initials");
    if (userNameEl)
      userNameEl.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    if (userRoleEl) userRoleEl.textContent = `${role} • Corporate Portal`;
    if (userInitialsEl)
      userInitialsEl.textContent = (
        currentUser.firstName[0] + currentUser.lastName[0]
      ).toUpperCase();

    // Dynamic greeting calculation
    const hour = new Date().getHours();
    let timeGreeting = "Good afternoon";
    if (hour >= 5 && hour < 12) timeGreeting = "Good morning";
    else if (hour >= 17 && hour < 21) timeGreeting = "Good evening";
    else if (hour >= 21 || hour < 5) timeGreeting = "Good night";

    const greetingTitle = document.getElementById("dash-greeting-title");
    if (greetingTitle) {
      greetingTitle.textContent = `${timeGreeting}, ${currentUser.firstName}`;
    }

    // Render 4 Stat Cards
    const statsContainer = document.getElementById("dash-stats-grid");
    if (statsContainer) {
      statsContainer.innerHTML = config.stats
        .map(
          (s) => `
        <div class="dash-stat-card">
          <div class="stat-top-row">
            <div class="stat-icon-square ${s.iconClass}">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span class="stat-delta ${s.positive ? "positive" : "neutral"}">${s.delta}</span>
          </div>
          <div class="stat-metric-num">${s.value}</div>
          <div class="stat-metric-label">${s.label}</div>
        </div>
      `
        )
        .join("");
    }

    // Render Data Table
    const tableTitleEl = document.getElementById("dash-table-title");
    if (tableTitleEl) tableTitleEl.textContent = config.tableTitle;

    const tableHead = document.getElementById("dash-table-head");
    if (tableHead) {
      tableHead.innerHTML = `<tr>${config.columns.map((c) => `<th>${c}</th>`).join("")}</tr>`;
    }

    const tableBody = document.getElementById("dash-table-body");
    if (tableBody) {
      renderTableRows(config.rows);
    }

    // Render Activity Timeline
    const timelineList = document.getElementById("dash-timeline-list");
    if (timelineList) {
      timelineList.innerHTML = config.timeline
        .map(
          (t) => `
        <li class="activity-item">
          <div class="activity-marker"></div>
          <div class="activity-details">
            <p>${t.title}</p>
            <span>${t.time}</span>
          </div>
        </li>
      `
        )
        .join("");
    }

    // Draw Vector Analytics Chart
    drawAnalyticsChart(role);
  }

  // 4. Render Table Rows with Status & Search Support
  function renderTableRows(rows) {
    const tableBody = document.getElementById("dash-table-body");
    if (!tableBody) return;

    if (!rows.length) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">No matching records found.</td></tr>`;
      return;
    }

    tableBody.innerHTML = rows
      .map(
        (r) => `
      <tr>
        <td><strong>${r.col1}</strong></td>
        <td>${r.col2}</td>
        <td>${r.col3}</td>
        <td><span class="table-status-pill ${r.statusClass}">${r.status}</span></td>
        <td>
          <a href="404.html" class="btn btn-secondary-light btn-sm">
            View Details
          </a>
        </td>
      </tr>
    `
      )
      .join("");
  }

  // 5. Interactive SVG Analytics Chart
  function drawAnalyticsChart(role) {
    const chartWrap = document.getElementById("dash-chart-wrap");
    if (!chartWrap) return;

    // SVG Line chart with smooth Bezier curve & gradient fill
    chartWrap.innerHTML = `
      <svg viewBox="0 0 700 220" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#C5A880" stop-opacity="0.38"/>
            <stop offset="100%" stop-color="#C5A880" stop-opacity="0.0"/>
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#A88656"/>
            <stop offset="50%" stop-color="#C5A880"/>
            <stop offset="100%" stop-color="#DFCAAB"/>
          </linearGradient>
        </defs>

        <!-- Grid Lines -->
        <line x1="40" y1="30" x2="680" y2="30" stroke="#E6E2D8" stroke-width="1" stroke-dasharray="4"/>
        <line x1="40" y1="80" x2="680" y2="80" stroke="#E6E2D8" stroke-width="1" stroke-dasharray="4"/>
        <line x1="40" y1="130" x2="680" y2="130" stroke="#E6E2D8" stroke-width="1" stroke-dasharray="4"/>
        <line x1="40" y1="180" x2="680" y2="180" stroke="#D5CFC2" stroke-width="1.5"/>

        <!-- Area Fill -->
        <path d="M 50 180 L 50 140 Q 150 90, 230 115 T 410 65 T 570 45 T 670 25 L 670 180 Z" fill="url(#chartGrad)"/>

        <!-- Trajectory Curve -->
        <path d="M 50 140 Q 150 90, 230 115 T 410 65 T 570 45 T 670 25" fill="none" stroke="url(#lineGrad)" stroke-width="3.5" stroke-linecap="round"/>

        <!-- Data Points -->
        <circle cx="50" cy="140" r="4.5" fill="#A88656" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="230" cy="115" r="4.5" fill="#A88656" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="410" cy="65" r="4.5" fill="#C5A880" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="570" cy="45" r="4.5" fill="#DFCAAB" stroke="#FFFFFF" stroke-width="2"/>
        <circle cx="670" cy="25" r="5" fill="#234338" stroke="#FFFFFF" stroke-width="2.5"/>

        <!-- Month Labels -->
        <text x="50" y="205" fill="#737D78" font-size="11" font-weight="600" text-anchor="middle">May</text>
        <text x="205" y="205" fill="#737D78" font-size="11" font-weight="600" text-anchor="middle">Jun</text>
        <text x="360" y="205" fill="#737D78" font-size="11" font-weight="600" text-anchor="middle">Jul</text>
        <text x="515" y="205" fill="#737D78" font-size="11" font-weight="600" text-anchor="middle">Aug</text>
        <text x="670" y="205" fill="#A88656" font-size="11" font-weight="700" text-anchor="middle">Sep (Current)</text>
      </svg>
    `;
  }

  // 6. Real-time Search in Table
  function initTableSearch() {
    const searchInput = document.getElementById("table-search");
    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase().trim();
      const currentRole =
        currentUser && currentUser.role ? currentUser.role : "Admin";
      const allRows = (ROLE_CONFIGS[currentRole] || ROLE_CONFIGS.Admin).rows;

      const filtered = allRows.filter(
        (r) =>
          r.col1.toLowerCase().includes(q) ||
          r.col2.toLowerCase().includes(q) ||
          r.col3.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q)
      );

      renderTableRows(filtered);
    });
  }

  // Dynamic Profile Headers & Live Timezone
  function updateUserProfileHeaders() {
    if (!currentUser) return;
    const displayName =
      currentUser.name ||
      `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim() ||
      "Executive";
    const roleName = currentUser.role || "Admin";

    const userNameEl =
      document.querySelector("#dash-user-name") ||
      document.querySelector("#userName");
    const userRoleEl =
      document.querySelector("#dash-user-role") ||
      document.querySelector("#userRole");
    const userAvatarEl =
      document.querySelector("#dash-user-initials") ||
      document.querySelector("#userAvatar");
    const greetingTitleEl = document.querySelector("#dash-greeting-title");
    const greetingNameEl =
      document.querySelector("#dash-greeting-name") ||
      document.querySelector("#greetingName");
    const timezonePillEl = document.querySelector("#dash-timezone-pill");

    if (userNameEl) userNameEl.textContent = displayName;
    if (userRoleEl) userRoleEl.textContent = `${roleName} Access`;
    if (userAvatarEl) {
      const parts = displayName.split(" ").filter(Boolean);
      const initials =
        parts.length > 1
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
          : parts[0]
            ? parts[0][0].toUpperCase()
            : "A";
      userAvatarEl.textContent = initials;
    }

    const now = new Date();
    const hours = now.getHours();
    let timeGreeting = "Good morning";
    if (hours >= 12 && hours < 17) {
      timeGreeting = "Good afternoon";
    } else if (hours >= 17 || hours < 5) {
      timeGreeting = "Good evening";
    }

    if (greetingTitleEl) {
      greetingTitleEl.textContent = `${timeGreeting}, ${displayName.split(" ")[0]}`;
    }
    if (greetingNameEl) {
      greetingNameEl.textContent = `${displayName}.`;
    }

    if (timezonePillEl) {
      const tzString =
        Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      timezonePillEl.innerHTML = `<span class="dash-timezone-dot"></span><span>${timeString} • ${tzString}</span>`;
    }
  }

  // 8. Mobile Sidebar Toggle & Fixed Drawer
  function initSidebarToggle() {
    const toggleBtn = document.querySelector(".sidebar-toggle-btn");
    const closeBtn = document.getElementById("dash-mobile-close");
    const sidebar = document.querySelector(".dash-sidebar");
    const backdrop = document.getElementById("dash-sidebar-backdrop");

    if (!sidebar) return;

    function openMobileDrawer() {
      sidebar.classList.add("sidebar-open");
      document.body.classList.add("sidebar-open");
      document.documentElement.classList.add("sidebar-open");
      if (backdrop) backdrop.style.display = "block";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    function closeMobileDrawer() {
      sidebar.classList.remove("sidebar-open");
      document.body.classList.remove("sidebar-open");
      document.documentElement.classList.remove("sidebar-open");
      if (backdrop) backdrop.style.display = "none";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (sidebar.classList.contains("sidebar-open")) {
          closeMobileDrawer();
        } else {
          openMobileDrawer();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMobileDrawer();
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", () => {
        closeMobileDrawer();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar.classList.contains("sidebar-open")) {
        closeMobileDrawer();
      }
    });

    // Close mobile drawer when clicking navigation links
    const mobileNavLinks = sidebar.querySelectorAll(".dash-nav-item a");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          closeMobileDrawer();
        }
      });
    });
  }

  // 9. Desktop Sidebar Collapse Toggle & Menu Highlight
  function initSidebarCollapse() {
    const collapseBtns = document.querySelectorAll(".sidebar-collapse-btn");
    const wrapper = document.querySelector(".dashboard-wrapper");
    const sidebar = document.querySelector(".dash-sidebar");
    const navItems = document.querySelectorAll(".dash-nav-item");
    if (!wrapper) return;

    function syncTooltips(isCollapsed) {
      navItems.forEach((item) => {
        const link = item.querySelector("a");
        const tipText = item.getAttribute("data-tooltip");
        if (link) {
          if (isCollapsed && tipText) {
            link.setAttribute("title", tipText);
          } else {
            link.removeAttribute("title");
          }
        }
      });
    }

    collapseBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // If on mobile screen, this button closes the full-screen drawer
        if (window.innerWidth < 992) {
          if (sidebar && sidebar.classList.contains("sidebar-open")) {
            sidebar.classList.remove("sidebar-open");
            document.body.classList.remove("sidebar-open");
            document.documentElement.classList.remove("sidebar-open");
            const backdrop = document.getElementById("dash-sidebar-backdrop");
            if (backdrop) backdrop.style.display = "none";
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            return;
          }
        }

        const isCollapsed = wrapper.classList.toggle("sidebar-collapsed");
        const label = btn.querySelector(".collapse-label");
        if (label) {
          label.textContent = isCollapsed ? "Expand Menu" : "Collapse Menu";
        }
        btn.setAttribute("aria-expanded", !isCollapsed);
        syncTooltips(isCollapsed);
      });
    });

    // Handle access and highlighting when menu bar is in collapsed mode
    navItems.forEach((item) => {
      // Prevent drag
      item.addEventListener("dragstart", (e) => e.preventDefault());

      const link = item.querySelector("a");
      if (link) {
        link.addEventListener("dragstart", (e) => e.preventDefault());

        link.addEventListener("click", () => {
          if (wrapper.classList.contains("sidebar-collapsed")) {
            navItems.forEach((i) => i.classList.remove("highlighted"));
            item.classList.add("highlighted");
            setTimeout(() => {
              item.classList.remove("highlighted");
            }, 2200);
          }
        });

        link.addEventListener("focus", () => {
          if (wrapper.classList.contains("sidebar-collapsed")) {
            item.classList.add("highlighted");
          }
        });

        link.addEventListener("blur", () => {
          item.classList.remove("highlighted");
        });
      }
    });

    // Initial tooltip sync based on wrapper state
    syncTooltips(wrapper.classList.contains("sidebar-collapsed"));
  }

  // =========================================================
  // 10. TOAST NOTIFICATION UTILITY
  // =========================================================
  window.showDashToast = function (message, type = "info", duration = 3500) {
    const container = document.getElementById("dash-toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `dash-toast toast-${type}`;

    let iconSvg = `<svg class="dash-toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    if (type === "success") {
      iconSvg = `<svg class="dash-toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg class="dash-toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div style="flex-grow: 1;">${message}</div>
      <button type="button" style="background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; font-size: 1.1rem; line-height: 1; padding: 0 4px;" aria-label="Dismiss">&times;</button>
    `;

    const closeBtn = toast.querySelector("button");
    closeBtn.addEventListener("click", () => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      setTimeout(() => toast.remove(), 200);
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(8px)";
        setTimeout(() => toast.remove(), 250);
      }
    }, duration);
  };

  // =========================================================
  // 11. DASHBOARD HASH ROUTER
  // =========================================================
  const VALID_VIEWS = [
    "overview",
    "transactions",
    "capital",
    "vault",
    "analytics",
    "governance",
  ];

  const VIEW_HEADER_MAP = {
    overview: {
      title: "Good afternoon, Executive",
      time: "Stackly Encrypted Session • Verified TLS 1.3",
    },
    transactions: {
      title: "Transactions & Mandate Pipeline",
      time: "14 Active Engagements • Real-time Sync",
    },
    capital: {
      title: "Capital Allocation & Treasury",
      time: "$4.80B Active AUM • Solvency Stress-Tested",
    },
    vault: {
      title: "Deliverables Vault & VDR",
      time: "FIPS 140-2 Level 3 Enclave • 256-Bit TLS",
    },
    analytics: {
      title: "Financial Analytics & Sensitivities",
      time: "Run-Rate EBITDA & Valuation Simulator",
    },
    governance: {
      title: "Governance, Risk & Compliance",
      time: "SOC-2 Type II & SEC Rule 17a-4 Attested",
    },
  };

  function switchView(viewName) {
    if (!VALID_VIEWS.includes(viewName)) {
      viewName = "overview";
    }

    // Toggle active view container
    const views = document.querySelectorAll(".dash-view");
    views.forEach((v) => {
      if (v.id === `view-${viewName}`) {
        v.classList.add("active-view");
      } else {
        v.classList.remove("active-view");
      }
    });

    // Toggle active nav menu item
    const navItems = document.querySelectorAll(".dash-nav-item");
    navItems.forEach((item) => {
      if (item.getAttribute("data-view") === viewName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update greeting/topbar titles
    const titleEl = document.getElementById("dash-greeting-title");
    const timeEl = document.querySelector(".dash-greeting-time");
    const meta = VIEW_HEADER_MAP[viewName];
    if (meta) {
      if (titleEl) {
        if (viewName === "overview") {
          const user = window.CB_Storage
            ? window.CB_Storage.getCurrentUser()
            : null;
          const firstName = user ? user.name.split(" ")[0] : "Executive";
          titleEl.textContent = `Good afternoon, ${firstName}`;
        } else {
          titleEl.textContent = meta.title;
        }
      }
      if (timeEl) {
        timeEl.textContent = meta.time;
      }
    }

    // Close mobile drawer if open
    if (window.innerWidth < 992) {
      const sidebar = document.querySelector(".dash-sidebar");
      if (sidebar && sidebar.classList.contains("sidebar-open")) {
        sidebar.classList.remove("sidebar-open");
        document.body.classList.remove("sidebar-open");
        document.documentElement.classList.remove("sidebar-open");
        const backdrop = document.getElementById("dash-sidebar-backdrop");
        if (backdrop) backdrop.style.display = "none";
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function initDashboardRouter() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace("#", "").trim();
      switchView(hash);
    });

    const initialHash =
      window.location.hash.replace("#", "").trim() || "overview";
    switchView(initialHash);
  }

  // =========================================================
  // 12. TRANSACTIONS MODULE CONTROLLER
  // =========================================================
  window.advanceDealStage = function (dealId) {
    const card = document.querySelector(`.kanban-card[data-id="${dealId}"]`);
    if (!card) return;

    const currentCol = card.closest(".kanban-col");
    const currentStage = currentCol
      ? currentCol.getAttribute("data-stage")
      : "";
    const stages = ["sourcing", "dd", "loi", "closing"];
    const currentIdx = stages.indexOf(currentStage);

    if (currentIdx >= 0 && currentIdx < stages.length - 1) {
      const nextStage = stages[currentIdx + 1];
      const targetCardsContainer = document.getElementById(
        `cards-col-${nextStage}`
      );
      if (targetCardsContainer) {
        targetCardsContainer.appendChild(card);

        // Update counts
        const prevCountEl = document.getElementById(
          `count-col-${currentStage}`
        );
        const nextCountEl = document.getElementById(`count-col-${nextStage}`);
        if (prevCountEl)
          prevCountEl.textContent = targetCardsContainer.previousElementSibling
            ? parseInt(prevCountEl.textContent, 10) - 1
            : "0";
        if (nextCountEl)
          nextCountEl.textContent = parseInt(nextCountEl.textContent, 10) + 1;

        // If moved to closing, update the action button
        if (nextStage === "closing") {
          const actionRow = card.querySelector(".kanban-card-actions");
          if (actionRow) {
            actionRow.innerHTML = `
              <span style="color: #10b981; font-weight: 700;">Closing Verification</span>
              <button type="button" class="btn-advance" onclick="window.showDashToast('Deal successfully closed and locked.', 'success')">Verify ✓</button>
            `;
          }
        }

        const dealTitle =
          card.querySelector(".kanban-card-title")?.textContent || "Deal";
        const stageNames = {
          dd: "Due Diligence & QofE",
          loi: "LOI & Term Sheet",
          closing: "Closing & Escrow",
        };
        window.showDashToast(
          `${dealTitle} advanced to ${stageNames[nextStage] || nextStage}.`,
          "success"
        );
      }
    } else {
      window.showDashToast(
        "Deal is already in definitive closing phase.",
        "info"
      );
    }
  };

  window.inspectDealModal = function (dealName, valuation, sector) {
    const modal = document.getElementById("dash-inspect-modal");
    const body = document.getElementById("modal-inspect-body");
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="background: #fbfaf8; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Target Asset & Sector</div>
          <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-primary-900); margin: 4px 0;">${dealName}</div>
          <div style="font-size: 0.85rem; color: var(--color-accent-gold-dark); font-weight: 600;">Enterprise Valuation: ${valuation} • ${sector}</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div style="background: #fbfaf8; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">TRANSACTION STRUCTURE</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-primary-900); margin-top: 2px;">100% Cash-Free, Debt-Free</div>
          </div>
          <div style="background: #fbfaf8; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
            <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">EXCLUSIVITY PERIOD</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-primary-900); margin-top: 2px;">45 Calendar Days</div>
          </div>
        </div>

        <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; background: #faf9f5; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
          <strong>Counsel & Syndicate:</strong> Apex Global Legal LLP • Quality of Earnings verified by KPMG • Hart-Scott-Rodino filing submission confirmed under FTC Tier-2 review.
        </div>
      </div>
    `;

    modal.classList.add("open");
  };

  function initTransactionsModule() {
    // Sector Filter Pills
    const filterPills = document.querySelectorAll(
      "#tx-filter-pills .filter-pill"
    );
    const cards = document.querySelectorAll(".kanban-card");
    const searchInput = document.getElementById("tx-search-input");

    function applyFilterAndSearch() {
      const activePill = document.querySelector(
        "#tx-filter-pills .filter-pill.active"
      );
      const filter = activePill
        ? activePill.getAttribute("data-filter")
        : "all";
      const query = (searchInput ? searchInput.value : "").trim().toLowerCase();

      cards.forEach((card) => {
        const sector = (card.getAttribute("data-sector") || "").toLowerCase();
        const text = card.textContent.toLowerCase();

        const matchesFilter = filter === "all" || sector.includes(filter);
        const matchesQuery = !query || text.includes(query);

        card.style.display = matchesFilter && matchesQuery ? "flex" : "none";
      });

      // Also filter transactions table
      const tableRows = document.querySelectorAll("#tx-table-body tr");
      tableRows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        const matchesQuery = !query || text.includes(query);
        row.style.display = matchesQuery ? "" : "none";
      });
    }

    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        filterPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        applyFilterAndSearch();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilterAndSearch);
    }

    // New Mandate Modal Handlers
    const openBtn = document.getElementById("tx-open-modal-btn");
    const gotoBtn = document.getElementById("btn-goto-new-mandate");
    const closeBtn = document.getElementById("btn-close-mandate-modal");
    const cancelBtn = document.getElementById("btn-cancel-mandate-modal");
    const modal = document.getElementById("dash-new-mandate-modal");
    const form = document.getElementById("form-new-mandate");

    function openModal() {
      if (modal) modal.classList.add("open");
    }
    function closeModal() {
      if (modal) modal.classList.remove("open");
      if (form) form.reset();
    }

    if (openBtn) openBtn.addEventListener("click", openModal);
    if (gotoBtn) gotoBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Inspect Modal Dismiss Handlers
    const inspectModal = document.getElementById("dash-inspect-modal");
    const closeInspectBtn = document.getElementById("btn-close-inspect-modal");
    const dismissInspectBtn = document.getElementById(
      "btn-dismiss-inspect-modal"
    );

    function closeInspect() {
      if (inspectModal) inspectModal.classList.remove("open");
    }
    if (closeInspectBtn)
      closeInspectBtn.addEventListener("click", closeInspect);
    if (dismissInspectBtn)
      dismissInspectBtn.addEventListener("click", closeInspect);
    if (inspectModal) {
      inspectModal.addEventListener("click", (e) => {
        if (e.target === inspectModal) closeInspect();
      });
    }

    // Handle Form Submission
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name =
          document.getElementById("mandate-name")?.value || "New Mandate";
        const sector =
          document.getElementById("mandate-sector")?.value || "tech";
        const valuation =
          document.getElementById("mandate-valuation")?.value || "300";
        const stage =
          document.getElementById("mandate-stage")?.value || "sourcing";
        const partner =
          document.getElementById("mandate-partner")?.value ||
          "Victoria Alexander";

        const sectorLabels = {
          tech: "Enterprise SaaS",
          energy: "Clean Energy",
          health: "Life Sciences",
          fintech: "FinTech",
          industrial: "Industrial",
        };
        const sectorLabel = sectorLabels[sector] || "Corporate M&A";

        // Generate card
        const newId = `deal-${Date.now()}`;
        const newCard = document.createElement("div");
        newCard.className = "kanban-card";
        newCard.setAttribute("data-sector", sector);
        newCard.setAttribute("data-id", newId);
        newCard.innerHTML = `
          <span class="kanban-card-sector">${sectorLabel}</span>
          <div class="kanban-card-title">${name}</div>
          <div class="kanban-card-val-row">
            <span class="kanban-card-val">$${valuation}M EV</span>
            <span class="kanban-card-partner">${partner}</span>
          </div>
          <div class="kanban-card-actions">
            <span style="color: var(--text-muted);">Confidential Review</span>
            <button type="button" class="btn-advance" onclick="window.advanceDealStage('${newId}')">Advance →</button>
          </div>
        `;

        const targetCol = document.getElementById(`cards-col-${stage}`);
        if (targetCol) {
          targetCol.prepend(newCard);
          const countEl = document.getElementById(`count-col-${stage}`);
          if (countEl)
            countEl.textContent = parseInt(countEl.textContent, 10) + 1;
        }

        // Also prepend to table
        const tableBody = document.getElementById("tx-table-body");
        if (tableBody) {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td><strong>${name}</strong></td>
            <td>${sectorLabel}</td>
            <td><strong style="color: var(--color-primary-900);">$${valuation}M</strong></td>
            <td><span class="status-badge status-active">Active</span></td>
            <td>${partner}</td>
            <td>Q4 2026</td>
            <td><button type="button" class="btn btn-subtle btn-sm" onclick="window.inspectDealModal('${name}', '$${valuation}M', '${sectorLabel}')">Inspect Terms</button></td>
          `;
          tableBody.prepend(newRow);
        }

        closeModal();
        window.showDashToast(
          `Mandate "${name}" successfully registered in ${sectorLabel} pipeline.`,
          "success"
        );
      });
    }
  }

  // =========================================================
  // 13. CAPITAL ALLOCATION MODULE CONTROLLER
  // =========================================================
  window.simulateFacilityDrawdown = function (facilityName, amountM) {
    window.showDashToast(
      `$${amountM}M drawdown executed for ${facilityName}. Liquidity ledger updated.`,
      "success"
    );
  };

  function initCapitalAllocationModule() {
    const sSenior = document.getElementById("slider-senior");
    const sMezz = document.getElementById("slider-mezz");
    const sEquity = document.getElementById("slider-equity");
    const sSpecial = document.getElementById("slider-special");

    if (!sSenior || !sMezz || !sEquity || !sSpecial) return;

    function updateCapitalModel() {
      const vSenior = parseInt(sSenior.value, 10);
      const vMezz = parseInt(sMezz.value, 10);
      const vEquity = parseInt(sEquity.value, 10);
      const vSpecial = parseInt(sSpecial.value, 10);

      // Update badges
      const bSenior = document.getElementById("val-badge-senior");
      const bMezz = document.getElementById("val-badge-mezz");
      const bEquity = document.getElementById("val-badge-equity");
      const bSpecial = document.getElementById("val-badge-special");
      if (bSenior) bSenior.textContent = `${vSenior}%`;
      if (bMezz) bMezz.textContent = `${vMezz}%`;
      if (bEquity) bEquity.textContent = `${vEquity}%`;
      if (bSpecial) bSpecial.textContent = `${vSpecial}%`;

      const sum = vSenior + vMezz + vEquity + vSpecial;
      const pSenior = ((vSenior / sum) * 100).toFixed(1);
      const pMezz = ((vMezz / sum) * 100).toFixed(1);
      const pEquity = ((vEquity / sum) * 100).toFixed(1);
      const pSpecial = ((vSpecial / sum) * 100).toFixed(1);

      // Update segments
      const segSenior = document.getElementById("seg-senior");
      const segMezz = document.getElementById("seg-mezz");
      const segEquity = document.getElementById("seg-equity");
      const segSpecial = document.getElementById("seg-special");

      if (segSenior) {
        segSenior.style.width = `${pSenior}%`;
        segSenior.textContent = `Senior ${pSenior}%`;
      }
      if (segMezz) {
        segMezz.style.width = `${pMezz}%`;
        segMezz.textContent = `Mezz ${pMezz}%`;
      }
      if (segEquity) {
        segEquity.style.width = `${pEquity}%`;
        segEquity.textContent = `Equity ${pEquity}%`;
      }
      if (segSpecial) {
        segSpecial.style.width = `${pSpecial}%`;
        segSpecial.textContent = `${pSpecial}%`;
      }

      // Yield & Risk calculation:
      // Senior: 7.2%, Mezz: 11.5%, Equity: 18.5%, Special: 24.0%
      const blendedYield = (
        (vSenior * 7.2 + vMezz * 11.5 + vEquity * 18.5 + vSpecial * 24.0) /
        sum
      ).toFixed(2);

      // Risk score (1-5)
      const riskScore = (
        (vSenior * 1.5 + vMezz * 2.8 + vEquity * 4.2 + vSpecial * 4.9) /
        sum
      ).toFixed(2);

      // Annual cashflow on $4.8B
      const cashflow = (4800 * (blendedYield / 100)).toFixed(1);

      const outYield = document.getElementById("out-blended-yield");
      const outRisk = document.getElementById("out-risk-index");
      const outCash = document.getElementById("out-annual-cashflow");

      if (outYield) outYield.textContent = `${blendedYield}% IRR`;
      if (outRisk) outRisk.textContent = `${riskScore} / 5.0`;
      if (outCash) outCash.textContent = `$${cashflow}M / yr`;
    }

    [sSenior, sMezz, sEquity, sSpecial].forEach((slider) => {
      slider.addEventListener("input", updateCapitalModel);
    });

    // Preset buttons
    const pConserv = document.getElementById("preset-conservative");
    const pBalance = document.getElementById("preset-balanced");
    const pAggress = document.getElementById("preset-aggressive");

    if (pConserv) {
      pConserv.addEventListener("click", () => {
        sSenior.value = 60;
        sMezz.value = 25;
        sEquity.value = 10;
        sSpecial.value = 5;
        updateCapitalModel();
        window.showDashToast(
          "Conservative Capital Allocation preset applied.",
          "info"
        );
      });
    }
    if (pBalance) {
      pBalance.addEventListener("click", () => {
        sSenior.value = 45;
        sMezz.value = 25;
        sEquity.value = 20;
        sSpecial.value = 10;
        updateCapitalModel();
        window.showDashToast(
          "Balanced Growth Allocation preset applied.",
          "info"
        );
      });
    }
    if (pAggress) {
      pAggress.addEventListener("click", () => {
        sSenior.value = 30;
        sMezz.value = 20;
        sEquity.value = 35;
        sSpecial.value = 15;
        updateCapitalModel();
        window.showDashToast(
          "Aggressive Expansion Allocation preset applied.",
          "info"
        );
      });
    }

    updateCapitalModel();
  }

  // =========================================================
  // 14. DELIVERABLES VAULT MODULE CONTROLLER
  // =========================================================
  window.verifyVaultChecksum = function (filename, hash) {
    window.showDashToast(
      `SHA-256 Checksum Verified: ${hash.substring(0, 8)}... Matches root certificate. Zero tampering.`,
      "success"
    );
  };

  window.downloadVaultFile = function (filename) {
    window.showDashToast(
      `Decrypting & downloading ${filename} via TLS 1.3 tunnel...`,
      "info"
    );
  };

  function initVaultModule() {
    const dropzone = document.getElementById("vault-dropzone");
    const fileInput = document.getElementById("vault-file-input");
    const progressBar = document.getElementById("vault-upload-progress");
    const progressFill = document.getElementById("vault-upload-progress-fill");
    const tableBody = document.getElementById("vault-table-body");
    const searchInput = document.getElementById("vault-search-input");
    const filterPills = document.querySelectorAll(
      "#vault-filter-pills .filter-pill"
    );

    function simulateUpload(fileName) {
      if (!progressBar || !progressFill) return;
      progressBar.style.display = "block";
      progressFill.style.width = "0%";

      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        progressFill.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            progressBar.style.display = "none";
            progressFill.style.width = "0%";

            // Prepend new row
            const randomHash =
              Math.random().toString(16).substring(2, 8) +
              "..." +
              Math.random().toString(16).substring(2, 6);
            const newRow = document.createElement("tr");
            newRow.setAttribute("data-category", "legal");
            newRow.innerHTML = `
              <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18" style="color: var(--color-accent-gold-dark);">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <strong>${fileName}</strong>
                </div>
              </td>
              <td><span class="status-badge status-active">Legal & M&A</span></td>
              <td>Active Pipeline</td>
              <td><span class="hash-code-snippet">${randomHash}</span></td>
              <td>12.4 MB</td>
              <td>Just now</td>
              <td>
                <div style="display: flex; gap: 6px;">
                  <button type="button" class="btn btn-subtle btn-sm" onclick="window.verifyVaultChecksum('${fileName}', '${randomHash}')">Verify</button>
                  <button type="button" class="btn btn-secondary-light btn-sm" onclick="window.downloadVaultFile('${fileName}')">Download</button>
                </div>
              </td>
            `;
            if (tableBody) tableBody.prepend(newRow);
            window.showDashToast(
              `"${fileName}" encrypted with AES-256 and signed with SHA-256.`,
              "success"
            );
          }, 300);
        }
      }, 150);
    }

    if (dropzone) {
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      });
      dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("dragover");
      });
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        const file = e.dataTransfer.files[0];
        const name = file
          ? file.name
          : "Executed_Syndication_Agreement_Signed.pdf";
        simulateUpload(name);
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        const name = file
          ? file.name
          : "Board_Resolution_Approval_Executed.pdf";
        simulateUpload(name);
      });
    }

    // Vault Category Filter & Search
    function applyVaultFilter() {
      const activePill = document.querySelector(
        "#vault-filter-pills .filter-pill.active"
      );
      const filter = activePill
        ? activePill.getAttribute("data-filter")
        : "all";
      const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
      const rows = document.querySelectorAll("#vault-table-body tr");

      rows.forEach((row) => {
        const cat = (row.getAttribute("data-category") || "").toLowerCase();
        const text = row.textContent.toLowerCase();
        const matchesFilter = filter === "all" || cat === filter;
        const matchesQuery = !query || text.includes(query);
        row.style.display = matchesFilter && matchesQuery ? "" : "none";
      });
    }

    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        filterPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        applyVaultFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyVaultFilter);
    }
  }

  // =========================================================
  // 15. FINANCIAL ANALYTICS & SENSITIVITIES CONTROLLER
  // =========================================================
  function initAnalyticsModule() {
    const sRev = document.getElementById("slider-revenue");
    const sMargin = document.getElementById("slider-margin");
    const sMult = document.getElementById("slider-multiple");
    const btnReset = document.getElementById("btn-reset-sensitivity");
    const matrixTbody = document.getElementById("sens-matrix-tbody");

    if (!sRev || !sMargin || !sMult) return;

    function renderMatrix(revenue, currentMargin, currentMultiple) {
      if (!matrixTbody) return;
      const margins = [24, 28, 32, 36, 40];
      const multiples = [10.0, 12.0, 14.0, 16.0, 18.0, 20.0];

      let html = "";
      margins.forEach((m) => {
        html += `<tr><th>${m}.0%</th>`;
        multiples.forEach((mult) => {
          const ebitda = revenue * (m / 100);
          const ev = Math.round(ebitda * mult);

          // Check if this cell is closest to current inputs
          const isMarginMatch = Math.abs(currentMargin - m) <= 2;
          const isMultMatch = Math.abs(currentMultiple - mult) <= 1.0;
          const activeClass =
            isMarginMatch && isMultMatch ? " active-cell" : "";

          html += `<td class="${activeClass}" data-margin="${m}" data-mult="${mult}">$${ev.toLocaleString()}M</td>`;
        });
        html += `</tr>`;
      });

      matrixTbody.innerHTML = html;

      // Add click handler to snap sliders to clicked cell
      const cells = matrixTbody.querySelectorAll("td");
      cells.forEach((cell) => {
        cell.addEventListener("click", () => {
          const m = parseInt(cell.getAttribute("data-margin"), 10);
          const mult = parseFloat(cell.getAttribute("data-mult"));
          sMargin.value = m;
          sMult.value = mult;
          updateAnalytics();
          window.showDashToast(
            `Valuation parameters snapped to ${m}% Margin and ${mult}x Exit Multiple.`,
            "info"
          );
        });
      });
    }

    function updateAnalytics() {
      const rev = parseFloat(sRev.value);
      const margin = parseFloat(sMargin.value);
      const mult = parseFloat(sMult.value);

      // Update badges
      const bRev = document.getElementById("val-badge-revenue");
      const bMargin = document.getElementById("val-badge-margin");
      const bMult = document.getElementById("val-badge-multiple");
      if (bRev) bRev.textContent = `$${rev}M`;
      if (bMargin) bMargin.textContent = `${margin.toFixed(1)}%`;
      if (bMult) bMult.textContent = `${mult.toFixed(1)}x`;

      const ebitda = rev * (margin / 100);
      const ev = ebitda * mult;
      const equity = Math.max(0, ev - 450);
      const evRev = (ev / rev).toFixed(2);

      // Update stats
      const oEbitda = document.getElementById("out-calc-ebitda");
      const oEv = document.getElementById("out-calc-ev");
      const oEquity = document.getElementById("out-calc-equity");
      const oEvRev = document.getElementById("out-calc-ev-rev");
      const topEv = document.getElementById("sens-top-ev");
      const topEbitda = document.getElementById("sens-top-ebitda");

      if (oEbitda) oEbitda.textContent = `$${ebitda.toFixed(1)}M`;
      if (oEv)
        oEv.textContent = `$${Math.round(ev).toLocaleString()}M ($${(ev / 1000).toFixed(2)}B)`;
      if (oEquity)
        oEquity.textContent = `$${Math.round(equity).toLocaleString()}M`;
      if (oEvRev) oEvRev.textContent = `${evRev}x`;
      if (topEv) topEv.textContent = `$${(ev / 1000).toFixed(2)}B`;
      if (topEbitda) topEbitda.textContent = `$${Math.round(ebitda)}M`;

      renderMatrix(rev, margin, mult);
    }

    [sRev, sMargin, sMult].forEach((s) =>
      s.addEventListener("input", updateAnalytics)
    );

    if (btnReset) {
      btnReset.addEventListener("click", () => {
        sRev.value = 850;
        sMargin.value = 32;
        sMult.value = 14.5;
        updateAnalytics();
        window.showDashToast(
          "Valuation assumptions reset to base investment thesis.",
          "info"
        );
      });
    }

    updateAnalytics();
  }

  // =========================================================
  // 16. GOVERNANCE & AUDIT CONTROLLER
  // =========================================================
  function initGovernanceModule() {
    const scanBtn = document.getElementById("btn-run-sec-scan");
    const scanTrack = document.getElementById("sec-scanner-track");
    const scanBar = document.getElementById("sec-scanner-bar");
    const scanStatus = document.getElementById("sec-scanner-status");
    const scanBadge = document.getElementById("sec-scanner-badge");
    const auditList = document.getElementById("gov-audit-list");
    const filterPills = document.querySelectorAll(
      "#gov-filter-pills .filter-pill"
    );
    const searchInput = document.getElementById("gov-search-input");
    const exportCsvBtn = document.getElementById("btn-export-gov-csv");
    const exportJsonBtn = document.getElementById("btn-export-gov-json");

    if (scanBtn) {
      scanBtn.addEventListener("click", () => {
        if (scanTrack && scanBar) {
          scanTrack.style.display = "block";
          scanBar.style.width = "0%";
          if (scanBadge) scanBadge.textContent = "Scanning...";
          if (scanStatus)
            scanStatus.textContent =
              "Validating cryptographic HSM key rotation & Merkle blocks...";

          let p = 0;
          const interval = setInterval(() => {
            p += 25;
            scanBar.style.width = `${p}%`;
            if (p === 50 && scanStatus) {
              scanStatus.textContent =
                "Verifying SOC-2 Type II attestation & IAM user role boundaries...";
            }
            if (p >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                scanTrack.style.display = "none";
                if (scanBadge) scanBadge.textContent = "Verified Nominal";
                if (scanStatus)
                  scanStatus.textContent =
                    "100% Operational • Merkle root verified against decentralized archive";

                // Add verified event to list
                if (auditList) {
                  const item = document.createElement("li");
                  item.className = "audit-stream-item";
                  item.setAttribute("data-category", "auth");
                  item.innerHTML = `
                    <div>
                      <div style="font-size: 0.88rem; font-weight: 700; color: var(--color-primary-900);">
                        Interactive Fiduciary Security Verification scan completed: 0 defects
                      </div>
                      <div style="font-size: 0.78rem; color: var(--text-muted);">
                        Actor: Victoria Alexander • System Diagnostic • SHA-256: 4f89d2
                      </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span class="audit-severity-tag sev-nominal">Verified</span>
                      <span style="font-size: 0.76rem; color: var(--text-muted); white-space: nowrap;">Just now</span>
                    </div>
                  `;
                  auditList.prepend(item);
                }

                window.showDashToast(
                  "Security Scan Complete: All 4,120 cryptographic ledger blocks verified.",
                  "success"
                );
              }, 400);
            }
          }, 450);
        }
      });
    }

    // Filter audit list
    function applyAuditFilter() {
      const activePill = document.querySelector(
        "#gov-filter-pills .filter-pill.active"
      );
      const filter = activePill
        ? activePill.getAttribute("data-filter")
        : "all";
      const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
      const items = document.querySelectorAll(
        "#gov-audit-list .audit-stream-item"
      );

      items.forEach((item) => {
        const cat = (item.getAttribute("data-category") || "").toLowerCase();
        const text = item.textContent.toLowerCase();
        const matchesFilter = filter === "all" || cat === filter;
        const matchesQuery = !query || text.includes(query);
        item.style.display = matchesFilter && matchesQuery ? "flex" : "none";
      });
    }

    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        filterPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        applyAuditFilter();
      });
    });

    if (searchInput) searchInput.addEventListener("input", applyAuditFilter);

    if (exportCsvBtn) {
      exportCsvBtn.addEventListener("click", () => {
        window.showDashToast(
          "Enterprise Audit Log exported as cryptographic CSV.",
          "info"
        );
      });
    }
    if (exportJsonBtn) {
      exportJsonBtn.addEventListener("click", () => {
        window.showDashToast(
          "Enterprise Audit Log exported as signed JSON dossier.",
          "info"
        );
      });
    }

    // Export Overview Stream button
    const btnExportOverview = document.getElementById(
      "btn-export-overview-stream"
    );
    if (btnExportOverview) {
      btnExportOverview.addEventListener("click", () => {
        window.showDashToast(
          "Live activity telemetry exported to secure spreadsheet.",
          "info"
        );
      });
    }
  }

  // Initializer
  document.addEventListener("DOMContentLoaded", () => {
    const initialRole = currentUser.role || "Admin";
    renderDashboard(initialRole);
    updateUserProfileHeaders();
    initTableSearch();
    initSidebarToggle();
    initSidebarCollapse();

    // Module Initializations
    initDashboardRouter();
    initTransactionsModule();
    initCapitalAllocationModule();
    initVaultModule();
    initAnalyticsModule();
    initGovernanceModule();
  });
})();
