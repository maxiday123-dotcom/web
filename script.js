
    /**
 * MM Web & Design - Script Principal v2.0
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
        if (this.cursor) {
            this.cursor.style.display = this.enabled ? 'block' : 'none';
        }
    }

    animateCursor() {
        // Suavizado con lerp
        this.cursorX += (this.mouseX - this.cursorX) * 0.12;
        this.cursorY += (this.mouseY - this.cursorY) * 0.12;

        if (this.cursor && this.enabled) {
            this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        }

        requestAnimationFrame(this.animateCursor.bind(this));
    }
}

// ==================== HEADER SCROLL ====================
class HeaderScroll {
    constructor() {
        this.header = document.querySelector(".main-header");
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        window.addEventListener('resize', this.handleResize.bind(this), { passive: true });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > this.scrollThreshold) {
            this.header.style.background = 'rgba(10, 10, 10, 0.98)';
            this.header.style.backdropFilter = 'blur(20px)';
        } else {
            this.header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
        
        this.lastScrollY = currentScrollY;
    }

    handleResize() {
        this.lastScrollY = window.scrollY;
    }
}

// ==================== ANIMACIONES GSAP ====================
class Animations {
    constructor() {
        this.initGSAP();
    }

    initGSAP() {
        if (typeof gsap === 'undefined') return;

        // Hero animation
        gsap.from('.hero-content', {
            duration: CONFIG.animations.hero.duration,
            y: CONFIG.animations.hero.y,
            opacity: CONFIG.animations.hero.opacity,
            ease: 'power3.out'
        });

        // Stagger animations
        gsap.utils.toArray('.service-card, .price-card, .testimonial').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                duration: CONFIG.animations.stagger.duration,
                y: CONFIG.animations.stagger.y,
                opacity: CONFIG.animations.stagger.opacity,
                ease: 'power3.out'
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
            console.warn('tsParticles no encontrado. Cargando fallback...');
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
                        color: CONFIG.particles.linksColor,
                        width: 1,
                        opacity: 0.3
                    },
                    move: {
                        enable: true,
                        speed: CONFIG.particles.speed,
                        outModes: {
                            default: "out"
                        }
                    },
                    size: { 
                        value: CONFIG.particles.size,
                        random: true
                    },
                    opacity: {
                        value: 0.4,
                        random: true
                    }
                },
                detectRetina: true,
                fullScreen: { 
                    enable: false,
                    zIndex: 1
                },
                background: { 
                    color: { value: "transparent" } 
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "grab"
                        }
                    }
                }
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

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', this.handleOutsideClick.bind(this));
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

    handleOutsideClick(e) {
        if (this.isOpen && !this.menu.contains(e.target) && !this.toggle.contains(e.target)) {
            this.closeMenu();
        }
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

        console.log('🎉 MM Web & Design - App iniciada correctamente');
    }
}

// ==================== EJECUTAR APP ====================
new App();

// ==================== SERVICE WORKER (PWA Ready) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registrado'))
            .catch(err => console.log('SW no soportado:', err));
    });
}

// Destellos dinámicos
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
  sparkle.style.animationDelay = Math.random() * 2 + 's';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 5000);
}
setInterval(createSparkle, 300);

// Formulario
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  alert(`¡Gracias ${name}! Hemos recibido tu consulta y nos pondremos en contacto contigo pronto.`);
  this.reset();
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});
