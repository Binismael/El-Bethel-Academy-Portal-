// Main JavaScript file for El Bethel Academy Portal

// Global variables
let currentUser = null
let currentTheme = "light"

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Load user data from localStorage
  loadUserData()

  // Initialize theme
  initializeTheme()

  // Initialize common components
  initializeDropdowns()
  initializeModals()
  initializeToasts()

  // Update time display
  updateTime()
  setInterval(updateTime, 60000) // Update every minute

  // Initialize page-specific functionality
  const currentPage = getCurrentPage()
  initializePageSpecific(currentPage)
}

function loadUserData() {
  const userData = localStorage.getItem("elbethel_user")
  if (userData) {
    currentUser = JSON.parse(userData)
    updateUserInterface()
  }
}

function updateUserInterface() {
  if (!currentUser) return

  // Update profile name displays
  const profileNames = document.querySelectorAll(".profile-name")
  profileNames.forEach((element) => {
    element.textContent = currentUser.name || "Guest User"
  })

  // Update user avatars
  const userAvatars = document.querySelectorAll(".profile-avatar")
  userAvatars.forEach((element) => {
    if (currentUser.avatar) {
      element.src = currentUser.avatar
    }
  })

  // Update user initials
  const userInitials = document.querySelectorAll("#userInitials")
  userInitials.forEach((element) => {
    const initials = currentUser.name
      ? currentUser.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "GU"
    element.textContent = initials
  })
}

function initializeTheme() {
  // Load theme from localStorage
  const savedTheme = localStorage.getItem("elbethel_theme") || "light"
  currentTheme = savedTheme
  applyTheme(currentTheme)

  // Initialize theme toggle
  const themeToggle = document.getElementById("themeToggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
    updateThemeIcon()
  }
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  applyTheme(currentTheme)
  localStorage.setItem("elbethel_theme", currentTheme)
  updateThemeIcon()
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  document.body.classList.toggle("dark-theme", theme === "dark")
}

function updateThemeIcon() {
  const themeToggle = document.getElementById("themeToggle")
  if (themeToggle) {
    const icon = themeToggle.querySelector("i")
    if (icon) {
      icon.className = currentTheme === "light" ? "fas fa-moon" : "fas fa-sun"
    }
  }
}

function initializeDropdowns() {
  // Profile dropdown
  const profileBtn = document.getElementById("profileBtn")
  const profileDropdown = document.getElementById("profileDropdown")

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      profileDropdown.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove("active")
      }
    })
  }

  // Logout functionality
  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout)
  }
}

function initializeModals() {
  // Role selection modal
  const roleModal = document.getElementById("roleModal")
  if (roleModal) {
    const roleCards = roleModal.querySelectorAll(".role-card")
    roleCards.forEach((card) => {
      card.addEventListener("click", function () {
        const role = this.dataset.role
        handleRoleSelection(role)
      })
    })

    // Close modal functionality
    const closeBtn = roleModal.querySelector(".modal-close")
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal)
    }

    // Close modal when clicking outside
    roleModal.addEventListener("click", (e) => {
      if (e.target === roleModal) {
        closeModal()
      }
    })
  }
}

function initializeToasts() {
  // Create toast container if it doesn't exist
  if (!document.getElementById("toastContainer")) {
    const toastContainer = document.createElement("div")
    toastContainer.id = "toastContainer"
    toastContainer.className = "toast-container"
    document.body.appendChild(toastContainer)
  }
}

function updateTime() {
  const timeElements = document.querySelectorAll("#currentTime")
  const now = new Date()
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  timeElements.forEach((element) => {
    element.textContent = timeString
  })
}

function getCurrentPage() {
  const path = window.location.pathname
  const page = path.split("/").pop() || "index.html"
  return page.replace(".html", "")
}

function initializePageSpecific(page) {
  switch (page) {
    case "index":
    case "":
      initializeHomePage()
      break
    case "notifications":
      // initializeNotifications(); // Placeholder for future implementation
      break
    case "profile":
      // initializeProfile(); // Placeholder for future implementation
      break
    case "settings":
      // initializeSettings(); // Placeholder for future implementation
      break
  }
}

