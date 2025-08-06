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
      button.style.background = "var(--primary-color)"

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
        background: ${type === "success" ? "var(--primary-color)" : "#3498db"};
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

// Color Selector System
class ColorSelector {
  constructor() {
    this.colors = {
      red: { primary: '#EA4335', hover: '#C53030', light: 'rgba(234, 67, 53, 0.1)', shadow: 'rgba(234, 67, 53, 0.3)' },
      blue: { primary: '#4285F4', hover: '#1a73e8', light: 'rgba(66, 133, 244, 0.1)', shadow: 'rgba(66, 133, 244, 0.3)' },
      yellow: { primary: '#FBBC05', hover: '#ea8600', light: 'rgba(251, 188, 5, 0.1)', shadow: 'rgba(251, 188, 5, 0.3)' },
      green: { primary: '#34A853', hover: '#137333', light: 'rgba(52, 168, 83, 0.1)', shadow: 'rgba(52, 168, 83, 0.3)' }
    }
    
    this.currentColor = localStorage.getItem('selectedColor') || 'red'
    this.init()
  }

  init() {
    this.createColorSelector()
    this.applyColor(this.currentColor)
    this.bindEvents()
  }

  createColorSelector() {
    const colorSelector = document.createElement('div')
    colorSelector.className = 'color-selector'
    colorSelector.innerHTML = `
      <button class="color-toggle">
        <i class="fas fa-palette"></i>
      </button>
      <div class="color-options">
        <div class="color-selector-label">Escolha a Cor</div>
        <div class="color-option red ${this.currentColor === 'red' ? 'active' : ''}" data-color="red"></div>
        <div class="color-option blue ${this.currentColor === 'blue' ? 'active' : ''}" data-color="blue"></div>
        <div class="color-option yellow ${this.currentColor === 'yellow' ? 'active' : ''}" data-color="yellow"></div>
        <div class="color-option green ${this.currentColor === 'green' ? 'active' : ''}" data-color="green"></div>
      </div>
    `
    
    document.body.appendChild(colorSelector)
    this.selector = colorSelector
  }

  bindEvents() {
    const toggle = this.selector.querySelector('.color-toggle')
    const options = this.selector.querySelectorAll('.color-option')

    toggle.addEventListener('click', () => {
      this.selector.classList.toggle('expanded')
    })

    options.forEach(option => {
      option.addEventListener('click', () => {
        const color = option.dataset.color
        this.selectColor(color)
      })
    })

    // Close selector when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.selector.contains(e.target)) {
        this.selector.classList.remove('expanded')
      }
    })
  }

  selectColor(color) {
    this.currentColor = color
    localStorage.setItem('selectedColor', color)
    
    // Update active state
    this.selector.querySelectorAll('.color-option').forEach(option => {
      option.classList.remove('active')
    })
    this.selector.querySelector(`[data-color="${color}"]`).classList.add('active')
    
    this.applyColor(color)
    this.selector.classList.remove('expanded')
    
    // Show notification
    const colorNames = {
      red: 'Vermelho',
      blue: 'Azul', 
      yellow: 'Amarelo',
      green: 'Verde'
    }
    
    showNotification(`Cor alterada para ${colorNames[color]}!`, 'success')
  }

  applyColor(color) {
    const colorData = this.colors[color]
    const root = document.documentElement
    
    root.style.setProperty('--primary-color', colorData.primary)
    root.style.setProperty('--primary-hover', colorData.hover)
    root.style.setProperty('--primary-light', colorData.light)
    root.style.setProperty('--primary-shadow', colorData.shadow)
    
    // Update toggle button color
    const toggle = this.selector.querySelector('.color-toggle')
    toggle.style.background = colorData.primary
    toggle.style.boxShadow = `0 4px 15px ${colorData.shadow}`
  }
}

// Initialize color selector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ColorSelector()
})

console.log("AutoCare Funilaria - Website loaded successfully!")
