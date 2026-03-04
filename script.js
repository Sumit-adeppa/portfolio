// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for modal triggers
        if (href === '#' || href.includes('onclick')) {
            return;
        }

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat, .expertise-card, .metric-card, .capability-item, .tech-blob, .cert-card, .education-card, .contact-card, .section-header-centered, .hero-visual-container');
animatedElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
});

// ============================================
// TERMINAL TYPING ANIMATION
// ============================================

function animateTerminal() {
    const lines = document.querySelectorAll('.glass-terminal .line');
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(10px)';
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease-out';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 500 + (index * 800));
    });
}

// ============================================
// PROJECT MODAL FUNCTIONALITY
// ============================================

const projectData = {
    p1: {
        title: 'Cartify - Modular E-commerce Engine',
        tech: ['Java', 'Spring Boot', 'JWT', 'MongoDB', 'Razorpay'],
        description: 'Engineered a scalable modular e-commerce application by developing six independent services: Authentication, User Management, Product, Cart, Order, and Payment. Implemented secure authentication and role-based access control with JWT for Admin and Customers. Built RESTful APIs for user registration, product catalog, cart operations, order life cycle management, and payment transactions. Integrated third-party payment gateways (Razorpay, Stripe, PayPal) to handle secure online transactions. Delivered a React.js frontend for an intuitive shopping experience.'
    },
    p3: {
        title: 'Enterprise CI/CD Pipeline',
        tech: ['GitHub', 'Jenkins', 'Docker', 'IBM Cloud', 'Bash'],
        description: 'Designed and implemented a complete CI/CD pipeline using Jenkins to automate build, test, and deployment processes. Integrated GitHub for version control and configured automated triggers for continuous integration on every code push. Built and tested a Python application, created a Jenkins file with stages for checkout, build, test, package, and deployment. Deployed application on IBM cloud using IBM cloud CLI with secure API key management. Configured automated test reporting, artifact archiving, and mail notifications.'
    }
};

function openModal(projectId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalBody) return;

    const data = projectData[projectId];

    if (!data) return;

    const techTags = data.tech.map(t => `<span class="project-tech">${t}</span>`).join('');

    const content = `
        <h2>${data.title}</h2>
        <div style="margin: 1.5rem 0;">
            <p style="margin-bottom: 1rem; color: #64748b;">
                ${data.description}
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem;">
                ${techTags}
            </div>
        </div>
    `;

    modalBody.innerHTML = content;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking overlay
const modal = document.getElementById('modal');
if (modal) {
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
}

// Close modal with escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active style for nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    // Animate hero section on page load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }

    // Add fade-in to other elements
    document.querySelectorAll('.skill-category, .project-card').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// ============================================
// SMOOTH PAGE TRANSITIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    animateTerminal();
});

// ============================================
// PROFESSIONAL CONSOLE GREETING
// ============================================

const consoleGreeting = () => {
    const styles = [
        'background: linear-gradient(#4f46e5, #4338ca)',
        'border: 1px solid #312e81',
        'color: white',
        'display: block',
        'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
        'line-height: 40px',
        'text-align: center',
        'font-weight: bold',
        'font-size: 14px',
        'padding: 5px 15px',
        'border-radius: 5px'
    ].join(';');

    console.log('%c👋 Welcome to Sumit Adeppa\'s Portfolio', styles);
    console.log('%cInterested in the source code? Check it out on GitHub: https://github.com/Sumit-adeppa', 'color: #4f46e5; font-weight: bold;');
};

document.addEventListener('DOMContentLoaded', () => {
    consoleGreeting();

    // Scroll to Top Logic
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
