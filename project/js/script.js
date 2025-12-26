// Loading cepat
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    loading.classList.add('hidden');
    setTimeout(() => loading.style.display = 'none', 400);
});

// AOS ringan
AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: true,
    mirror: false,
    offset: 40
});

// Typed.js mulai cepat
new Typed('#typed', {
    strings: ["Web Developer (Front-End Specialist)"],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 2000,
    startDelay: 300,
    loop: true,
    showCursor: false
});

// Particles super ringan
particlesJS('particles', {
    particles: {
        number: { value: 12 },
        color: { value: '#ffd60a' },
        shape: { type: 'circle' },
        opacity: { value: 0.15 },
        size: { value: 2 },
        move: { enable: true, speed: 0.3 }
    },
    interactivity: { events: {} },
    retina_detect: true
});
document.getElementById('particles').classList.add('loaded');

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenu.setAttribute('aria-hidden', expanded);
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = navbar.offsetHeight || 80;
            const offset = navbarHeight + 50;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });

            if (mobileMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// Project Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

function openWhatsApp(message = 'Halo! Saya tertarik dengan proyek Anda.') {
    const phoneNumber = "6283160891392";
    const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
}

function openWhatsAppLetsTalk() {
    openWhatsApp('Halo Rasyid, saya mau bicara tentang kerja sama.');
}