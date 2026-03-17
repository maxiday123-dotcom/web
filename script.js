
*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
background:#0b0b0f;
color:white;
font-family:'Montserrat',sans-serif;
}


/* CONTENEDOR */

.container{
max-width:1200px;
margin:auto;
padding:80px 20px;
}


/* TITULO */

.section-title{
text-align:center;
font-size:36px;
margin-bottom:50px;
font-weight:800;
}


/* GRID */

.services-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:30px;
}


/* CARD */

.card{
background:#121218;
border-radius:16px;
padding:25px;
text-align:center;
transition:.3s;
}

.card:hover{
transform:translateY(-6px);
box-shadow:0 20px 40px rgba(0,0,0,0.4);
}


/* IMAGEN */

.card img{
width:100%;
height:160px;
object-fit:cover;
border-radius:12px;
margin-bottom:20px;
}


/* TITULO */

.card h3{
margin-bottom:10px;
font-size:20px;
}


/* TEXTO */

.card p{
font-size:14px;
opacity:.8;
margin-bottom:20px;
}


/* BOTON */

.btn{
display:inline-block;
padding:10px 18px;
border-radius:30px;
text-decoration:none;
background:linear-gradient(90deg,#a855f7,#7e22ce);
color:white;
font-weight:600;
font-size:14px;
transition:.3s;
}

.btn:hover{
transform:scale(1.05);
}


/* CONTACTO */

.contacto{
padding:100px 20px;
text-align:center;
}

.formulario{
max-width:500px;
margin:auto;
display:flex;
flex-direction:column;
gap:15px;
margin-top:30px;
}

.formulario input,
.formulario textarea{
padding:12px;
border:none;
border-radius:8px;
background:#1a1a22;
color:white;
}

.formulario button{
padding:12px;
border:none;
border-radius:30px;
background:#a855f7;
color:white;
font-weight:600;
cursor:pointer;
}


/* WHATSAPP */

.whatsapp-btn{
display:inline-block;
margin-top:30px;
padding:12px 22px;
border-radius:30px;
background:#25D366;
color:white;
text-decoration:none;
font-weight:600;
}
