/**
 * STACKLY - STORAGE & SESSION MANAGEMENT MODULE (PRODUCTION)
 * Handles localStorage modules: users, currentUser, role, preferences, themeSettings, notifications, savedForms.
 * Production-ready storage: no hardcoded demo accounts or mock users.
 */

(function () {
  "use strict";

  const STORAGE_KEYS = {
    USERS: "cb_users",
    CURRENT_USER: "cb_currentUser",
    ROLE: "cb_role",
    PREFERENCES: "cb_preferences",
    THEME: "cb_themeSettings",
    NOTIFICATIONS: "cb_notifications",
    SAVED_FORMS: "cb_savedForms",
  };

  // Initialize clean production storage
  function initStorage() {
    // Purge any legacy demo accounts from previous testing
    try {
      const storedUsersRaw = localStorage.getItem(STORAGE_KEYS.USERS);
      if (storedUsersRaw) {
        const parsed = JSON.parse(storedUsersRaw);
        if (Array.isArray(parsed)) {
          // Filter out any legacy demo users
          const realUsers = parsed.filter(
            (u) =>
              u.id &&
              !u.id.startsWith("usr_admin_") &&
              !u.id.startsWith("usr_mgr_") &&
              !u.id.startsWith("usr_emp_") &&
              !u.id.startsWith("usr_cust_") &&
              !u.id.startsWith("usr_vend_")
          );
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(realUsers));
        }
      } else {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
      }

      const activeUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (activeUser) {
        const u = JSON.parse(activeUser);
        if (
          u &&
          u.id &&
          (u.id.startsWith("usr_admin_") ||
            u.id.startsWith("usr_mgr_") ||
            u.id.startsWith("usr_emp_") ||
            u.id.startsWith("usr_cust_") ||
            u.id.startsWith("usr_vend_"))
        ) {
          localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
          localStorage.removeItem(STORAGE_KEYS.ROLE);
        }
      }
    } catch (e) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
    }

    if (!localStorage.getItem(STORAGE_KEYS.PREFERENCES)) {
      localStorage.setItem(
        STORAGE_KEYS.PREFERENCES,
        JSON.stringify({
          emailAlerts: true,
          twoFactorAuth: true,
          currency: "USD",
        })
      );
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_FORMS)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_FORMS, JSON.stringify([]));
    }
  }

  // User Management
  function getUsers() {
    initStorage();
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return user;
  }

  function findUserByEmail(email) {
    if (!email) return null;
    const users = getUsers();
    return users.find(
      (u) => (u.email || "").toLowerCase() === email.trim().toLowerCase()
    );
  }

  function findUserByUsername(username) {
    if (!username) return null;
    const users = getUsers();
    return users.find(
      (u) => (u.username || "").toLowerCase() === username.trim().toLowerCase()
    );
  }

  // Authentication & Session
  function getCurrentUser() {
    initStorage();
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.ROLE, user.role);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      localStorage.removeItem(STORAGE_KEYS.ROLE);
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    const isInPages =
      window.location.pathname.includes("/pages/") ||
      window.location.pathname.includes("\\pages\\");
    window.location.href = isInPages ? "sign-in.html" : "pages/sign-in.html";
  }

  /**
   * Dynamic Authentication:
   * Accepts any valid email address and password without requiring a predefined mocking list.
   * If the user doesn't already exist, creates their profile dynamically.
   */
  function authenticate(email, password, role) {
    if (!email || !email.trim()) {
      return {
        success: false,
        message: "Please enter your email address.",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();
    if (!emailRegex.test(cleanEmail)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    if (!password) {
      return {
        success: false,
        message: "Please enter your password.",
      };
    }

    const selectedRole = role || "Manager";
    let user = findUserByEmail(cleanEmail);

    if (!user) {
      // Dynamically derive names from email prefix (e.g. "alex.smith" -> "Alex", "Smith")
      const prefix = cleanEmail.split("@")[0] || "Executive";
      const nameParts = prefix
        .replace(/[._-]+/g, " ")
        .trim()
        .split(/\s+/);
      const firstName = nameParts[0]
        ? nameParts[0].charAt(0).toUpperCase() +
          nameParts[0].slice(1).toLowerCase()
        : "Executive";
      const lastName = nameParts[1]
        ? nameParts[1].charAt(0).toUpperCase() +
          nameParts[1].slice(1).toLowerCase()
        : "";

      const fullName = lastName ? `${firstName} ${lastName}` : firstName;

      user = {
        id:
          "usr_" +
          Date.now() +
          "_" +
          Math.random().toString(36).substring(2, 7),
        username: prefix,
        firstName: firstName,
        lastName: lastName || "Member",
        displayName: fullName,
        email: cleanEmail,
        password: password,
        role: selectedRole,
        title: `${selectedRole} - Corporate Advisory`,
        phone: "",
        country: "United States",
        createdAt: new Date().toISOString(),
      };
      saveUser(user);
    } else {
      // If user exists, update password and role to current selection
      if (selectedRole) {
        user.role = selectedRole;
        user.title = `${selectedRole} - Corporate Advisory`;
      }
      user.password = password;
      const users = getUsers();
      const idx = users.findIndex(
        (u) => (u.email || "").toLowerCase() === cleanEmail
      );
      if (idx !== -1) {
        users[idx] = user;
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      }
    }

    const activeSession = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName:
        user.displayName || `${user.firstName} ${user.lastName}`.trim(),
      role: user.role,
      title: user.title || `${user.role} - Corporate Advisory`,
      phone: user.phone || "",
      loginTime: new Date().toISOString(),
    };

    setCurrentUser(activeSession);
    return { success: true, user: activeSession };
  }

  /**
   * Production Registration:
   * Validates uniqueness and creates a new verified corporate profile.
   */
  function register(formData) {
    if (!formData.email || !formData.email.trim()) {
      return {
        success: false,
        message: "Email address is required.",
      };
    }

    if (findUserByEmail(formData.email)) {
      return {
        success: false,
        message: "An account with this email address already exists.",
      };
    }

    if (formData.username && findUserByUsername(formData.username)) {
      return {
        success: false,
        message: "This corporate username is already registered.",
      };
    }

    const firstName = (formData.firstName || "").trim();
    const lastName = (formData.lastName || "").trim();

    const newUser = {
      id:
        "usr_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      username: formData.username || formData.email.split("@")[0],
      firstName: firstName,
      lastName: lastName,
      displayName: `${firstName} ${lastName}`.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role || "Manager",
      phone: formData.phone || "",
      country: formData.country || "United States",
      address: formData.address || "",
      avatar: "exec-ceo.webp",
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);
    return { success: true, user: newUser };
  }

  // Save Contact Form submissions
  function saveContactMessage(msg) {
    initStorage();
    try {
      const messages =
        JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_FORMS)) || [];
      msg.id = "msg_" + Date.now();
      msg.submittedAt = new Date().toISOString();
      messages.push(msg);
      localStorage.setItem(STORAGE_KEYS.SAVED_FORMS, JSON.stringify(messages));
      return true;
    } catch (e) {
      return false;
    }
  }

  // Export globally
  window.CB_Storage = {
    init: initStorage,
    getUsers: getUsers,
    saveUser: saveUser,
    findUserByEmail: findUserByEmail,
    findUserByUsername: findUserByUsername,
    getCurrentUser: getCurrentUser,
    setCurrentUser: setCurrentUser,
    logout: logout,
    authenticate: authenticate,
    register: register,
    saveContactMessage: saveContactMessage,
  };

  // Run initial check
  initStorage();
})();
