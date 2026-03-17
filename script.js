const cursor=document.querySelector(".cursor")

document.addEventListener("mousemove",e=>{
cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"
})

window.addEventListener("scroll",()=>{
document.querySelector(".main-header")
.classList.toggle("scrolled",window.scrollY>60)
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

gsap.from(".hero h1",{y:80,opacity:0,duration:1.4})

gsap.utils.toArray(".card, .project, .price-card").forEach(el=>{
gsap.from(el,{
scrollTrigger:{
trigger:el,
start:"top 85%"
},
y:60,
opacity:0,
duration:1
})
})
