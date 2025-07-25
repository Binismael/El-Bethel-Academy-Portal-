// Settings page functionality

let currentSettings = {}
let originalSettings = {}

document.addEventListener("DOMContentLoaded", () => {
  initializeSettings()
})

function initializeSettings() {
  initializeSettingsMenu()
  loadSettings()
  initializeSettingsHandlers()
  initializeThemeOptions()
}

function initializeSettingsMenu() {
  const menuItems = document.querySelectorAll(".settings-menu-item")
  const sections = document.querySelectorAll(".settings-section")

  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetSection = this.dataset.section

      // Remove active class from all menu items and sections
      menuItems.forEach((i) => i.classList.remove("active"))
      sections.forEach((s) => s.classList.remove("active"))

      // Add active class to clicked item and corresponding section
      this.classList.add("active")
      const targetElement = document.getElementById(targetSection)
      if (targetElement) {
        targetElement.classList.add("active")
      }
    })
  })
}

function loadSettings() {
  // Load settings from localStorage or use defaults
  const savedSettings = localStorage.getItem("elbethel_settings")

  if (savedSettings) {
    currentSettings = JSON.parse(savedSettings)
  } else {
    // Default settings
    currentSettings = {
      // General
      displayName: "John Doe",
      email: "john.doe@student.elbethel.edu",
      timeZone: "WAT",
      defaultDashboard: "overview",
      quickActions: true,

      // Appearance
      theme: "light",
      fontSize: "medium",
      compactMode: false,
      animations: true,

      // Notifications
      assignmentEmails: true,
      gradeEmails: true,
      paymentEmails: true,
      browserNotifications: true,
      soundAlerts: false,
      quietHoursStart: "22:00",
      quietHoursEnd: "07:00",

      // Privacy
      loginAlerts: true,
      sessionTimeout: "30",
      profileVisibility: "school",
      activityStatus: true,

      // Language
      language: "en",
      country: "NG",
      currency: "NGN",
      dateFormat: "DD/MM/YYYY",

      // Accessibility
      highContrast: false,
      largeText: false,
      reduceMotion: false,
      keyboardShortcuts: true,
      focusIndicators: true,

      // Advanced
      hardwareAcceleration: true,
      preloadContent: true,
      debugMode: false,
      betaFeatures: false,
    }

    saveSettings()
  }

  // Store original settings for reset functionality
  originalSettings = { ...currentSettings }

  // Apply settings to form
  applySettingsToForm()
}

function applySettingsToForm() {
  Object.keys(currentSettings).forEach((key) => {
    const element = document.getElementById(key) || document.querySelector(`[name="${key}"]`)

    if (element) {
      if (element.type === "checkbox") {
        element.checked = currentSettings[key]
      } else if (element.type === "radio") {
        if (element.value === currentSettings[key]) {
          element.checked = true
        }
      } else {
        element.value = currentSettings[key]
      }
    }
  })

  // Apply theme
  applyTheme(currentSettings.theme)

  // Update theme option selection
  updateThemeSelection()
}

function initializeSettingsHandlers() {
  // Save settings button
  const saveBtn = document.getElementById("saveSettingsBtn")
  if (saveBtn) {
    saveBtn.addEventListener("click", saveAllSettings)
  }

  // Reset settings button
  const resetBtn = document.getElementById("resetSettingsBtn")
  if (resetBtn) {
    resetBtn.addEventListener("click", resetSettings)
  }

  // Handle all form inputs
  const formInputs = document.querySelectorAll("input, select, textarea")
  formInputs.forEach((input) => {
    input.addEventListener("change", handleSettingChange)
  })

  // Special handlers for specific settings
  initializeSpecialHandlers()
}

