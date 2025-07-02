// Modern JavaScript functionality for Alcantara Systems website
// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const cookieBanner = document.getElementById('cookie-banner');
// const projectsGrid = document.getElementById('projects-grid') as HTMLElement;
// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    }
    else {
        navbar.classList.remove('scrolled');
    }
}
// Mobile menu toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('show');
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
        if (navMenu.classList.contains('show')) {
            icon.className = 'fas fa-times';
        }
        else {
            icon.className = 'fas fa-bars';
        }
    }
}
// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    if (navMenu.classList.contains('show')) {
                        toggleMobileMenu();
                    }
                }
            }
        });
    });
}
// Intersection Observer for animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    animatedElements.forEach(el => observer.observe(el));
}
// Project filtering functionality
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                }
                else {
                    const categories = card.dataset.categories;
                    if (categories && categories.includes(filter || '')) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }
                    else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}
// Cookie banner functionality
function showCookieBanner() {
    // Check if cookies have been accepted before
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000); // Show after 2 seconds
    }
}
// Global functions for cookie banner (accessed from HTML onclick)
window.acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('show');
};
window.hideCookieBanner = () => {
    cookieBanner.classList.remove('show');
};
// Language selector functionality
function initLanguageSelector() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons
            langBtns.forEach(b => b.style.transform = 'scale(1)');
            // Add active state to clicked button
            btn.style.transform = 'scale(1.1)';
            // Here you would typically implement language switching logic
            // For demo purposes, we'll just show an alert
            const lang = btn.classList.contains('es') ? 'Español' :
                btn.classList.contains('fr') ? 'Français' : 'English';
            console.log(`Language switched to: ${lang}`);
        });
    });
}
// Parallax effect for hero section (commented out to avoid TS errors)
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
}
// Add hover effects to cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.division-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}
// Initialize floating animation for hero stats
function initFloatingAnimation() {
    const heroStats = document.querySelectorAll('.hero-stat');
    heroStats.forEach((stat, index) => {
        stat.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
    // Add the float keyframes to the document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}
// Add typing effect to hero title (commented out to avoid TS errors)
// function initTypingEffect() {
//     const heroTitle = document.querySelector('.hero-title') as HTMLElement;
//     if (heroTitle) {
//         const originalText = heroTitle.textContent || '';
//         heroTitle.textContent = '';
//         let i = 0;
//         const typeWriter = () => {
//             if (i < originalText.length) {
//                 heroTitle.textContent += originalText.charAt(i);
//                 i++;
//                 setTimeout(typeWriter, 100);
//             }
//         };
//         // Start typing effect after a delay
//         setTimeout(typeWriter, 1000);
//     }
// }
// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #f59e0b, #2563eb);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}
// Add loading animation
function initLoadingAnimation() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1e293b;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    const loadingSpinner = document.createElement('div');
    loadingSpinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(245, 158, 11, 0.3);
        border-top: 3px solid #f59e0b;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    // Add spinner keyframes
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
    loadingOverlay.appendChild(loadingSpinner);
    document.body.appendChild(loadingOverlay);
    // Hide loading overlay after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}
// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading animation first
    initLoadingAnimation();
    // Initialize all other features
    initSmoothScrolling();
    initScrollAnimations();
    initProjectFiltering();
    initLanguageSelector();
    initCardHoverEffects();
    initFloatingAnimation();
    initScrollProgress();
    // Show cookie banner
    showCookieBanner();
    // Add event listeners
    window.addEventListener('scroll', handleNavbarScroll);
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    // Initialize parallax effect (optional - can cause performance issues on some devices)
    // initParallaxEffect();
    // Initialize typing effect (optional - might be too much animation)
    // initTypingEffect();
});
// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && navMenu.classList.contains('show')) {
        toggleMobileMenu();
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.values-image .slides');
    const slides = document.querySelectorAll('.values-image .slides img');
    const prevBtn = document.querySelector('.values-image .prev');
    const nextBtn = document.querySelector('.values-image .next');
    let index = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    });
});


// Export for potential external use
// export { handleNavbarScroll, toggleMobileMenu, initSmoothScrolling, initScrollAnimations, initProjectFiltering, showCookieBanner };
