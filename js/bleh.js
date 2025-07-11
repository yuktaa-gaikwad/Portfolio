function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed")
    }
  })
}, observerOptions)

function initRevealAnimations() {
  const revealSections = document.querySelectorAll(".reveal-section")
  revealSections.forEach((section) => {
    observer.observe(section)
  })
}

function addStaggeredAnimation() {
  const techItems = document.querySelectorAll(".tech-item")
  techItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.05}s`
  })
}

function handleImageErrors() {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("error", function () {
      // Create a fallback colored div if image fails to load
      const fallback = document.createElement("div")
      fallback.className = "w-6 h-6 bg-gray-600 rounded flex items-center justify-center"
      fallback.innerHTML = '<i class="fas fa-code text-xs"></i>'
      this.parentNode.replaceChild(fallback, this)
    })
  })
}

function addKeyboardNavigation() {
  const categoryLabels = document.querySelectorAll(".category-label")
  categoryLabels.forEach((label) => {
    label.setAttribute("tabindex", "0")
    label.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })
  })
}

function addTechItemEffects() {
  const techItems = document.querySelectorAll(".tech-item")
  techItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px) scale(1.02)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

function addParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const techStack = document.getElementById("tech-stack")
    if (techStack) {
      const rate = scrolled * -0.5
      techStack.style.transform = `translateY(${rate}px)`
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations()
  addStaggeredAnimation()
  handleImageErrors()
  addKeyboardNavigation()
  addTechItemEffects()

  // Optional: Add parallax effect (uncomment if desired)
  // addParallaxEffect();

  console.log("Tech Stack section initialized successfully!")
})

window.addEventListener("resize", () => {
  // Recalculate any position-dependent elements if needed
  const stickyElements = document.querySelectorAll(".sticky")
  stickyElements.forEach((element) => {
    // Force recalculation of sticky positioning
    element.style.position = "relative"
    setTimeout(() => {
      element.style.position = "sticky"
    }, 10)
  })
})

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

window.TechStackUtils = {
  scrollToSection,
  initRevealAnimations,
  addStaggeredAnimation,
}