function initializeThemeOptions() {
  const themeOptions = document.querySelectorAll(".theme-option")

  themeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const theme = this.dataset.theme

      // Remove active class from all options
      themeOptions.forEach((opt) => opt.classList.remove("active"))

      // Add active class to selected option
      this.classList.add("active")

      // Apply theme
      currentSettings.theme = theme
      applyTheme(theme)

      showToast(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme applied`, "success")
    })
  })
}

function updateThemeSelection() {
  const themeOptions = document.querySelectorAll(".theme-option")
  themeOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.theme === currentSettings.theme)
  })
}

function initializeSpecialHandlers() {
  // Clear cache button
  const clearCacheBtn = document.querySelector('button:contains("Clear Cache")')
  if (clearCacheBtn) {
    clearCacheBtn.addEventListener("click", clearCache)
  }

  // Export settings button
  const exportBtn = document.querySelector('button:contains("Export Settings")')
  if (exportBtn) {
    exportBtn.addEventListener("click", exportSettings)
  }

  // Enable 2FA button
  const enable2FABtn = document.querySelector('button:contains("Enable 2FA")')
  if (enable2FABtn) {
    enable2FABtn.addEventListener("click", enable2FA)
  }

  // Request download button
  const requestDownloadBtn = document.querySelector('button:contains("Request Download")')
  if (requestDownloadBtn) {
    requestDownloadBtn.addEventListener("click", requestDataDownload)
  }

  // Delete account button
  const deleteAccountBtn = document.querySelector('button:contains("Delete Account")')
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", deleteAccount)
  }
}

function handleSettingChange(e) {
  const key = e.target.id || e.target.name
  let value

  if (e.target.type === "checkbox") {
    value = e.target.checked
  } else if (e.target.type === "radio") {
    if (e.target.checked) {
      value = e.target.value
    } else {
      return // Don't update if radio is not checked
    }
  } else {
    value = e.target.value
  }

  if (key && currentSettings.hasOwnProperty(key)) {
    currentSettings[key] = value

    // Apply immediate changes for certain settings
    applyImmediateChanges(key, value)
  }
}

function applyImmediateChanges(key, value) {
  switch (key) {
    case "theme":
      applyTheme(value)
      break
    case "fontSize":
      applyFontSize(value)
      break
    case "compactMode":
      applyCompactMode(value)
      break
    case "animations":
      applyAnimations(value)
      break
    case "highContrast":
      applyHighContrast(value)
      break
    case "largeText":
      applyLargeText(value)
      break
    case "reduceMotion":
      applyReduceMotion(value)
      break
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)

  if (theme === "auto") {
    // Use system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    document.body.classList.toggle("dark-theme", prefersDark)
  } else {
    document.body.classList.toggle("dark-theme", theme === "dark")
  }

  // Update main theme toggle if it exists
  if (window.ElBethelPortal) {
    localStorage.setItem("elbethel_theme", theme === "auto" ? "light" : theme)
  }
}

function applyFontSize(size) {
  const sizeMap = {
    small: "14px",
    medium: "16px",
    large: "18px",
    "extra-large": "20px",
  }

  document.documentElement.style.fontSize = sizeMap[size] || "16px"
}

function applyCompactMode(enabled) {
  document.body.classList.toggle("compact-mode", enabled)
}

function applyAnimations(enabled) {
  document.body.classList.toggle("no-animations", !enabled)
}

function applyHighContrast(enabled) {
  document.body.classList.toggle("high-contrast", enabled)
}

function applyLargeText(enabled) {
  document.body.classList.toggle("large-text", enabled)
}

function applyReduceMotion(enabled) {
  document.body.classList.toggle("reduce-motion", enabled)
}

function saveAllSettings() {
  // Validate settings before saving
  if (!validateSettings()) {
    return
  }

  saveSettings()
  showToast("Settings saved successfully", "success")

  // Update global user data if needed
  updateGlobalUserData()
}

function validateSettings() {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (currentSettings.email && !emailRegex.test(currentSettings.email)) {
    showToast("Please enter a valid email address", "error")
    return false
  }

  // Validate display name
  if (!currentSettings.displayName || currentSettings.displayName.trim().length < 2) {
    showToast("Display name must be at least 2 characters long", "error")
    return false
  }

  return true
}

function saveSettings() {
  localStorage.setItem("elbethel_settings", JSON.stringify(currentSettings))
}

function updateGlobalUserData() {
  if (window.ElBethelPortal) {
    const currentUser = window.ElBethelPortal.currentUser()
    if (currentUser) {
      currentUser.name = currentSettings.displayName
      currentUser.email = currentSettings.email
      localStorage.setItem("elbethel_user", JSON.stringify(currentUser))
      window.ElBethelPortal.updateUserInterface()
    }
  }
}

function resetSettings() {
  const confirmation = confirm("Are you sure you want to reset all settings to default? This action cannot be undone.")

  if (confirmation) {
    currentSettings = { ...originalSettings }
    applySettingsToForm()
    saveSettings()
    showToast("Settings reset to default", "info")
  }
}

function clearCache() {
  // Clear various cached data
  const cacheKeys = ["elbethel_notifications", "elbethel_profile", "elbethel_dashboard_cache"]

  cacheKeys.forEach((key) => {
    localStorage.removeItem(key)
  })

  // Clear browser cache if possible
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name)
      })
    })
  }

  showToast("Cache cleared successfully", "success")
}

function exportSettings() {
  const settingsData = {
    settings: currentSettings,
    exportDate: new Date().toISOString(),
    version: "1.0",
  }

  const dataStr = JSON.stringify(settingsData, null, 2)
  const dataBlob = new Blob([dataStr], { type: "application/json" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(dataBlob)
  link.download = "elbethel-settings.json"
  link.click()

  showToast("Settings exported successfully", "success")
}

function enable2FA() {
  showToast("Two-factor authentication setup initiated", "info")
  // In a real app, this would show a modal with setup instructions
}

function requestDataDownload() {
  showToast("Data download request submitted. You will receive an email when ready.", "info")
  // In a real app, this would trigger a server-side data export
}

function deleteAccount() {
  const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.")

  if (confirmation) {
    const finalConfirmation = prompt('Type "DELETE" to confirm account deletion:')
    if (finalConfirmation === "DELETE") {
      showToast("Account deletion request submitted", "warning")
      // In a real app, this would trigger account deletion process
    } else {
      showToast("Account deletion cancelled", "info")
    }
  }
}

// Utility function to find elements by text content
function findElementByText(text) {
  const elements = document.querySelectorAll("button")
  return Array.from(elements).find((el) => el.textContent.trim() === text)
}

// Update special handlers to use the utility function
function initializeSpecialHandlers() {
  const handlers = [
    { text: "Clear Cache", handler: clearCache },
    { text: "Export Settings", handler: exportSettings },
    { text: "Enable 2FA", handler: enable2FA },
    { text: "Request Download", handler: requestDataDownload },
    { text: "Delete Account", handler: deleteAccount },
  ]

  handlers.forEach(({ text, handler }) => {
    const button = findElementByText(text)
    if (button) {
      button.addEventListener("click", handler)
    }
  })
}

// Export settings functions
window.SettingsPage = {
  saveAllSettings,
  resetSettings,
  exportSettings,
  getCurrentSettings: () => currentSettings,
}
