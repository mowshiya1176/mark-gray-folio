// Portfolio JavaScript - All functionality preserved from React version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeHeader();
    initializeMobileMenu();
    initializeContactForm();
    initializeScrollIndicators();
    setCurrentYear();
});

// Header scroll effect
function initializeHeader() {
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');
    
    menuToggle.addEventListener('click', function() {
        const isOpen = mobileNav.classList.contains('active');
        
        if (isOpen) {
            mobileNav.classList.remove('active');
            menuIcon.className = 'bx bx-menu';
        } else {
            mobileNav.classList.add('active');
            menuIcon.className = 'bx bx-x';
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            menuIcon.className = 'bx bx-menu';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('active');
            menuIcon.className = 'bx bx-menu';
        }
    });
}

// Smooth scrolling navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');
    mobileNav.classList.remove('active');
    menuIcon.className = 'bx bx-menu';
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 1500);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = toast.querySelector('i');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        toastIcon.className = 'bx bx-check-circle';
        toastIcon.style.color = 'hsl(120, 84%, 60%)';
    } else if (type === 'error') {
        toastIcon.className = 'bx bx-error-circle';
        toastIcon.style.color = 'hsl(0, 84%, 60%)';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize scroll indicators and animations
function initializeScrollIndicators() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobile-nav');
        const menuIcon = document.getElementById('menu-icon');
        mobileNav.classList.remove('active');
        menuIcon.className = 'bx bx-menu';
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Add loading animation for images
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            console.warn('Failed to load image:', this.src);
        });
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll-based functionality can go here
}, 10));

// Add smooth hover effects for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.gradient-btn, .glass-btn, .social-icon, .footer-social-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Lazy loading for background images
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize all performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    initializeImageLoading();
    initializeLazyLoading();
});

// Console message for developers
console.log('%c👋 Hello Developer!', 'color: #9333ea; font-size: 16px; font-weight: bold;');
console.log('%cThis portfolio was built with HTML, CSS, and JavaScript.', 'color: #666; font-size: 12px;');
console.log('%cInterested in working together? Let\'s connect!', 'color: #666; font-size: 12px;');