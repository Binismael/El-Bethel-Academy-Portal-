// Navigation functionality for El Bethel Academy Portal

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
})

function initializeNavigation() {
  // Set active navigation link
  setActiveNavLink()

  // Initialize mobile menu
  initializeMobileMenu()

  // Initialize search functionality
  initializeSearch()

  // Initialize notification badge updates
  updateNotificationBadge()
}

function setActiveNavLink() {
  const currentPage = getCurrentPageName()
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")

    const href = link.getAttribute("href")
    if (href) {
      const linkPage = href.replace(".html", "").replace("index", "")
      if (linkPage === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active")
      }
    }
  })
}

function getCurrentPageName() {
  const path = window.location.pathname
  const page = path.split("/").pop() || "index.html"
  return page.replace(".html", "").replace("index", "")
}

function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navCenter = document.querySelector(".nav-center")

  if (mobileMenuBtn && navCenter) {
    mobileMenuBtn.addEventListener("click", function () {
      navCenter.classList.toggle("mobile-active")
      this.classList.toggle("active")
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuBtn.contains(e.target) && !navCenter.contains(e.target)) {
        navCenter.classList.remove("mobile-active")
        mobileMenuBtn.classList.remove("active")
      }
    })

    // Close mobile menu when clicking on a link
    const navLinks = navCenter.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navCenter.classList.remove("mobile-active")
        mobileMenuBtn.classList.remove("active")
      })
    })
  }
}

function initializeSearch() {
  const searchInputs = document.querySelectorAll(".search-input")

  searchInputs.forEach((input) => {
    input.addEventListener("input", debounceSearch)
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(this.value)
      }
    })
  })
}

const debounceSearch = debounce((e) => {
  const query = e.target.value.trim()
  if (query.length > 2) {
    showSearchSuggestions(query)
  } else {
    hideSearchSuggestions()
  }
}, 300)

function showSearchSuggestions(query) {
  // Mock search suggestions
  const suggestions = [
    "Mathematics Assignment",
    "Physics CBT",
    "Chemistry Lab Report",
    "English Literature Essay",
    "Payment History",
    "Grade Report",
    "Attendance Record",
    "School Calendar",
  ].filter((item) => item.toLowerCase().includes(query.toLowerCase()))

  // Create or update suggestions dropdown
  let suggestionsDropdown = document.querySelector(".search-suggestions")
  if (!suggestionsDropdown) {
    suggestionsDropdown = document.createElement("div")
    suggestionsDropdown.className = "search-suggestions"

    const searchContainer = document.querySelector(".search-container")
    if (searchContainer) {
      searchContainer.appendChild(suggestionsDropdown)
    }
  }

  if (suggestions.length > 0) {
    suggestionsDropdown.innerHTML = suggestions
      .slice(0, 5)
      .map(
        (suggestion) => `
                <div class="suggestion-item" onclick="performSearch('${suggestion}')">
                    <i class="fas fa-search"></i>
                    <span>${suggestion}</span>
                </div>
            `,
      )
      .join("")

    suggestionsDropdown.style.display = "block"
  } else {
    hideSearchSuggestions()
  }
}

function hideSearchSuggestions() {
  const suggestionsDropdown = document.querySelector(".search-suggestions")
  if (suggestionsDropdown) {
    suggestionsDropdown.style.display = "none"
  }
}

function performSearch(query) {
  hideSearchSuggestions()

  // Clear search input
  const searchInputs = document.querySelectorAll(".search-input")
  searchInputs.forEach((input) => {
    input.value = query
  })

  // Show search results (mock implementation)
  alert(`Searching for: "${query}"`)

  // In a real implementation, this would redirect to search results page
  // or filter current page content
  console.log("Performing search for:", query)
}

function updateNotificationBadge() {
  // Get unread notifications count from localStorage or API
  const unreadCount = getUnreadNotificationsCount()

  const notificationBadges = document.querySelectorAll(".notification-badge")
  notificationBadges.forEach((badge) => {
    if (unreadCount > 0) {
      badge.textContent = unreadCount > 99 ? "99+" : unreadCount.toString()
      badge.style.display = "inline-block"
    } else {
      badge.style.display = "none"
    }
  })
}

function getUnreadNotificationsCount() {
  // Mock implementation - in real app, this would come from API or localStorage
  const notifications = JSON.parse(localStorage.getItem("elbethel_notifications") || "[]")
  return notifications.filter((notification) => !notification.read).length || 3
}

// Utility function for debouncing
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

// Export navigation functions
window.Navigation = {
  setActiveNavLink,
  updateNotificationBadge,
  performSearch,
}
