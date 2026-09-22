/**
 * STACKLY - MAIN JAVASCRIPT MODULE
 * - Loader lifecycle with fallback timeout
 * - Sticky fixed header & active route indicator
 * - Mobile drawer navigation & background scroll lock
 * - Dynamic time-of-day greeting (morning, afternoon, evening, night)
 * - AOS (Animate On Scroll) intersection observer engine
 * - FAQ accordion & UI interactive elements
 */

(function () {
  "use strict";

  // 1. Page Loader Lifecycle
  function initLoader() {
    const loader = document.getElementById("page-loader");
    if (!loader) return;

    function hideLoader() {
      if (!loader.classList.contains("loaded")) {
        loader.classList.add("loaded");
        setTimeout(() => {
          loader.remove();
        }, 600);
      }
    }

    // Hide when DOM is ready
    if (document.readyState === "complete") {
      setTimeout(hideLoader, 300);
    } else {
      window.addEventListener("load", hideLoader);
    }

    // Safety fallback timeout (2.5s maximum)
    setTimeout(hideLoader, 2500);
  }

  // 2. Dynamic Time-of-Day Greeting
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good evening";
    } else {
      return "Good night";
    }
  }

  function applyDynamicGreetings() {
    const greeting = getGreeting();
    const greetingEls = document.querySelectorAll(".dynamic-greeting");
    greetingEls.forEach((el) => {
      const user = window.CB_Storage
        ? window.CB_Storage.getCurrentUser()
        : null;
      const userName = user ? user.firstName : "Executive";
      el.textContent = `${greeting}, ${userName}`;
    });

    const greetingPrefixEls = document.querySelectorAll(".greeting-time-text");
    greetingPrefixEls.forEach((el) => {
      el.textContent = greeting;
    });
  }

  // 3. Sticky Navbar & Active Route Highlight
  function initNavbar() {
    const header = document.querySelector(".site-header");
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 30) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }

    // Highlight current active route
    const currentPath =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(
      ".nav-link, .mobile-nav-link, .mobile-submenu-card"
    );
    const advisoryPages = [
      "services.html",
      "mergers-acquisitions.html",
      "strategic-capital.html",
      "turnaround-optimization.html",
      "esg-governance.html",
    ];

    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const targetFile = href.split("/").pop();
      if (
        targetFile === currentPath ||
        (currentPath === "index.html" &&
          (targetFile === "index.html" || href === "/"))
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Highlight mobile dropdown button if currently on any advisory service page
    if (advisoryPages.includes(currentPath)) {
      const mobileDropdownBtn = document.querySelector(".mobile-dropdown-btn");
      if (mobileDropdownBtn) {
        mobileDropdownBtn.classList.add("active");
      }
    }

    // Check if user is logged in to adapt header CTA
    if (window.CB_Storage) {
      const currentUser = window.CB_Storage.getCurrentUser();
      const navActions = document.querySelector(".nav-actions");
      const mobileNavActions = document.querySelector(".mobile-nav-actions");
      const isInPages =
        window.location.pathname.includes("/pages/") ||
        window.location.pathname.includes("\\pages\\");
      const dashUrl = isInPages ? "dashboard.html" : "pages/dashboard.html";

      if (currentUser && navActions) {
        navActions.innerHTML = `
          <a href="${dashUrl}" class="user-greeting-pill" title="Access Dashboard">
            <span class="pulse-dot"></span>
            <span>${currentUser.firstName} (${currentUser.role})</span>
          </a>
          <a href="${dashUrl}" class="btn btn-primary btn-sm">
            <span>Dashboard</span>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        `;
      }
      if (currentUser && mobileNavActions) {
        mobileNavActions.innerHTML = `
          <a href="${dashUrl}" class="btn btn-primary btn-lg">
            <span>Executive Dashboard</span>
          </a>
          <button onclick="window.CB_Storage.logout()" class="btn btn-secondary btn-lg">
            <span>Sign Out</span>
          </button>
        `;
      }
    }
  }

  // 4. Mobile Navigation Drawer, Dedicated Close Control & Full-Screen Submenu
  function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger-btn");
    const overlay = document.querySelector(".mobile-nav-overlay");
    if (!hamburger || !overlay) return;

    const fullScreenDropdown = overlay.querySelector(
      ".mobile-fullscreen-dropdown"
    );
    const dropdownBtn = overlay.querySelector(".mobile-dropdown-btn");
    const submenuBackBtn = overlay.querySelector(".mobile-submenu-back");
    const submenuCloseBtn = overlay.querySelector(".mobile-submenu-close");

    function openSubmenu() {
      if (fullScreenDropdown) {
        fullScreenDropdown.classList.add("is-open");
        if (dropdownBtn) dropdownBtn.setAttribute("aria-expanded", "true");
        fullScreenDropdown.scrollTop = 0;
      }
    }

    function closeSubmenu() {
      if (fullScreenDropdown) {
        fullScreenDropdown.classList.remove("is-open");
        if (dropdownBtn) dropdownBtn.setAttribute("aria-expanded", "false");
      }
    }

    function openMenu() {
      document.body.classList.add("nav-open");
      document.documentElement.classList.add("nav-open");
      hamburger.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      document.body.classList.remove("nav-open");
      document.documentElement.classList.remove("nav-open");
      hamburger.setAttribute("aria-expanded", "false");
      closeSubmenu();
    }

    function toggleMenu() {
      if (document.body.classList.contains("nav-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    hamburger.addEventListener("click", toggleMenu);

    if (dropdownBtn) {
      dropdownBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openSubmenu();
      });
    }

    if (submenuBackBtn) {
      submenuBackBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeSubmenu();
      });
    }

    if (submenuCloseBtn) {
      submenuCloseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeMenu();
      });
    }

    // Dedicated Close Button inside overlay
    const closeBtn = overlay.querySelector(
      ".mobile-nav-close:not(.mobile-submenu-close)"
    );
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeMenu();
      });
    }

    // Close on any anchor link click
    const mobileLinks = overlay.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (
          fullScreenDropdown &&
          fullScreenDropdown.classList.contains("is-open")
        ) {
          closeSubmenu();
        } else if (document.body.classList.contains("nav-open")) {
          closeMenu();
        }
      }
    });
  }

  // 5. Built-in AOS (Animate On Scroll) Engine
  function initAOS() {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const elements = document.querySelectorAll("[data-aos]");

    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add("aos-animate"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("aos-animate"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
            obs.unobserve(entry.target); // trigger once
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // 6. FAQ Accordion Functionality
  function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      if (question) {
        question.addEventListener("click", () => {
          const isActive = item.classList.contains("active");
          faqItems.forEach((other) => other.classList.remove("active"));
          if (!isActive) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  // 7. Interactive Mandate Scope Calculator (Engagement Models Page)
  function initScopeCalculator() {
    const scalePills = document.querySelectorAll(
      "#calc-scale-pills .calc-pill-btn"
    );
    const pacePills = document.querySelectorAll(
      "#calc-pace-pills .calc-pill-btn"
    );
    const mandatePills = document.querySelectorAll(
      "#calc-mandate-pills .calc-pill-btn"
    );

    if (!scalePills.length) return;

    let currentScale = "small";
    let currentPace = "standard";
    let currentMandate = "ma";

    function setupPillGroup(group, onSelect) {
      group.forEach((btn) => {
        btn.addEventListener("click", () => {
          group.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          onSelect(
            btn.getAttribute("data-scale") ||
              btn.getAttribute("data-pace") ||
              btn.getAttribute("data-mandate")
          );
          calculateScope();
        });
      });
    }

    setupPillGroup(scalePills, (val) => {
      currentScale = val;
    });
    setupPillGroup(pacePills, (val) => {
      currentPace = val;
    });
    setupPillGroup(mandatePills, (val) => {
      currentMandate = val;
    });

    function calculateScope() {
      const tierEl = document.getElementById("calc-tier-result");
      const descEl = document.getElementById("calc-tier-desc");
      const squadEl = document.getElementById("calc-squad-result");
      const partnerEl = document.getElementById("calc-partner-result");
      const feeEl = document.getElementById("calc-fee-result");

      if (!tierEl) return;

      if (
        currentMandate === "turnaround" ||
        currentPace === "urgent" ||
        currentScale === "mega"
      ) {
        tierEl.textContent = "Enterprise Turnaround Mandate";
        descEl.textContent =
          "Emergency operational restructuring, 13-week daily liquidity committee, and interim CRO on-site presence.";
        squadEl.textContent = "6 Specialists (incl. Interim CRO)";
        partnerEl.textContent = "Full-Time Dedicated";
        feeEl.innerHTML =
          '$65,000 <span style="font-size: 0.82rem; font-weight: 500; color: #94a3b8;">/ mo</span>';
      } else if (currentScale === "small" && currentPace === "standard") {
        tierEl.textContent = "Boardroom Strategic Retainer";
        descEl.textContent =
          "Quarterly board strategy briefings, ongoing governance counsel, and continuous competitor intelligence.";
        squadEl.textContent = "2 Advisory Partners";
        partnerEl.textContent = "15 Hours / Month";
        feeEl.innerHTML =
          '$15,000 <span style="font-size: 0.82rem; font-weight: 500; color: #94a3b8;">/ mo</span>';
      } else {
        tierEl.textContent = "Transaction Lead Mandate";
        descEl.textContent =
          "Dedicated deal execution pod with comprehensive valuation dossiers, cryptographic VDR, and regulatory antitrust clearance.";
        squadEl.textContent = "4 Dedicated Specialists";
        partnerEl.textContent = "40 Hours / Month";
        feeEl.innerHTML =
          '$35,000 <span style="font-size: 0.82rem; font-weight: 500; color: #94a3b8;">/ mo</span>';
      }
    }
  }

  // DOM Content Loaded Initializer
  document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    applyDynamicGreetings();
    initNavbar();
    initMobileMenu();
    initAOS();
    initFAQ();
    initScopeCalculator();
  });

  // Re-run greetings periodically (e.g. every minute)
  setInterval(applyDynamicGreetings, 60000);
})();
