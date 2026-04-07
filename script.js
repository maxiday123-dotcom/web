
/**
 * MM Web & Design - Script Principal
 * Optimizado para performance y compatibilidad
 */

// ==================== CONFIGURACIÓN ====================
const CONFIG = {
    cursor: { enabled: window.innerWidth > 768 },
    scrollThreshold: 60,
    particles: {
        id: "particles",
        number: 60,
        color: "#a855f7",
        linksColor: "#7e22ce",
        speed: 1,
        size: 2
    },
    animations: {
        hero: { y: 80, opacity: 0, duration: 1.4 },
        stagger: { y: 60, opacity: 0, duration: 1 }
    }
};

// ==================== CURSOR PERSONALIZADO ====================
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector(".cursor");
        this.enabled = CONFIG.cursor.enabled;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.init();
    }

    init() {
        if (!this.cursor || !this.enabled) return;

        // Smooth cursor movement con RAF
        this.animateCursor();
        
        // Detectar dispositivos touch
        document.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
        window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    handleResize() {
        this.enabled = window.innerWidth > 768;
        this.cursor.style.display = this.enabled ? 'block' : 'none';
    }

    animateCursor() {
        // Suavizado con lerp
        this.cursorX += (this.mouseX - this.cursorX) * 0.1;
        this.cursorY += (this.mouseY - this.cursorY) * 0.1;

        if (this.cursor) {
            this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        }

        requestAnimationFrame(this.animateCursor.bind(this));
    }
}

// ==================== HEADER SCROLL ====================
class HeaderScroll {
    constructor() {
        this.header = document.querySelector(".main-header");
        this.init();
    }

    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        window.addEventListener('resize', this.handleScroll.bind(this), { passive: true });
    }

    handleScroll() {
        const scrolled = window.scrollY > CONFIG.scrollThreshold;
        this.header.classList.toggle("scrolled", scrolled);
    }
}

// ==================== ANIMACIONES GSAP ====================
class Animations {
    constructor() {
        this.initGSAP();
    }

    initGSAP() {
        // Verificar si GSAP está cargado
        if (typeof gsap === 'undefined') {
            console.warn('GSAP no encontrado. Animaciones desactivadas.');
            return;
        }

        // Registrar ScrollTrigger
        if (ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        this.animateHero();
        this.animateStagger();
    }

    animateHero() {
        const heroTitle = document.querySelector(".hero h1");
        if (!heroTitle) return;

        gsap.from(heroTitle, {
            y: CONFIG.animations.hero.y,
            opacity: CONFIG.animations.hero.opacity,
            duration: CONFIG.animations.hero.duration,
            ease: "power3.out"
        });
    }

    animateStagger() {
        const elements = gsap.utils.toArray(".service-card, .project-card, .price-card");
        
        elements.forEach((el, index) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: CONFIG.animations.stagger.y,
                opacity: CONFIG.animations.stagger.opacity,
                duration: CONFIG.animations.stagger.duration,
                ease: "power3.out",
                delay: index * 0.1
            });
        });
    }
}

// ==================== PARTICULAS TSPARTICLES ====================
class Particles {
    constructor() {
        this.init();
    }

    init() {
        if (typeof tsParticles === 'undefined') {
            console.warn('tsParticles no encontrado.');
            return;
        }

        const particlesContainer = document.getElementById(CONFIG.particles.id);
        if (!particlesContainer) return;

        try {
            tsParticles.load(CONFIG.particles.id, {
                particles: {
                    number: { value: CONFIG.particles.number },
                    color: { value: CONFIG.particles.color },
                    links: {
                        enable: true,
                        color: CONFIG.particles.linksColor
                    },
                    move: {
                        enable: true,
                        speed: CONFIG.particles.speed
                    },
                    size: { value: CONFIG.particles.size }
                },
                detectRetina: true,
                fullScreen: { enable: false },
                background: { color: { value: "transparent" } }
            });
        } catch (error) {
            console.error('Error cargando partículas:', error);
        }
    }
}

// ==================== MENU MÓVIL ====================
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.menu-toggle');
        this.menu = document.querySelector('.menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.toggle || !this.menu) return;

        this.toggle.addEventListener('click', this.toggleMenu.bind(this));
        
        // Cerrar menú al hacer click en links
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', this.closeMenu.bind(this));
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.toggle.setAttribute('aria-expanded', this.isOpen);
        this.menu.classList.toggle('active', this.isOpen);
        document.body.classList.toggle('menu-open', this.isOpen);
    }

    closeMenu() {
        this.isOpen = false;
        this.toggle.setAttribute('aria-expanded', false);
        this.menu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// ==================== INICIALIZACIÓN ====================
class App {
    constructor() {
        this.init();
    }

    init() {
        // Esperar a que DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.startApp.bind(this));
        } else {
            this.startApp();
        }
    }

    startApp() {
        new CustomCursor();
        new HeaderScroll();
        new Animations();
        new Particles();
        new MobileMenu();

        // Prevenir FOUC (Flash of Unstyled Content)
        document.body.classList.add('loaded');
    }
}

// ==================== EJECUTAR APP ====================
new App();

// ==================== SERVICE WORKER (PWA Ready) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .catch(err => console.log('Service Worker no soportado'));
    });
}
