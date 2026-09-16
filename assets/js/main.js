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
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (
        href === currentPath ||
        (currentPath === "" && href === "index.html")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Check if user is logged in to adapt header CTA
    if (window.CB_Storage) {
      const currentUser = window.CB_Storage.getCurrentUser();
      const navActions = document.querySelector(".nav-actions");
      const mobileNavActions = document.querySelector(".mobile-nav-actions");

      if (currentUser && navActions) {
        navActions.innerHTML = `
          <a href="dashboard.html" class="user-greeting-pill" title="Access Dashboard">
            <span class="pulse-dot"></span>
            <span>${currentUser.firstName} (${currentUser.role})</span>
          </a>
          <a href="dashboard.html" class="btn btn-primary btn-sm">
            <span>Dashboard</span>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        `;
      }
      if (currentUser && mobileNavActions) {
        mobileNavActions.innerHTML = `
          <a href="dashboard.html" class="btn btn-primary btn-lg">
            <span>Executive Dashboard</span>
          </a>
          <button onclick="window.CB_Storage.logout()" class="btn btn-secondary btn-lg">
            <span>Sign Out</span>
          </button>
        `;
      }
    }
  }

  // 4. Mobile Navigation Drawer & Background Scroll Lock
  function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger-btn");
    const overlay = document.querySelector(".mobile-nav-overlay");
    if (!hamburger || !overlay) return;

    function toggleMenu() {
      const isOpen = document.body.classList.toggle("nav-open");
      hamburger.setAttribute("aria-expanded", isOpen);
    }

    hamburger.addEventListener("click", toggleMenu);

    // Close mobile menu on overlay link click
    const mobileLinks = overlay.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
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

  // DOM Content Loaded Initializer
  document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    applyDynamicGreetings();
    initNavbar();
    initMobileMenu();
    initAOS();
    initFAQ();
  });

  // Re-run greetings periodically (e.g. every minute)
  setInterval(applyDynamicGreetings, 60000);
})();