function initializeHomePage() {
  // Initialize role selection functionality
  const getStartedBtn = document.querySelector(".hero-actions .btn-primary")
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", showRoleSelection)
  }

  // Initialize guest login
  const guestBtn = document.querySelector(".hero-actions .btn-outline")
  if (guestBtn) {
    guestBtn.addEventListener("click", guestLogin)
  }
}

// Modal functions
function showRoleSelection() {
  const modal = document.getElementById("roleModal")
  if (modal) {
    modal.style.display = "flex"
    document.body.style.overflow = "hidden"
  }
}

function closeModal() {
  const modal = document.getElementById("roleModal")
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }
}

function handleRoleSelection(role) {
  // Store selected role
  localStorage.setItem("elbethel_selected_role", role)

  // Show success message
  showToast(`Selected ${role} role. Redirecting to dashboard...`, "success")

  // Close modal
  closeModal()

  // Simulate redirect to appropriate dashboard
  setTimeout(() => {
    const dashboardUrl = `${role}-dashboard.html`
    if (role === "student") {
      window.location.href = "student-dashboard.html"
    } else if (role === "admin") {
      window.location.href = "admin-dashboard.html"
    } else {
      showToast(`${role} dashboard coming soon!`, "info")
    }
  }, 1500)
}

function guestLogin() {
  // Create guest user
  const guestUser = {
    name: "Guest User",
    email: "guest@elbethel.edu",
    role: "guest",
    avatar: null,
  }

  // Store guest user data
  localStorage.setItem("elbethel_user", JSON.stringify(guestUser))
  currentUser = guestUser

  // Update interface
  updateUserInterface()

  // Show success message
  showToast("Logged in as guest. Welcome to El Bethel Academy!", "success")

  // Redirect to student dashboard
  setTimeout(() => {
    window.location.href = "student-dashboard.html"
  }, 1500)
}

function handleLogout() {
  // Clear user data
  localStorage.removeItem("elbethel_user")
  localStorage.removeItem("elbethel_selected_role")
  currentUser = null

  // Show logout message
  showToast("Logged out successfully. Goodbye!", "info")

  // Redirect to home page
  setTimeout(() => {
    window.location.href = "index.html"
  }, 1500)
}

// Toast notification system
function showToast(message, type = "info", duration = 4000) {
  const toastContainer = document.getElementById("toastContainer")
  if (!toastContainer) return

  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`

  const icon = getToastIcon(type)
  toast.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `

  toastContainer.appendChild(toast)

  // Trigger animation
  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  // Remove toast after duration
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, duration)
}

function getToastIcon(type) {
  switch (type) {
    case "success":
      return "fas fa-check-circle"
    case "error":
      return "fas fa-exclamation-circle"
    case "warning":
      return "fas fa-exclamation-triangle"
    case "info":
    default:
      return "fas fa-info-circle"
  }
}

// Utility functions
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Animation utilities
function fadeIn(element, duration = 300) {
  element.style.opacity = "0"
  element.style.display = "block"

  let start = null
  function animate(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start
    const opacity = Math.min(progress / duration, 1)

    element.style.opacity = opacity

    if (progress < duration) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

function fadeOut(element, duration = 300) {
  let start = null
  const initialOpacity = Number.parseFloat(getComputedStyle(element).opacity)

  function animate(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start
    const opacity = initialOpacity * (1 - Math.min(progress / duration, 1))

    element.style.opacity = opacity

    if (progress < duration) {
      requestAnimationFrame(animate)
    } else {
      element.style.display = "none"
    }
  }

  requestAnimationFrame(animate)
}

// Export functions for use in other files
window.ElBethelPortal = {
  showToast,
  formatDate,
  formatTime,
  debounce,
  fadeIn,
  fadeOut,
  currentUser: () => currentUser,
  updateUserInterface,
}
