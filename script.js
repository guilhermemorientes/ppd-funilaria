// Navbar scroll effect and active link highlighting
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  // Navbar background on scroll
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }

  // Active section highlighting
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Mobile menu toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Services slider functionality
let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const serviceItems = document.querySelectorAll(".service-item")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"))
  serviceItems.forEach((item) => item.classList.remove("active"))

  slides[index].classList.add("active")
  serviceItems[index].classList.add("active")
  currentSlide = index
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  showSlide(currentSlide)
}

nextBtn.addEventListener("click", nextSlide)
prevBtn.addEventListener("click", prevSlide)

// Service item click handlers
serviceItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    showSlide(index)
  })
})

// Auto-play slider
setInterval(nextSlide, 5000)

// Form submissions
function handleFormSubmit(formId) {
  const form = document.getElementById(formId)
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    // Simulate form submission
    const button = form.querySelector('button[type="submit"]')
    const originalText = button.innerHTML

    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
    button.disabled = true

    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-check"></i> Enviado com Sucesso!'
      button.style.background = "#27ae60"

      setTimeout(() => {
        button.innerHTML = originalText
        button.style.background = ""
        button.disabled = false
        form.reset()

        // Show success message
        showNotification("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success")
      }, 2000)
    }, 1500)
  })
}

// Initialize form handlers
handleFormSubmit("hero-form")
handleFormSubmit("contact-form")

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#27ae60" : "#3498db"};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `

  notification.querySelector("button").style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Add CSS for notification animation
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
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

// Smooth scrolling for anchor links
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

// Loading animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded")
    }
  })
}, observerOptions)

// Observe elements for loading animation
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".section-header, .about-feature, .service-item, .portfolio-item, .testimonial-item, .contact-item",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("loading")
    observer.observe(el)
  })
})

// Portfolio hover effects
document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-10px) scale(1.02)"
  })

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)"
  })
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")

  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// WhatsApp integration (optional)
function openWhatsApp() {
  const phone = "5511999999999" // Replace with actual phone number
  const message = "Olá! Gostaria de solicitar um orçamento para meu veículo."
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

// Add WhatsApp floating button
const whatsappButton = document.createElement("div")
whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>'
whatsappButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: #25d366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
    transition: all 0.3s ease;
`

whatsappButton.addEventListener("click", openWhatsApp)
whatsappButton.addEventListener("mouseenter", () => {
  whatsappButton.style.transform = "scale(1.1)"
})
whatsappButton.addEventListener("mouseleave", () => {
  whatsappButton.style.transform = "scale(1)"
})

document.body.appendChild(whatsappButton)

console.log("AutoCare Funilaria - Website loaded successfully!")
