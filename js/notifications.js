// Notifications page functionality

let notifications = []
let currentFilter = "all"

document.addEventListener("DOMContentLoaded", () => {
  initializeNotifications()
})

function initializeNotifications() {
  loadNotifications()
  initializeFilters()
  initializeActions()
  renderNotifications()
}

function loadNotifications() {
  // Load notifications from localStorage or use mock data
  const savedNotifications = localStorage.getItem("elbethel_notifications")

  if (savedNotifications) {
    notifications = JSON.parse(savedNotifications)
  } else {
    // Mock notifications data
    notifications = [
      {
        id: 1,
        title: "New Assignment Posted",
        message: "Mathematics assignment on Calculus has been posted. Due date: January 25, 2025",
        type: "academic",
        category: "academic",
        time: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        priority: "medium",
      },
      {
        id: 2,
        title: "System Maintenance Scheduled",
        message:
          "Scheduled maintenance on January 22, 2025 from 2:00 AM to 4:00 AM. Services may be temporarily unavailable.",
        type: "system",
        category: "system",
        time: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        priority: "high",
      },
      {
        id: 3,
        title: "🎉 Wedding Celebration Announcement",
        message:
          "Join us in celebrating the wedding of Mr. John Smith (Mathematics Teacher) and Ms. Sarah Johnson. Ceremony on February 14, 2025.",
        type: "special",
        category: "academic",
        time: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        priority: "low",
        special: true,
      },
      {
        id: 4,
        title: "Payment Confirmation",
        message: "Your school fee payment of ₦45,000 has been successfully processed. Receipt #EBA2025001",
        type: "payment",
        category: "payment",
        time: new Date(Date.now() - 60 * 60 * 1000),
        read: true,
        priority: "medium",
      },
      {
        id: 5,
        title: "Grade Updated",
        message: "Your Chemistry test score has been updated. New grade: A (85%)",
        type: "academic",
        category: "academic",
        time: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
        priority: "medium",
      },
      {
        id: 6,
        title: "Exam Schedule Released",
        message: "Mid-term examination schedule for SS2A has been published. Check your dashboard for details.",
        type: "academic",
        category: "academic",
        time: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
        priority: "high",
      },
      {
        id: 7,
        title: "Payment Reminder",
        message: "Reminder: Second term fees are due by January 30, 2025. Amount: ₦45,000",
        type: "payment",
        category: "payment",
        time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        read: true,
        priority: "high",
      },
      {
        id: 8,
        title: "Platform Update",
        message:
          "New features have been added to the platform including AI-powered study recommendations and enhanced mobile experience.",
        type: "system",
        category: "system",
        time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        read: true,
        priority: "low",
      },
    ]

    saveNotifications()
  }
}

function saveNotifications() {
  localStorage.setItem("elbethel_notifications", JSON.stringify(notifications))
  updateNotificationCounts()
}

function initializeFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Update current filter
      currentFilter = this.dataset.filter

      // Re-render notifications
      renderNotifications()
    })
  })
}

function initializeActions() {
  // Mark all read button
  const markAllReadBtn = document.getElementById("markAllReadBtn")
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", markAllAsRead)
  }

  // Refresh button
  const refreshBtn = document.getElementById("refreshBtn")
  if (refreshBtn) {
    refreshBtn.addEventListener("click", refreshNotifications)
  }

  // Initialize mark as read buttons (delegated event handling)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("mark-read-btn")) {
      const notificationItem = e.target.closest(".notification-item")
      const notificationId = Number.parseInt(notificationItem.dataset.id)
      markAsRead(notificationId)
    }
  })
}

function renderNotifications() {
  const notificationsList = document.getElementById("notificationsList")
  const emptyState = document.getElementById("emptyState")

  if (!notificationsList) return

  // Filter notifications
  const filteredNotifications = filterNotifications()

  if (filteredNotifications.length === 0) {
    notificationsList.style.display = "none"
    emptyState.style.display = "block"
    return
  }

  notificationsList.style.display = "block"
  emptyState.style.display = "none"

  // Render notifications
  notificationsList.innerHTML = filteredNotifications
    .map((notification) => renderNotificationItem(notification))
    .join("")

  updateNotificationCounts()
}

function filterNotifications() {
  switch (currentFilter) {
    case "unread":
      return notifications.filter((n) => !n.read)
    case "academic":
      return notifications.filter((n) => n.category === "academic")
    case "payment":
      return notifications.filter((n) => n.category === "payment")
    case "system":
      return notifications.filter((n) => n.category === "system")
    case "all":
    default:
      return notifications
  }
}

