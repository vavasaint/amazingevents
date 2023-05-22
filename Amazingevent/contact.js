var form = document.getElementById("form")

var saludoHtml = document.getElementById("saludo")

saludoHtml.style.display = "none"

form.innerHTML =


`<form class="form-contact" action="contacto">
            <label class="main-nombre"  id="name">Nombre:</label>
            <br />
            <input class="nombre" type="text"name="ingrese su nombre" /> 
            <br /><br />
            <label class="main-email" id="mail" >Email:</label>
            <br />
            <input class="main-mail" type="mail" name="ingrese su mail" /> 
            <br /><br />
            <label class="main-message" for="name" id="mensaje">Mensaje:</label>
            <br />
             <input class="main-mensaje" type="text" name="Deja un Mensaje" />
            <br /><br /> 
            <input class="submit" type="submit" value="Enviar" />
        </form>` 



var form = document.querySelector("form")
form.addEventListener("submit", function(event){
    event.preventDefault()
    contactForm(event)}) 
let eventForm;
function contactForm(event){
     event.preventDefault()
     eventForm ={
          name: event.target[0].value,
          mail: event.target[1].value,
          mensaje: event.target[2].value,
     }
         saludo(eventForm)


}
  function saludo(datos) {

    form.style.display = "none"
    saludoHtml.style.display = "flex"
    saludoHtml.innerHTML =
    `
    <h1>Gracias ${datos.name} por dejarnos tu comentario</h1>
    `
  }  

      

