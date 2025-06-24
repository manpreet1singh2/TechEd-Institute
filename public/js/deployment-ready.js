// TechMindsHub Website - Production Ready JavaScript
// Handles form submissions with proper error handling and user feedback

// Apply Now Form Handler
async function handleApplyForm(event) {
  event.preventDefault()

  const submitBtn = event.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'
  submitBtn.disabled = true

  const formData = new FormData(event.target)
  const data = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    course: formData.get("course"),
    duration: formData.get("duration"),
    message: formData.get("message"),
  }

  try {
    const response = await fetch("/api/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (result.success) {
      showAlert("success", "🎉 Application submitted successfully! We will contact you soon.")
      event.target.reset()

      // Close modal if using Bootstrap modal
      const modal = window.bootstrap.Modal.getInstance(document.getElementById("applyModal"))
      if (modal) modal.hide()

      // Track conversion (if Google Analytics is set up)
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "form_submit", {
          event_category: "Application",
          event_label: data.course,
        })
      }
    } else {
      showAlert("error", result.message || "Failed to submit application. Please try again.")
    }
  } catch (error) {
    console.error("Error:", error)
    showAlert("error", "Network error. Please check your connection and try again.")
  } finally {
    // Reset button state
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }
}

// Contact Form Handler
async function handleContactForm(event) {
  event.preventDefault()

  const submitBtn = event.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true

  const formData = new FormData(event.target)
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (result.success) {
      showAlert("success", "📧 Message sent successfully! We will get back to you soon.")
      event.target.reset()

      // Track conversion (if Google Analytics is set up)
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "form_submit", {
          event_category: "Contact",
          event_label: "Contact Form",
        })
      }
    } else {
      showAlert("error", result.message || "Failed to send message. Please try again.")
    }
  } catch (error) {
    console.error("Error:", error)
    showAlert("error", "Network error. Please check your connection and try again.")
  } finally {
    // Reset button state
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false
  }
}

// Enhanced Alert function with better styling
function showAlert(type, message) {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll(".custom-alert")
  existingAlerts.forEach((alert) => alert.remove())

  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type === "success" ? "success" : "danger"} alert-dismissible fade show custom-alert`
  alertDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    max-width: 500px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border: none;
    border-radius: 8px;
  `

  alertDiv.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-triangle"} me-2"></i>
      <div>${message}</div>
      <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
    </div>
  `

  document.body.appendChild(alertDiv)

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove()
    }
  }, 5000)
}

// Form validation
function validateForm(data, type) {
  const errors = []

  // Common validations
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Please enter a valid email address")
  }

  if (!data.phone || !/^[+]?[\d\s\-$$$$]{10,}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.push("Please enter a valid phone number")
  }

  // Apply form specific validations
  if (type === "apply") {
    if (!data.fullName || data.fullName.trim().length < 2) {
      errors.push("Please enter your full name")
    }
    if (!data.course) {
      errors.push("Please select a course")
    }
    if (!data.duration) {
      errors.push("Please select a duration")
    }
  }

  // Contact form specific validations
  if (type === "contact") {
    if (!data.name || data.name.trim().length < 2) {
      errors.push("Please enter your name")
    }
    if (!data.message || data.message.trim().length < 10) {
      errors.push("Please enter a message (at least 10 characters)")
    }
  }

  return errors
}

// Enhanced form handlers with validation
async function handleApplyFormWithValidation(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const data = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    course: formData.get("course"),
    duration: formData.get("duration"),
    message: formData.get("message"),
  }

  // Validate form
  const errors = validateForm(data, "apply")
  if (errors.length > 0) {
    showAlert("error", errors.join("<br>"))
    return
  }

  // Proceed with form submission
  await handleApplyForm(event)
}

async function handleContactFormWithValidation(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  }

  // Validate form
  const errors = validateForm(data, "contact")
  if (errors.length > 0) {
    showAlert("error", errors.join("<br>"))
    return
  }

  // Proceed with form submission
  await handleContactForm(event)
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 TechMindsHub website loaded successfully!")

  // Attach form handlers
  const applyForm = document.getElementById("applyForm")
  const contactForm = document.getElementById("contactForm")

  if (applyForm) {
    applyForm.addEventListener("submit", handleApplyFormWithValidation)
    console.log("✅ Apply form handler attached")
  }

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormWithValidation)
    console.log("✅ Contact form handler attached")
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add loading states to all buttons
  document.querySelectorAll('button[type="submit"]').forEach((button) => {
    button.addEventListener("click", function () {
      // Add ripple effect
      const ripple = document.createElement("span")
      ripple.className = "ripple"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
})

// Add some CSS for better UX
const style = document.createElement("style")
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  button[type="submit"] {
    position: relative;
    overflow: hidden;
  }
  
  .custom-alert {
    animation: slideInRight 0.3s ease-out;
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`
document.head.appendChild(style)
