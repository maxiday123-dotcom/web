
// ============================
// Cursor personalizado
// ============================

const cursor = document.querySelector(".cursor");

if (cursor) {
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
    requestAnimationFrame(updateCursor);
  }

  updateCursor();

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(0.8)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(1)";
  });
}


// ============================
// Glow que sigue el cursor
// ============================

const glow = document.querySelector(".glow");

if (glow) {
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}


// ============================
// tsParticles
// ============================

if (window.tsParticles) {

  tsParticles.load("particles", {

    fullScreen: { enable: false },

    particles: {

      number: { value: 60 },

      color: { value: "#a855f7" },

      links: {
        enable: true,
        color: "#7e22ce",
        distance: 120,
        opacity: 0.15
      },

      move: {
        enable: true,
        speed: 1
      },

      size: { value: 2 },

      opacity: { value: 0.8 }

    },

    detectRetina: true

  }).catch((err) => console.warn("tsParticles:", err));

}


// ============================
// GSAP Animaciones
// ============================

if (window.gsap) {

  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero h1", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  });

  gsap.from(".cta-btn", {
    y: 30,
    opacity: 0,
    delay: 0.6,
    duration: 0.9,
    ease: "power3.out"
  });

  gsap.utils.toArray(".card").forEach((card, i) => {

    gsap.from(card, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.12 * i,
      ease: "power3.out",

      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      }

    });

  });

}


// ============================
// Efecto 3D en cards
// ============================

document.querySelectorAll(".card").forEach((card) => {

  card.style.willChange = "transform";

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 14;
    const rotateY = (x - centerX) / 14;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transition = "transform 0.35s ease";

    card.style.transform =
      "perspective(900px) rotateX(0) rotateY(0) scale(1)";

  });

});


// ============================
// Lenis Smooth Scroll
// ============================

if (window.Lenis) {

  const lenis = new Lenis({
    duration: 1.2,
    smooth: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

}


// ============================
// Header scroll effect
// ============================

window.addEventListener("scroll", () => {

  const header = document.querySelector(".main-header");

  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 60);

});

// animación hover cards

document.querySelectorAll(".card").forEach(card => {

card.addEventListener("mouseenter", () => {

gsap.to(card.querySelectorAll(".fan-images img"),{
y:-8,
stagger:.06,
duration:.35,
ease:"power2.out"
})

})

card.addEventListener("mouseleave", () => {

gsap.to(card.querySelectorAll(".fan-images img"),{
y:0,
stagger:.05,
duration:.35,
ease:"power2.out"
})

})

})
