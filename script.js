
const cursor=document.querySelector(".cursor")

document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"
})

tsParticles.load("particles",{
particles:{
number:{value:60},
color:{value:"#a855f7"},
links:{enable:true,color:"#7e22ce"},
move:{enable:true,speed:1},
size:{value:2}
}
})

gsap.registerPlugin(ScrollTrigger)

gsap.from(".hero h1",{
y:100,
opacity:0,
duration:1.5
})

gsap.from(".cta-btn",{
y:40,
opacity:0,
delay:.6
})

const cards = document.querySelectorAll(".card")

cards.forEach(card => {

card.addEventListener("mousemove", e => {

const rect = card.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const centerX = rect.width / 2
const centerY = rect.height / 2

const rotateX = -(y - centerY) / 12
const rotateY = (x - centerX) / 12

card.style.transform =
`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`

})

card.addEventListener("mouseleave", () => {

card.style.transform =
"perspective(800px) rotateX(0) rotateY(0) scale(1)"})

})

const glow = document.querySelector(".glow")

document.addEventListener("mousemove", e=>{
glow.style.left = e.clientX + "px"
glow.style.top = e.clientY + "px"
})

const lenis = new Lenis({
duration:1.2,
smooth:true
})

function raf(time){
lenis.raf(time)
requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

window.addEventListener("scroll",()=>{

const header=document.querySelector(".main-header")

header.classList.toggle(
"scrolled",
window.scrollY > 60
)

})
