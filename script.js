// ===========================
// INICIALIZAÇÃO DOS ÍCONES LUCIDE
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    createParticles();
    setupScrollAnimations();
    setupCounters();
    setupNavbar();
    setupMobileMenu();
    setupApoiarButton();
});

// ===========================
// PARTÍCULAS DO HERO
// ===========================
function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';

        const size = Math.random() * 6 + 3;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 10;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            background: rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2});
        `;

        container.appendChild(particle);
    }
}

// ===========================
// NAVBAR SCROLL
// ===========================
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===========================
// MENU MOBILE
// ===========================
function setupMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
    });

    // Fechar o menu ao clicar em um link
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
        });
    });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================
function setupScrollAnimations() {
    const elements = document.querySelectorAll(
        '.card, .stat-card, .image-card, .timeline-item, .feature-list li, .connection-card, .connection-summary'
    );

    elements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children).filter(child => child.classList.contains('animate-on-scroll')) : [];
                const siblingIndex = siblings.indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, siblingIndex * 100);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===========================
// CONTADORES ANIMADOS
// ===========================
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.3
    });

    const statsSection = document.getElementById('dados');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing: ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// ===========================
// BOTÃO APOIE A CAUSA
// ===========================
function setupApoiarButton() {
    const btnApoiar = document.getElementById('btnApoiar');
    if (!btnApoiar) return;

    btnApoiar.addEventListener('click', () => {
        // Cria a mensagem flutuante (Toast)
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.innerHTML = '💚 Obrigado por apoiar a agricultura familiar e o MST! Juntos por um futuro sustentável.';
        
        document.body.appendChild(toast);

        // Adiciona a classe para exibir com animação
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Remove a mensagem após 4 segundos
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    });
}