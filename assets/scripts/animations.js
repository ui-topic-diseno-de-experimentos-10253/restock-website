// ===== ANIMACIONES AL HACER SCROLL =====

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            // Opcional: dejar de observar después de animar
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos que queremos animar
document.addEventListener('DOMContentLoaded', () => {
    // Animar tarjetas de about-us
    const aboutCards = document.querySelectorAll('.about-us-cards .card');
    aboutCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Animar tarjetas de beneficios
    const benefitCards = document.querySelectorAll('.benefits-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animar tarjetas de testimonios
    const testimonialCards = document.querySelectorAll('.card-testimonio');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Animar tarjetas del equipo
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Animar títulos de secciones
    const sectionTitles = document.querySelectorAll(
        '.about-us-title, .benefits-title, .titulo-testimonios, .about-us-subtitle, .tutorial__title, .contact__title'
    );
    sectionTitles.forEach(title => {
        observer.observe(title);
    });

    // Animar descripciones
    const descriptions = document.querySelectorAll(
        '.about-us-description, .benefits-description, .descripcion-testimonios, .tutorial__description, .contact__description'
    );
    descriptions.forEach(desc => {
        observer.observe(desc);
    });
});

// ===== EFECTO PARALLAX EN HERO =====
let heroImage = null;
let heroText = null;

window.addEventListener('load', () => {
    heroImage = document.querySelector('.hero-image img');
    heroText = document.querySelector('.hero-text');
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    // Solo efecto de escala en la imagen, sin traslación
    if (heroImage && scrolled < window.innerHeight) {
        const scale = 1 + (scrolled * 0.0002); // Escala sutil al hacer scroll
        heroImage.style.transform = `scale(${scale})`;
    }

    if (heroText && scrolled < window.innerHeight) {
        heroText.style.transform = `translateY(${scrolled * parallaxSpeed * 0.3}px)`;
    }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL PARA ENLACES =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Evitar aplicar scroll suave a enlaces vacíos o solo "#"
        if (href === '#' || href === '') {
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMACIÓN DE CONTADORES (si hay números) =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// ===== PRELOADER (opcional) =====
window.addEventListener('load', () => {
    // Fade in suave de la página
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
