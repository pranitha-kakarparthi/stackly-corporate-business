/**
 * STACKLY - STORAGE & SESSION MANAGEMENT MODULE
 * Handles localStorage modules: users, currentUser, role, preferences, themeSettings, notifications, savedForms.
 * Pre-seeds realistic demo accounts for Admin, Manager, Employee, Customer, and Vendor.
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

  // Preseeded Corporate Accounts
  const DEFAULT_USERS = [
    {
      id: "usr_admin_01",
      username: "victoria.alexander",
      firstName: "Victoria",
      lastName: "Alexander",
      email: "admin@corporatebusiness.com",
      password: "Password@2026",
      role: "Admin",
      title: "Managing General Partner & CEO",
      phone: "+1 (555) 234-5678",
      country: "United States",
      avatar: "exec-ceo.webp",
      createdAt: "2025-01-10T09:00:00Z",
    },
    {
      id: "usr_mgr_02",
      username: "marcus.sterling",
      firstName: "Marcus",
      lastName: "Sterling",
      email: "manager@corporatebusiness.com",
      password: "Password@2026",
      role: "Manager",
      title: "Director of Capital Allocations",
      phone: "+1 (555) 345-6789",
      country: "United Kingdom",
      avatar: "exec-cfo.webp",
      createdAt: "2025-02-15T11:30:00Z",
    },
    {
      id: "usr_emp_03",
      username: "elena.rostova",
      firstName: "Elena",
      lastName: "Rostova",
      email: "employee@corporatebusiness.com",
      password: "Password@2026",
      role: "Employee",
      title: "Senior M&A Strategy Associate",
      phone: "+1 (555) 456-7890",
      country: "Switzerland",
      avatar: "exec-partner.webp",
      createdAt: "2025-03-01T14:15:00Z",
    },
    {
      id: "usr_cust_04",
      username: "david.chen",
      firstName: "David",
      lastName: "Chen",
      email: "client@vanguardholding.com",
      password: "Password@2026",
      role: "Customer",
      title: "Chief Operating Officer, Vanguard Group",
      phone: "+1 (555) 567-8901",
      country: "Singapore",
      avatar: "client-2.webp",
      createdAt: "2025-04-12T16:45:00Z",
    },
    {
      id: "usr_vend_05",
      username: "sarah.jenkins",
      firstName: "Sarah",
      lastName: "Jenkins",
      email: "vendor@apexadvisory.com",
      password: "Password@2026",
      role: "Vendor",
      title: "Managing Partner, Apex Legal & Audit",
      phone: "+1 (555) 678-9012",
      country: "Germany",
      avatar: "client-1.webp",
      createdAt: "2025-05-20T10:00:00Z",
    },
  ];

  // Seed default storage if empty
  function initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
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
      localStorage.setItem(
        STORAGE_KEYS.NOTIFICATIONS,
        JSON.stringify([
          {
            id: 1,
            text: "Q3 Enterprise M&A valuation dossier published",
            time: "10m ago",
            unread: true,
          },
          {
            id: 2,
            text: "Board meeting minutes ready for executive sign-off",
            time: "2h ago",
            unread: true,
          },
          {
            id: 3,
            text: "New capital allocation milestone achieved ($120M)",
            time: "1d ago",
            unread: false,
          },
        ])
      );
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_FORMS)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_FORMS, JSON.stringify([]));
    }
  }

  // User Management
  function getUsers() {
    initStorage();
    try {
      return (
        JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || DEFAULT_USERS
      );
    } catch (e) {
      return DEFAULT_USERS;
    }
  }

  function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return user;
  }

  function findUserByEmail(email) {
    const users = getUsers();
    return users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
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
    window.location.href = "sign-in.html";
  }

  function authenticate(email, password, role) {
    if (!email || !password) {
      return {
        success: false,
        message: "Please enter both your email address and password.",
      };
    }
    const user = findUserByEmail(email);
    if (user) {
      if (user.password && user.password !== password) {
        return {
          success: false,
          message: "Incorrect password. Please verify your credentials.",
        };
      }
      if (role && user.role !== role) {
        user.role = role;
      }
      user.lastLogin = new Date().toISOString();
      setCurrentUser(user);
      return { success: true, user: user };
    }

    // No predefined credentials required: auto-create workspace session on login
    const parts = email.split("@")[0].split(".");
    const firstName = parts[0]
      ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
      : "Executive";
    const lastName = parts[1]
      ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1)
      : "Member";
    const selectedRole = role || "Manager";

    const newUser = {
      id: "usr_" + Date.now(),
      username: email.split("@")[0],
      firstName: firstName,
      lastName: lastName,
      email: email.trim(),
      password: password,
      role: selectedRole,
      title: `${selectedRole} - Strategic Advisory`,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    saveUser(newUser);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  }

  function register(formData) {
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

    const newUser = {
      id: "usr_" + Date.now(),
      username: formData.username || formData.email.split("@")[0],
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role || "Customer",
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
    DEFAULT_USERS: DEFAULT_USERS,
  };

  // Run initial check
  initStorage();
})();
