// Profile page functionality

let isEditMode = false
let originalFormData = {}
const showToast = (message, type) => {
  console.log(`Toast: ${message} (${type})`)
  // Implement actual toast functionality here
}

document.addEventListener("DOMContentLoaded", () => {
  initializeProfile()
})

function initializeProfile() {
  initializeTabs()
  initializeEditMode()
  initializeAvatarUpload()
  initializeFormHandling()
  loadProfileData()
}

function initializeTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetTab = this.dataset.tab

      // Remove active class from all tabs and contents
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      this.classList.add("active")
      const targetContent = document.getElementById(targetTab)
      if (targetContent) {
        targetContent.classList.add("active")
      }
    })
  })
}

function initializeEditMode() {
  const editBtn = document.getElementById("editProfileBtn")
  const saveBtn = document.getElementById("saveProfileBtn")

  if (editBtn) {
    editBtn.addEventListener("click", toggleEditMode)
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", saveProfile)
  }
}

function initializeAvatarUpload() {
  const avatarContainer = document.querySelector(".profile-avatar-container")
  const avatarInput = document.getElementById("avatarInput")
  const profileImage = document.getElementById("profileImage")

  if (avatarContainer && avatarInput) {
    avatarContainer.addEventListener("click", () => {
      if (isEditMode) {
        avatarInput.click()
      }
    })

    avatarInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          profileImage.src = e.target.result
          showToast("Profile picture updated", "success")
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

function initializeFormHandling() {
  // Initialize toggle switches
  const toggleSwitches = document.querySelectorAll(".toggle-switch input")
  toggleSwitches.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      if (isEditMode) {
        const label = this.closest(".security-item")?.querySelector("label")?.textContent || "Setting"
        const status = this.checked ? "enabled" : "disabled"
        showToast(`${label} ${status}`, "info")
      }
    })
  })
}

function loadProfileData() {
  // Load profile data from localStorage or use default values
  const savedProfile = localStorage.getItem("elbethel_profile")

  if (savedProfile) {
    const profileData = JSON.parse(savedProfile)
    populateForm(profileData)
  } else {
    // Use default mock data
    const defaultProfile = {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "2005-03-15",
      gender: "male",
      nationality: "Nigerian",
      stateOfOrigin: "Lagos",
      studentClass: "SS2A",
      admissionDate: "2021-09-01",
      academicYear: "2024/2025",
      term: "Second Term",
      email: "john.doe@student.elbethel.edu",
      phone: "+234 801 234 5678",
      address: "123 Main Street, Victoria Island, Lagos State, Nigeria",
      emergencyName: "Jane Doe (Mother)",
      emergencyPhone: "+234 802 345 6789",
      relationship: "Mother",
      emergencyEmail: "jane.doe@email.com",
    }

    populateForm(defaultProfile)
    saveProfileData(defaultProfile)
  }
}

function populateForm(data) {
  Object.keys(data).forEach((key) => {
    const element = document.getElementById(key)
    if (element) {
      if (element.type === "checkbox") {
        element.checked = data[key]
      } else {
        element.value = data[key]
      }
    }
  })

  // Update profile name in header
  const profileName = document.getElementById("profileName")
  if (profileName && data.firstName && data.lastName) {
    profileName.textContent = `${data.firstName} ${data.lastName}`
  }
}

function toggleEditMode() {
  isEditMode = !isEditMode

  const editBtn = document.getElementById("editProfileBtn")
  const saveBtn = document.getElementById("saveProfileBtn")
  const formInputs = document.querySelectorAll('input:not([type="checkbox"]), select, textarea')

  if (isEditMode) {
    // Store original form data
    originalFormData = getFormData()

    // Enable form inputs
    formInputs.forEach((input) => {
      input.removeAttribute("readonly")
      input.removeAttribute("disabled")
      input.classList.add("editable")
    })

    // Update buttons
    editBtn.style.display = "none"
    saveBtn.style.display = "inline-flex"

    // Show avatar overlay
    const avatarOverlay = document.getElementById("avatarOverlay")
    if (avatarOverlay) {
      avatarOverlay.style.display = "flex"
    }

    showToast("Edit mode enabled", "info")
  } else {
    // Disable edit mode without saving
    exitEditMode()

    // Restore original data
    populateForm(originalFormData)

    showToast("Edit mode cancelled", "info")
  }
}

