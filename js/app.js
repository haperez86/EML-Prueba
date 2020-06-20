// Variables

const carrito = document.getElementById('carrito')
const cursos = document.getElementById('lista-cursos')
const listaCursos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

//Listener
cargarEventListeners()
function cargarEventListeners(){

    //Dispara cuando se preciona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso)

    // Cuando se elimina el curso del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Al Vaciar el Carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

    // Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}


//Funciones
//Funcionalidad

function comprarCurso(e){

    e.preventDefault()

    if(e.target.classList.contains('agregar-carrito'))
    {
        // Delegacion para agregar carrito
        const curso = e.target.parentElement.parentElement
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso)
    }
    
}

// Lee los datos del curso

function leerDatosCurso(curso){
    
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso)
}

//Muestra el curso seleccionado en el carrito

function insertarCarrito(curso){
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>
            "${curso.titulo}"
        </td>
        <td>
            "${curso.precio}"
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row)
    guardarCursoLocalStorage(curso)
}

//Elimina el curso del carrito en el Dom
function eliminarCurso(e){

    e.preventDefault()

    let curso,
        cursoId    
    if(e.target.classList.contains('borrar-curso')){

        e.target.parentElement.parentElement.remove()
        curso = e.target.parentElement.parentElement
        cursoId = curso.querySelector('a').getAttribute('data-id')
    }

    eliminarCursoLocalStorage(cursoId)
    
}   

//Elimina los cursos del carrito del Dom
function vaciarCarrito(){

    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild)
    }

    // Vaciar local storage

    VaciarLocalStorage()
    
    return false
}

// Almacena Cursos en el carrito al Local Storage

function guardarCursoLocalStorage(curso){
     let cursos
     // Toma el valor de un arreglo con datos de LS o vacio
     cursos = obtenerCursoLocalStorage()

     //el curso seleccionado se agrega al carrito
     cursos.push(curso)

     localStorage.setItem('cursos', JSON.stringify(cursos))
}

// Comprueba que haya elementos en el local Storage
function obtenerCursoLocalStorage(curso){
     let cursosLs

     //comprobamos si hay algo en localstorage
     if(localStorage.getItem('cursos') == null){
         cursosLs = []

     }else{
         cursosLs = JSON.parse(localStorage.getItem('cursos'))
     }

     return cursosLs
}

// Imprime los cursos de local Storage en el carrito

function leerLocalStorage(){
    let cursosLs

    cursosLs = obtenerCursoLocalStorage()

    cursosLs.forEach(function(curso){
        // construir el template
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>
                "${curso.titulo}"
            </td>
            <td>
                "${curso.precio}"
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row)
    })
}

// Eliminar curso por el id  en local storage

function eliminarCursoLocalStorage(curso){
    
    let cursosLs
    //Obtenemos el arreglo de cursos
    cursosLs = obtenerCursoLocalStorage()

    // Iteramos comparando el Id del curso borrado con el local storage
    cursosLs.forEach(function(cursoLs, index){

        if(cursoLs.id == curso){
            cursosLs.splice(index, 1)
        }
    })

    // Añadimos el arreglo actual a localstorage
    localStorage.setItem('cursos', JSON.stringify(cursosLs))
}

// Elimina todos los cursos de local storage

function VaciarLocalStorage(){
    localStorage.clear()
}