function renderNotificationItem(notification) {
  const timeAgo = getTimeAgo(notification.time)
  const isSpecial = notification.special ? "special-event" : ""
  const readClass = notification.read ? "read" : "unread"

  return `
        <div class="notification-item ${readClass} ${isSpecial}" data-category="${notification.category}" data-id="${notification.id}">
            <div class="notification-indicator">
                <i class="${getNotificationIcon(notification.type)}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-header">
                    <h3>${notification.title}</h3>
                    <div class="notification-meta">
                        <span class="notification-time">${timeAgo}</span>
                        <span class="notification-category ${notification.category}">${notification.category}</span>
                    </div>
                </div>
                <p class="notification-message">${notification.message}</p>
                <div class="notification-actions">
                    ${getNotificationActions(notification)}
                </div>
            </div>
            <button class="notification-close" onclick="removeNotification(${notification.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `
}

function getNotificationIcon(type) {
  switch (type) {
    case "academic":
      return "fas fa-graduation-cap"
    case "payment":
      return "fas fa-credit-card"
    case "system":
      return "fas fa-exclamation-triangle"
    case "special":
      return "fas fa-heart"
    default:
      return "fas fa-info-circle"
  }
}

function getNotificationActions(notification) {
  const actions = []

  // Type-specific actions
  switch (notification.type) {
    case "academic":
      if (notification.title.includes("Assignment")) {
        actions.push('<button class="btn btn-sm btn-primary">View Assignment</button>')
      } else if (notification.title.includes("Grade")) {
        actions.push('<button class="btn btn-sm btn-outline">View Grade Details</button>')
      } else if (notification.title.includes("Schedule")) {
        actions.push('<button class="btn btn-sm btn-outline">View Schedule</button>')
      }
      break
    case "payment":
      if (notification.title.includes("Confirmation")) {
        actions.push('<button class="btn btn-sm btn-outline">Download Receipt</button>')
      } else if (notification.title.includes("Reminder")) {
        actions.push('<button class="btn btn-sm btn-outline">Make Payment</button>')
      }
      break
    case "special":
      if (notification.title.includes("Wedding")) {
        actions.push('<button class="btn btn-sm btn-primary">RSVP</button>')
        actions.push('<button class="btn btn-sm btn-outline">View Details</button>')
      }
      break
    case "system":
      if (notification.title.includes("Update")) {
        actions.push('<button class="btn btn-sm btn-outline">Learn More</button>')
      }
      break
  }

  // Add mark as read button for unread notifications
  if (!notification.read) {
    actions.push('<button class="btn btn-sm btn-outline mark-read-btn">Mark as Read</button>')
  }

  return actions.join("")
}

function getTimeAgo(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000)

  if (diffInSeconds < 60) {
    return "Just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? "s" : ""} ago`
  }
}

function markAsRead(notificationId) {
  const notification = notifications.find((n) => n.id === notificationId)
  if (notification && !notification.read) {
    notification.read = true
    saveNotifications()
    renderNotifications()
    window.showToast("Notification marked as read", "success")
  }
}

function markAllAsRead() {
  const unreadCount = notifications.filter((n) => !n.read).length

  if (unreadCount === 0) {
    window.showToast("No unread notifications", "info")
    return
  }

  notifications.forEach((notification) => {
    notification.read = true
  })

  saveNotifications()
  renderNotifications()
  window.showToast(`${unreadCount} notifications marked as read`, "success")
}

function removeNotification(notificationId) {
  const index = notifications.findIndex((n) => n.id === notificationId)
  if (index !== -1) {
    const notification = notifications[index]
    notifications.splice(index, 1)
    saveNotifications()
    renderNotifications()
    window.showToast(`"${notification.title}" removed`, "info")
  }
}

function refreshNotifications() {
  // Simulate loading new notifications
  window.showToast("Refreshing notifications...", "info")

  // Add a new mock notification
  const newNotification = {
    id: Date.now(),
    title: "System Update Complete",
    message: "The scheduled maintenance has been completed successfully. All services are now fully operational.",
    type: "system",
    category: "system",
    time: new Date(),
    read: false,
    priority: "low",
  }

  notifications.unshift(newNotification)
  saveNotifications()
  renderNotifications()

  setTimeout(() => {
    window.showToast("Notifications updated", "success")
  }, 1000)
}

function updateNotificationCounts() {
  const counts = {
    all: notifications.length,
    unread: notifications.filter((n) => !n.read).length,
    academic: notifications.filter((n) => n.category === "academic").length,
    payment: notifications.filter((n) => n.category === "payment").length,
    system: notifications.filter((n) => n.category === "system").length,
  }

  // Update filter button counts
  Object.keys(counts).forEach((filter) => {
    const filterBtn = document.querySelector(`[data-filter="${filter}"]`)
    if (filterBtn) {
      const countElement = filterBtn.querySelector(".filter-count")
      if (countElement) {
        countElement.textContent = counts[filter]
      }
    }
  })

  // Update navigation badge
  if (window.Navigation) {
    window.Navigation.updateNotificationBadge()
  }
}

// Export functions for global use
window.NotificationsPage = {
  markAsRead,
  removeNotification,
  refreshNotifications,
}

// Declare showToast function
window.showToast = (message, type) => {
  console.log(`Toast: ${message} (${type})`)
}
