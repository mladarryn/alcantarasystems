// Modern JavaScript functionality for Alcantara Systems website
// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const cookieBanner = document.getElementById('cookie-banner');


// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    }
    else {
        navbar.classList.remove('scrolled');
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
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('show');
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
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
    const projectLinks = document.querySelectorAll('.project-link');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectLinks.forEach(link => {
                const card = link.querySelector('.project-card');
                const categories = card.dataset.categories;

                if (filter === 'all' || (categories && categories.includes(filter))) {
                    link.style.display = 'block';
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        link.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}


// Cookie banner functionality
function showCookieBanner() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }
}
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
            langBtns.forEach(b => b.style.transform = 'scale(1)');
            btn.style.transform = 'scale(1.1)';
            const lang = btn.classList.contains('es') ? 'Español' :
                btn.classList.contains('fr') ? 'Français' : 'English';
            console.log(`Language switched to: ${lang}`);
        });
    });
}

// Parallax effect (optional)
// function initParallaxEffect() {...}

// Card hover effects
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

// Floating animation for hero stats
function initFloatingAnimation() {
    const heroStats = document.querySelectorAll('.hero-stat');
    heroStats.forEach((stat, index) => {
        stat.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #0F2671, #2563eb, #f59e0b);
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

// Loading animation
function initLoadingAnimation() {
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
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Image Slider functionality
function initImageSliders() {
    const sliders = document.querySelectorAll('.image-slider');
    sliders.forEach(sliderElement => {
        const slider = sliderElement.querySelector('.slides');
        const slides = sliderElement.querySelectorAll('.slides img');
        const prevBtn = sliderElement.querySelector('.prev');
        const nextBtn = sliderElement.querySelector('.next');
        const dots = sliderElement.querySelectorAll('.dot');
        let currentIndex = 0;
        let autoSlideInterval;
        let userInteracted = false;
        let resumeTimeout;

        if (!slider || slides.length === 0) return;

        slider.style.display = 'flex';
        slider.style.width = `${slides.length * 100}%`;
        slides.forEach(slide => {
            slide.style.width = `${100 / slides.length}%`;
        });

        function updateSlider() {
            const offset = 100 / slides.length;
            slider.style.transform = `translateX(-${currentIndex * offset}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function handleUserInteraction() {
            stopAutoSlide();
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(() => {
                startAutoSlide();
            }, 10000); // 10 seconds
        }

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            handleUserInteraction();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            handleUserInteraction();
        });
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                handleUserInteraction();
            });
        });

        startAutoSlide();
        updateSlider();
        import('https://unpkg.com/photoswipe@5/dist/photoswipe-lightbox.esm.min.js').then(({ default: PhotoSwipeLightbox }) => {
        const items = Array.from(slides).map(slide => ({
            src: slide.getAttribute('data-large') || slide.src,
            width: slide.naturalWidth || 1600,
            height: slide.naturalHeight || 900,
        }));

        const lightbox = new PhotoSwipeLightbox({
            dataSource: items,
            pswpModule: () => import('https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js'),
        });

        slides.forEach((slide, index) => {
            slide.style.cursor = 'zoom-in';
            slide.addEventListener('click', () => {
                lightbox.loadAndOpen(index);
            });
        });

        lightbox.on('open', () => {
            stopAutoSlide();
            clearTimeout(resumeTimeout);
        });
        lightbox.on('close', () => {
            startAutoSlide();
        });

        lightbox.init();
        });
    });
}

// NEW HAMBURGER MENU FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            navMenu.classList.remove('show');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// INTERACTIVE DIVISIONS
function initializeInteractiveDivisions() {
    const divisionPanels = document.querySelectorAll('.division-panel');

    divisionPanels.forEach(function(panel) {
        panel.addEventListener('mouseenter', function() {
            this.classList.add('division-active');

            divisionPanels.forEach(function(sibling) {
                if (sibling !== panel) {
                    sibling.classList.add('division-inactive');
                }
            });
        });

        panel.addEventListener('mouseleave', function() {
            divisionPanels.forEach(function(panel) {
                panel.classList.remove('division-active', 'division-inactive');
            });
        });
    });
}


// Initialize all on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeInteractiveDivisions();
    initLoadingAnimation();
    initSmoothScrolling();
    initScrollAnimations();
    initProjectFiltering();
    initLanguageSelector();
    initCardHoverEffects();
    initFloatingAnimation();
    initScrollProgress();
    initImageSliders();
    showCookieBanner();
    window.addEventListener('scroll', handleNavbarScroll);
});


// Responsive adjustments
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
    arrow.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const parentDropdown = this.closest('.nav-item.dropdown');
            parentDropdown.classList.toggle('open');
        }
    });
});

function checkNavOverflow() {
    const navMenu = document.querySelector('.nav-menu');
    const navContent = document.querySelector('.nav-content');

    if (!navMenu || !navContent) return;

    if (navMenu.scrollWidth > navContent.clientWidth) {
        document.body.classList.add('force-mobile-nav');
    } else {
        document.body.classList.remove('force-mobile-nav');
    }
}

// Run on load & on resize
window.addEventListener('load', checkNavOverflow);
window.addEventListener('resize', checkNavOverflow);
