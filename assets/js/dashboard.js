/**
 * STACKLY - DASHBOARD ENGINE & ROLE-AWARE RENDERING
 * - Route protection (redirect to sign-in.html if unauthenticated)
 * - Dynamic role adaptation (Admin, Manager, Employee, Customer, Vendor)
 * - Live metrics, responsive vector charts, and searchable data tables
 * - Instant role switcher for reviewers
 */

(function () {
  "use strict";

  // 1. Auth Guard
  const currentUser = window.CB_Storage
    ? window.CB_Storage.getCurrentUser()
    : null;
  if (!currentUser) {
    window.location.href = "sign-in.html";
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
    const roleTagEl = document.getElementById("dash-role-tag");
    const roleSelectEl = document.getElementById("dash-role-select");

    if (userNameEl)
      userNameEl.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    if (userRoleEl) userRoleEl.textContent = `${role} • Corporate Portal`;
    if (userInitialsEl)
      userInitialsEl.textContent = (
        currentUser.firstName[0] + currentUser.lastName[0]
      ).toUpperCase();
    if (roleTagEl) roleTagEl.textContent = config.tag;
    if (roleSelectEl) roleSelectEl.value = role;

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
        <circle cx="670" cy="25" r="5" fill="#1B4332" stroke="#FFFFFF" stroke-width="2.5"/>

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
      const currentRole = document.getElementById("dash-role-select").value;
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

  // 7. Role Switcher on Dashboard
  function initRoleSwitcher() {
    const select = document.getElementById("dash-role-select");
    if (!select) return;

    select.addEventListener("change", () => {
      const newRole = select.value;
      currentUser.role = newRole;
      window.CB_Storage.setCurrentUser(currentUser);
      renderDashboard(newRole);
    });
  }

  // 8. Mobile Sidebar Toggle
  function initSidebarToggle() {
    const btn = document.querySelector(".sidebar-toggle-btn");
    const sidebar = document.querySelector(".dash-sidebar");
    if (!btn || !sidebar) return;

    btn.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar-open");
    });

    document.addEventListener("click", (e) => {
      if (
        !sidebar.contains(e.target) &&
        !btn.contains(e.target) &&
        sidebar.classList.contains("sidebar-open")
      ) {
        sidebar.classList.remove("sidebar-open");
      }
    });
  }

  // 9. Desktop Sidebar Collapse Toggle
  function initSidebarCollapse() {
    const collapseBtns = document.querySelectorAll(".sidebar-collapse-btn");
    const wrapper = document.querySelector(".dashboard-wrapper");
    if (!wrapper) return;

    collapseBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        wrapper.classList.toggle("sidebar-collapsed");
      });
    });
  }

  // Initializer
  document.addEventListener("DOMContentLoaded", () => {
    const initialRole = currentUser.role || "Admin";
    renderDashboard(initialRole);
    initTableSearch();
    initRoleSwitcher();
    initSidebarToggle();
    initSidebarCollapse();
  });
})();
