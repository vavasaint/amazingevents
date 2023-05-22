async function inicioData(){
  let data   
 
  await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
    .then(response => response.json())
    .then(json => data = json)

eventos = data.eventos

var id = location.search.split("?id=").filter(Number)

var selectId = id[0]
var eventoDetails = [];

eventoDetails.push(...eventos.filter(evento =>evento.id==selectId))

contentdetails(eventoDetails)

}
inicioData() 
 

function contentdetails(eventoDetails){

  

var contenidoDetalle =document.getElementById("eventsdetails")

contenidoDetalle.innerHTML =

`<div class= "grid-contain">   
 <div class="grid-elementos">
 <p class="date">Fecha:${eventoDetails[0].date}</p>
 <img src="${eventoDetails[0].image}" alt="${eventoDetails[0].name}">
 <p class="price">Entradas:$${eventoDetails[0].price}</p>

 </div>
<div class="contenidos">
 <p class="fiestacol">${eventoDetails[0].name}</p>
 <p class="descrip">
 ${eventoDetails[0].description}
</p>
 <div class="details">
<div class="detalles1">  <p> categoria:${eventoDetails[0].category}</p>
</br>
 <p>place:${eventoDetails[0].place}</p>
</div>
 <div class="detalles">
 <p>capacity:${eventoDetails[0].capacity}</p>
 </br>
<p>assistance:${eventoDetails[0].assistance}</p>
</div>
 </div>
</div>
 </div>`
}

 

 var buttonNav = document.getElementsByClassName("nav")
 for (var i = 0; i < buttonNav.length; i++) {
  const botones = buttonNav[i];
   botones.addEventListener("click", function (e) {
          navegacion(e.target.id)
   })
  }

 
















