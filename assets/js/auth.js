/**
 * STACKLY - AUTHENTICATION LOGIC & VALIDATION
 * - Form validation with auto-focus to first error
 * - Password show/hide toggle
 * - Password strength meter & live requirements checklist
 * - Country code & mobile validation
 * - Role selector & Demo Quick Fill buttons
 * - LocalStorage session storage & routing
 */

(function () {
  "use strict";

  // 1. Password Visibility Toggle
  function initPasswordToggles() {
    const toggleBtns = document.querySelectorAll(".password-toggle-btn");
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute("data-target");
        const input = document.getElementById(targetId);
        if (!input) return;

        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";

        // Update SVG icon
        btn.innerHTML = isPassword
          ? `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
            </svg>`
          : `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>`;
        btn.setAttribute(
          "aria-label",
          isPassword ? "Hide password" : "Show password"
        );
      });
    });
  }

  // 2. Password Strength Evaluation
  function evaluatePasswordStrength(password) {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    if (checks.length) score++;
    if (checks.upper && checks.lower) score++;
    if (checks.number) score++;
    if (checks.special) score++;

    return { score, checks };
  }

  function initPasswordStrengthMeter() {
    const passwordInput = document.getElementById("signup-password");
    const strengthBars = document.getElementById("strength-bars");
    const strengthText = document.getElementById("strength-text-val");
    const reqLength = document.getElementById("req-length");
    const reqUpper = document.getElementById("req-upper");
    const reqNumber = document.getElementById("req-number");
    const reqSpecial = document.getElementById("req-special");

    if (!passwordInput || !strengthBars) return;

    passwordInput.addEventListener("input", () => {
      const val = passwordInput.value;
      const { score, checks } = evaluatePasswordStrength(val);

      // Update checklist
      if (reqLength) reqLength.className = checks.length ? "valid" : "invalid";
      if (reqUpper)
        reqUpper.className = checks.upper && checks.lower ? "valid" : "invalid";
      if (reqNumber) reqNumber.className = checks.number ? "valid" : "invalid";
      if (reqSpecial)
        reqSpecial.className = checks.special ? "valid" : "invalid";

      // Update strength bar class
      strengthBars.className = "strength-bars";
      if (val.length === 0) {
        if (strengthText) strengthText.textContent = "None";
      } else if (score <= 1) {
        strengthBars.classList.add("strength-weak");
        if (strengthText) strengthText.textContent = "Weak";
      } else if (score === 2) {
        strengthBars.classList.add("strength-fair");
        if (strengthText) strengthText.textContent = "Fair";
      } else if (score === 3) {
        strengthBars.classList.add("strength-good");
        if (strengthText) strengthText.textContent = "Good";
      } else {
        strengthBars.classList.add("strength-strong");
        if (strengthText)
          strengthText.textContent = "Strong (Enterprise Ready)";
      }
    });
  }

  // 3. Demo Role Quick Fill Helper (Frictionless Testing)
  function initDemoRoleQuickBar() {
    const demoButtons = document.querySelectorAll(".demo-pill-btn");
    if (!demoButtons.length) return;

    const emailInput = document.getElementById("signin-email");
    const passInput = document.getElementById("signin-password");
    const roleSelect = document.getElementById("signin-role");

    demoButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const role = btn.getAttribute("data-role");
        const defaultUsers = window.CB_Storage
          ? window.CB_Storage.DEFAULT_USERS
          : [];
        const found = defaultUsers.find((u) => u.role === role);

        if (found) {
          if (emailInput) emailInput.value = found.email;
          if (passInput) passInput.value = found.password;
          if (roleSelect) roleSelect.value = found.role;

          // Clear validation errors
          document
            .querySelectorAll(".is-invalid")
            .forEach((el) => el.classList.remove("is-invalid"));
          const alert = document.getElementById("auth-alert");
          if (alert) alert.style.display = "none";
        }
      });
    });
  }

  // 4. Sign In Form Handler
  function initSignInForm() {
    const form = document.getElementById("signin-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstInvalid = null;

      const email = document.getElementById("signin-email");
      const password = document.getElementById("signin-password");
      const role = document.getElementById("signin-role");
      const alert = document.getElementById("auth-alert");

      // Reset
      [email, password, role].forEach(
        (el) => el && el.classList.remove("is-invalid")
      );
      if (alert) alert.style.display = "none";

      // Validation
      const emailVal = email.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        email.classList.add("is-invalid");
        firstInvalid = firstInvalid || email;
      }

      const passVal = password.value;
      if (!passVal) {
        password.classList.add("is-invalid");
        firstInvalid = firstInvalid || password;
      }

      if (!role.value) {
        role.classList.add("is-invalid");
        firstInvalid = firstInvalid || role;
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // Authenticate via storage
      const result = window.CB_Storage.authenticate(
        emailVal,
        passVal,
        role.value
      );
      if (result.success) {
        if (alert) {
          alert.className = "form-alert alert-success";
          alert.textContent = `Welcome back, ${result.user.firstName}! Redirecting to Executive Portal...`;
          alert.style.display = "block";
        }
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 800);
      } else {
        if (alert) {
          alert.className = "form-alert";
          alert.style.backgroundColor = "#FEF2F2";
          alert.style.border = "1px solid #FECACA";
          alert.style.color = "#B91C1C";
          alert.textContent = result.message;
          alert.style.display = "block";
        }
        password.classList.add("is-invalid");
        password.focus();
      }
    });
  }

  // 5. Sign Up Form Handler
  function initSignUpForm() {
    const form = document.getElementById("signup-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstInvalid = null;

      const firstName = document.getElementById("signup-firstname");
      const lastName = document.getElementById("signup-lastname");
      const email = document.getElementById("signup-email");
      const password = document.getElementById("signup-password");
      const confirmPassword = document.getElementById(
        "signup-confirm-password"
      );
      const role = document.getElementById("signup-role");
      const phone = document.getElementById("signup-phone");
      const terms = document.getElementById("signup-terms");
      const alert = document.getElementById("signup-alert");

      // Reset
      form
        .querySelectorAll(".is-invalid")
        .forEach((el) => el.classList.remove("is-invalid"));
      if (alert) alert.style.display = "none";

      // Validate Names
      if (!firstName.value.trim()) {
        firstName.classList.add("is-invalid");
        firstInvalid = firstInvalid || firstName;
      }
      if (!lastName.value.trim()) {
        lastName.classList.add("is-invalid");
        firstInvalid = firstInvalid || lastName;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        email.classList.add("is-invalid");
        firstInvalid = firstInvalid || email;
      }

      // Validate Password
      const { score } = evaluatePasswordStrength(password.value);
      if (score < 3 || password.value.length < 8) {
        password.classList.add("is-invalid");
        firstInvalid = firstInvalid || password;
      }

      // Confirm Password
      if (confirmPassword.value !== password.value || !confirmPassword.value) {
        confirmPassword.classList.add("is-invalid");
        firstInvalid = firstInvalid || confirmPassword;
      }

      // Validate Role
      if (!role.value) {
        role.classList.add("is-invalid");
        firstInvalid = firstInvalid || role;
      }

      // Validate Phone (Digits only >= 7)
      const cleanPhone = phone.value.replace(/\D/g, "");
      if (phone.value.trim() && cleanPhone.length < 7) {
        phone.classList.add("is-invalid");
        firstInvalid = firstInvalid || phone;
      }

      // Validate Terms Checkbox
      if (!terms.checked) {
        terms.classList.add("is-invalid");
        firstInvalid = firstInvalid || terms;
      }

      if (firstInvalid) {
        firstInvalid.focus();
        if (alert) {
          alert.className = "form-alert";
          alert.style.backgroundColor = "#FEF2F2";
          alert.style.border = "1px solid #FECACA";
          alert.style.color = "#B91C1C";
          alert.textContent =
            "Please correct the highlighted fields before proceeding.";
          alert.style.display = "block";
        }
        return;
      }

      // Register user
      const countryCode = document.getElementById("signup-country-code")
        ? document.getElementById("signup-country-code").value
        : "+1";
      const fullPhone = `${countryCode} ${phone.value.trim()}`;

      const regResult = window.CB_Storage.register({
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        password: password.value,
        role: role.value,
        phone: fullPhone,
      });

      if (regResult.success) {
        if (alert) {
          alert.className = "form-alert alert-success";
          alert.textContent =
            "Corporate account created successfully! Redirecting to Sign In...";
          alert.style.display = "block";
        }
        setTimeout(() => {
          window.location.href = "sign-in.html";
        }, 1200);
      } else {
        if (alert) {
          alert.className = "form-alert";
          alert.style.backgroundColor = "#FEF2F2";
          alert.style.border = "1px solid #FECACA";
          alert.style.color = "#B91C1C";
          alert.textContent = regResult.message;
          alert.style.display = "block";
        }
        email.classList.add("is-invalid");
        email.focus();
      }
    });
  }

  // 6. Social Sign In/Sign Up & Forgot Password Redirect to 404
  function init404RedirectTriggers() {
    const socialButtons = document.querySelectorAll(
      ".btn-social, .social-auth-btn, .social-signup-btn"
    );
    socialButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "404.html";
      });
    });

    const forgotLinks = document.querySelectorAll(".forgot-password-link");
    forgotLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "404.html";
      });
    });
  }

  // Initializer
  document.addEventListener("DOMContentLoaded", () => {
    initPasswordToggles();
    initPasswordStrengthMeter();
    initDemoRoleQuickBar();
    initSignInForm();
    initSignUpForm();
    init404RedirectTriggers();
  });
})();
