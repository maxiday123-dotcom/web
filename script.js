/* CURSOR */

const cursor=document.querySelector(".cursor")

document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"
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
