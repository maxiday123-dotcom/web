
// Cursor personalizado
const cursor = document.querySelector(".cursor");
if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(0.8)";
  });
  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(1)";
  });
}

// Glow que sigue el cursor
const glow = document.querySelector(".glow");
if (glow) {
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// tsParticles (comprobación y configuración)
if (window.tsParticles) {
  tsParticles.load("particles", {
    fullScreen: { enable: false },
    particles: {
      number: { value: 60 },
      color: { value: "#a855f7" },
      links: { enable: true, color: "#7e22ce", distance: 120, opacity: 0.15 },
      move: { enable: true, speed: 1 },
      size: { value: 2 },
      opacity: { value: 0.8 }
    },
    detectRetina: true
  }).catch((err) => console.warn("tsParticles:", err));
}

// GSAP animaciones
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero h1", { y: 80, opacity: 0, duration: 1.2, ease: "power3.out" });
  gsap.from(".cta-btn", { y: 30, opacity: 0, delay: 0.6, duration: 0.9, ease: "power3.out" });

  gsap.utils.toArray(".card").forEach((card, i) => {
    gsap.from(card, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.12 * i,
      ease: "power3.out",
      scrollTrigger: { trigger: card, start: "top 85%" }
    });
  });
}

// Efecto 3D en cards
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  });
});

// Lenis smooth scroll
if (window.Lenis) {
  const lenis = new Lenis({ duration: 1.2, smooth: true });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}

// Header scrolled class
window.addEventListener("scroll", () => {
  const header = document.querySelector(".main-header");
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 60);
});
