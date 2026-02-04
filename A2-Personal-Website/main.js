// ===== Navigation & DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFormValidation();
    initializeSmoothScroll();
    initializeIntersectionObserver();
});

// ===== Navigation Functionality =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            
            // Update active state
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection) && currentSection) {
            link.classList.add('active');
        }
    });
}

// ===== Form Validation =====
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate inputs
            if (!validateName(name)) {
                showAlert('Please enter a valid name (at least 2 characters)', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }

            if (!validateMessage(message)) {
                showAlert('Please enter a message (at least 10 characters)', 'error');
                return;
            }

            // If all validations pass
            showAlert('Thank you for your message! I will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();

            // Log the form data (in a real application, this would be sent to a server)
            console.log('Form submitted:', { name, email, message });
        });

        // Add real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                // Remove error styling on input
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                }
            });
        });
    }
}

function validateName(name) {
    return name.length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.length >= 10;
}

function validateField(field) {
    let isValid = true;
    const value = field.value.trim();

    if (field.name === 'name') {
        isValid = validateName(value);
    } else if (field.name === 'email') {
        isValid = validateEmail(value);
    } else if (field.name === 'message') {
        isValid = validateMessage(value);
    }

    if (!isValid) {
        field.classList.add('error');
    } else {
        field.classList.remove('error');
    }

    return isValid;
}

function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(alertDiv);

    // Remove alert after 4 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 4000);
}

// ===== Smooth Scroll =====
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== Intersection Observer for Animations =====
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and other elements
    document.querySelectorAll('.education-card, .skill-category, .timeline-item, .visualization-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ===== Animations (add to CSS or keep in JS) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .form-group input.error,
    .form-group textarea.error {
        border-color: #e74c3c;
        background-color: rgba(231, 76, 60, 0.05);
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
    }
`;
document.head.appendChild(style);

// ===== Utility Functions =====
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

// ===== Console Log for Debugging =====
console.log('Portfolio website loaded successfully!');
