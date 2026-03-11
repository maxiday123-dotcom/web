/* CURSOR */

const cursor=document.querySelector(".cursor")

document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"
})

const hoverElements = document.querySelectorAll("a, button, .card")

hoverElements.forEach(el=>{

el.addEventListener("mouseenter",()=>{
cursor.classList.add("active")
})

el.addEventListener("mouseleave",()=>{
cursor.classList.remove("active")
})

})

/* HEADER */

window.addEventListener("scroll",()=>{
document.querySelector(".main-header")
.classList.toggle("scrolled",window.scrollY>60)
})

/* PARTICLES */

tsParticles.load("particles",{
particles:{
number:{value:60},
color:{value:"#a855f7"},
links:{enable:true,color:"#7e22ce"},
move:{enable:true,speed:1},
size:{value:2}
}
})

/* GSAP */

gsap.registerPlugin(ScrollTrigger)

gsap.from(".hero h1",{
y:100,
opacity:0,
duration:1.5,
ease:"power3.out"
})

gsap.from(".cta-btn",{
y:40,
opacity:0,
delay:.6,
duration:1
})

gsap.utils.toArray(".card, .project, .price-card").forEach(el=>{
gsap.from(el,{
scrollTrigger:{
trigger:el,
start:"top 85%"
},
y:70,
opacity:0,
duration:1.1,
ease:"power2.out"
})
})

const cards = document.querySelectorAll(".card")

cards.forEach(card => {

card.addEventListener("mousemove", e => {

const rect = card.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const centerX = rect.width / 2
const centerY = rect.height / 2

const rotateX = -(y - centerY) / 15
const rotateY = (x - centerX) / 15

card.style.transform =
`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`

})

card.addEventListener("mouseleave", () => {

card.style.transform =
"perspective(900px) rotateX(0) rotateY(0) scale(1)"

})

})

/* SCROLL SUAVE */

const lenis = new Lenis({

duration:1.2,
smooth:true,

})

function raf(time) {

lenis.raf(time)

requestAnimationFrame(raf)

}

requestAnimationFrame(raf)
