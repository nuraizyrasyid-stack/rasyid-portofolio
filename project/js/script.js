// ==================== LOADING SCREEN ====================
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    loading.classList.add('hidden');
    setTimeout(() => loading.style.display = 'none', 600);
});

// ==================== AOS ANIMATION (OPTIMIZED) ====================
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 500,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 50,
        delay: 0,
        anchorPlacement: 'top-bottom',
        disable: window.innerWidth < 768 ? 'mobile' : false
    });
});

// ==================== TYPED.JS (OPTIMIZED) ====================
window.addEventListener('DOMContentLoaded', () => {
    new Typed('#typed', {
        strings: ["Web Developer (Front-End Specialist)"],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1800,
        startDelay: 200,
        loop: true,
        showCursor: false
    });
});

// ==================== PARTICLES (SUPER RINGAN) ====================
window.addEventListener('load', () => {
    particlesJS('particles', {
        particles: {
            number: { 
                value: 8,
                density: { enable: true, value_area: 800 }
            },
            color: { value: '#ffd60a' },
            shape: { type: 'circle' },
            opacity: { 
                value: 0.12,
                random: true,
                anim: { enable: false }
            },
            size: { 
                value: 2,
                random: true
            },
            line_linked: { enable: false },
            move: { 
                enable: true, 
                speed: 0.25,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: { 
            detect_on: 'canvas',
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
            }
        },
        retina_detect: true
    });
    
    const particles = document.getElementById('particles');
    if (particles) {
        particles.classList.add('loaded');
    }
});

// ==================== NAVBAR SCROLL (OPTIMIZED) ====================
let lastScrollY = 0;
let ticking = false;

const navbar = document.getElementById('navbar');

function updateNavbar() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    ticking = false;
}

function requestNavbarUpdate() {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

window.addEventListener('scroll', requestNavbarUpdate, { passive: true });

// ==================== MOBILE MENU ====================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenu.setAttribute('aria-hidden', isExpanded);
    
    // Prevent body scroll when menu open
    if (!isExpanded) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when link clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });
});

// ==================== SMOOTH SCROLL (OPTIMIZED) ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        const navbarHeight = navbar.offsetHeight || 80;
        const offset = navbarHeight + 40;
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });
});

// ==================== PROJECT FILTER (OPTIMIZED) ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        const currentActive = document.querySelector('.filter-btn.active');
        if (currentActive) currentActive.classList.remove('active');
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        // Filter with fade effect
        projectCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'all' || category === filter) {
                card.style.display = '';
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
                // Use display none after animation
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Re-trigger AOS for visible cards
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });
});

// ==================== WHATSAPP FUNCTIONS ====================
function openWhatsApp(message = 'Halo! Saya tertarik dengan proyek Anda.') {
    const phoneNumber = "6283160891392";
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

function openWhatsAppLetsTalk() {
    openWhatsApp('Halo Rasyid, saya mau bicara tentang kerja sama.');
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 250);
}, { passive: true });

// Preload images on hover (optional enhancement)
const projectImages = document.querySelectorAll('.project-card img');
projectImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
        if (!this.complete) {
            this.loading = 'eager';
        }
    }, { once: true, passive: true });
});

// Log performance metrics (optional - remove in production)
if (window.performance && console.log) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page Load Time: ${pageLoadTime}ms`);
        }, 0);
    });
}