function exitEditMode() {
  isEditMode = false

  const editBtn = document.getElementById("editProfileBtn")
  const saveBtn = document.getElementById("saveProfileBtn")
  const formInputs = document.querySelectorAll('input:not([type="checkbox"]), select, textarea')

  // Disable form inputs
  formInputs.forEach((input) => {
    input.setAttribute("readonly", "readonly")
    if (input.tagName === "SELECT") {
      input.setAttribute("disabled", "disabled")
    }
    input.classList.remove("editable")
  })

  // Update buttons
  editBtn.style.display = "inline-flex"
  saveBtn.style.display = "none"

  // Hide avatar overlay
  const avatarOverlay = document.getElementById("avatarOverlay")
  if (avatarOverlay) {
    avatarOverlay.style.display = "none"
  }
}

function saveProfile() {
  const formData = getFormData()

  // Validate required fields
  const requiredFields = ["firstName", "lastName", "email"]
  const missingFields = requiredFields.filter((field) => !formData[field])

  if (missingFields.length > 0) {
    showToast("Please fill in all required fields", "error")
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    showToast("Please enter a valid email address", "error")
    return
  }

  // Save profile data
  saveProfileData(formData)

  // Update profile display
  populateForm(formData)

  // Exit edit mode
  exitEditMode()

  // Update user interface globally
  if (window.ElBethelPortal) {
    const currentUser = window.ElBethelPortal.currentUser()
    if (currentUser) {
      currentUser.name = `${formData.firstName} ${formData.lastName}`
      currentUser.email = formData.email
      localStorage.setItem("elbethel_user", JSON.stringify(currentUser))
      window.ElBethelPortal.updateUserInterface()
    }
  }

  showToast("Profile updated successfully", "success")
}

function getFormData() {
  const formData = {}
  const inputs = document.querySelectorAll('input:not([type="checkbox"]):not([type="file"]), select, textarea')

  inputs.forEach((input) => {
    if (input.id) {
      formData[input.id] = input.value
    }
  })

  // Handle checkboxes separately
  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    if (checkbox.id) {
      formData[checkbox.id] = checkbox.checked
    }
  })

  return formData
}

function saveProfileData(data) {
  localStorage.setItem("elbethel_profile", JSON.stringify(data))
}

// Performance card interactions
document.addEventListener("click", (e) => {
  if (e.target.closest(".performance-card")) {
    const card = e.target.closest(".performance-card")
    const subject = card.querySelector("h5").textContent
    showToast(`Viewing details for ${subject}`, "info")

    // In a real app, this would navigate to subject details page
    console.log("Navigate to subject details:", subject)
  }
})

// Security settings handlers
document.addEventListener("click", (e) => {
  if (e.target.textContent === "Change Password") {
    showChangePasswordModal()
  } else if (e.target.textContent === "Enable 2FA") {
    showTwoFactorSetup()
  } else if (e.target.textContent === "Request Download") {
    requestDataDownload()
  } else if (e.target.textContent === "Delete Account") {
    showDeleteAccountConfirmation()
  }
})

function showChangePasswordModal() {
  // Mock password change functionality
  const newPassword = prompt("Enter new password:")
  if (newPassword && newPassword.length >= 6) {
    showToast("Password changed successfully", "success")
  } else if (newPassword) {
    showToast("Password must be at least 6 characters long", "error")
  }
}

function showTwoFactorSetup() {
  showToast("Two-factor authentication setup initiated", "info")
  // In a real app, this would show a modal with QR code and setup instructions
}

function requestDataDownload() {
  showToast("Data download request submitted. You will receive an email when ready.", "info")
  // In a real app, this would trigger a server-side data export process
}

function showDeleteAccountConfirmation() {
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

// Export profile functions
window.ProfilePage = {
  toggleEditMode,
  saveProfile,
  getFormData,
}
