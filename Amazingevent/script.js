let fechaBase
var eventos = []
var inputSearch = document.getElementById("inputSearch")
var arrayFilter = []
var search = ""
var textonav = document.getElementById("textonav")

async function inicioData() {
    let data

    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => data = json)

    eventos = data.eventos
    fechaBase = data.fechaActual

    rutas()

    display(eventos)

}
inicioData()

//capturando el id de la seccion a la que se hace click en el menu de navegacion//

var buttonNav = document.getElementsByClassName("nav"); //captura elementos con class nav//
for (var i = 0; i < buttonNav.length; i++) {
    const element = buttonNav[i];
 element.addEventListener("click", function (e) { //recorre y agrega el evento click//

        navegacion(e.target.id);

    })
}


//esta funcion evalua a que seccion corresponde el id capturado//

function navegacion(id) {

    switch (id) {

        case "upcoming":
            let eventosFuturos = eventos.filter(evento => evento.date > fechaBase)
            display(eventosFuturos)
            filtrarCheckbox(eventosFuturos)
            arrayFilter = (eventosFuturos)
            textonav.innerHTML = "Eventos Futuros"
            break;

        case "past":
            let eventosPasados = eventos.filter(evento => evento.date < fechaBase)
            display(eventosPasados)
            filtrarCheckbox(eventosPasados)
            arrayFilter = (eventosPasados)
            textonav.innerHTML = "Eventos Pasados"
            break;

        
        default:
            display(eventos)
            filtrarCheckbox(eventos)
            arrayFilter = (eventos)
            textonav.innerHTML = "Inicio"
            break;


    }
}



//filtro cartas//

function display(array) {

    var html = ""; //string vacio//

    for (var i = 0; i < array.length; i++) {
        html += `
        <div class="grid-element">
        <img src="${array[i].image}"alt="${array[i].name}" />
        <p class="fiesta">${array[i].name}</p>
        <p class="titlecard">
          ${array[i].description}
        </p>
        <a href="./details.html?id=${array[i].id}"><button class="vermas">Ver mas</button></a>
        <p>$${array[i].price}</p>
      </div>
      `


    }
    document.getElementById("loseventos").innerHTML = html;
}

//esta es la navegacion de home, pasado y futuro//


var time = location.search.split("?time=")

function rutas() {

    switch (time[1]) {
        case "upcoming": navegacion("upcoming")
            break;

        case "past": navegacion("past")
            break;

        default: navegacion("home")

    }
}



//filtro checkbox//

function filtrarCheckbox(array) {
    var categories = array.map(evento => evento.category)


    var categoriesunic = new Set(categories)


    var categorieslist = [...categoriesunic]

    var categoriesEvents = ""
    categorieslist.map(category =>
        categoriesEvents +=
        `<label><input type="checkbox" value="${category}">${category}
        </label>
        `
    )
    document.getElementById("categoriaevento").innerHTML = categoriesEvents
    checkboxListener()

}

//filtros combinados//

function checkboxListener() {
    //escucha y guarda los Checbox
    // Por un selectorAll capturo las etiquetas input de tipo checkbox
    var checkboxs = document.querySelectorAll('input[type=checkbox')
    // creo un array vacio para poder guardar los datos de los checkbox con condicion checked true
    // recorro cada uno de los input checkbox y les aplico un escuchador de eventos change
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener("change", function () {
            // limpio el array donde voy a guardar los input con checked true ya que utilizo un metodo push
            // caso contrario se van a agregar mas eventos
            checkedCheckboxes = []
            // recorro el array de checkbox para extrer aquellos cuyo atributo checked sea true
            for (i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].checked) {
                    // si se cumple la condicion de checked true los empujo al array que defini para almacenar
                    // los checkbox chequeados
                    checkedCheckboxes.push(checkboxs[i].value)
                }
            }
            
            filtrosCombinados()
        })
    }
}
function filtrosCombinados() {
    var filtrado = []
    if (search !== "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category => filtrado.push(...arrayFilter.filter(evento =>
            evento.name.toLowerCase().includes(search) && evento.category === category)
        ))

    }
    else if (search !== "" && checkedCheckboxes.length == 0) {
        filtrado = arrayFilter.filter(evento => evento.name.toLowerCase().includes(search))

    }
    else if (search === "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category =>
            filtrado.push(...arrayFilter.filter(evento => evento.category === category))
        )
    }
    else {
        filtrado = arrayFilter

    }
    filtrado.length > 0 ?
        display(filtrado) :
        ulNombreEventos.innerHTML = `<h1 class="ceroResult" >No se encontraron eventos para tu busqueda </h1>`
}

//filtrado search//




inputSearch.addEventListener("keyup", function (evento) {

    //capturo lo que el usario ingrese en el input//
    var datoInput = evento.target.value
    //Aplico un filtro a todos los eventos donde el nombre del eventoincluye lo que ingreso el usario con los metodos trim y tolowerCase

    var eventsFilter = arrayFilter.filter(evento => evento.name.trim().toLowerCase().includes(datoInput.trim().toLowerCase()))

    display(eventsFilter)
})










