
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
