//Variables
const baseDeDatos = [
    {
        nombre: 'Cine',
        anyo: 2021,
        categoria: 'APP',
        imagen: 'img/image-rect-1.jpg',
        descripcion: '¿Buscas un cine en España?'
    },
    {
        nombre: 'Música',
        anyo: 2021,
        categoria: 'Web',
        imagen: 'img/image-rect-2.jpg',
        descripcion: 'Visita el canal de YouTube Music para descubrir a los mejores'
    },
    {
        nombre: 'Lectura',
        anyo: 2019,
        categoria: 'APP',
        imagen: 'img/image-rect-3.jpg',
        descripcion: 'Te explicamos qué es la lectura, su historia y beneficios'
    },
    {
        nombre: 'Botánica',
        anyo: 2017,
        categoria: 'Web',
        imagen: 'img/image-rect-4.jpg',
        descripcion: 'Razones para querer saber de botánica'
    },
    {
        nombre: 'Historia',
        anyo: 2016,
        categoria: 'Web',
        imagen: 'img/image-rect-5.jpg',
        descripcion: 'Todas las noticias sobre Historia publicadas en EL PAÍS'
    },
    {
        nombre: 'Idiomas',
        anyo: 2015,
        categoria: 'APP',
        imagen: 'img/image-rect-6.jpg',
        descripcion: 'AIP es una academia de idiomas en Valencia con clases para todos'
    }
];

const textoTodos = 'Todos';
const buscador = document.querySelector ('#buscador');
const botonFiltro = document.querySelector ('#boton-filtro');
const trabajos = document.querySelector ('#trabajos');
const plantillaBotonFiltro = document.querySelector('#plantillaBotonFiltro').content.firstElementChild;
const plantillaTrabajo = document.querySelector('#plantillaTrabajo').content.firstElementChild;
let baseDeDatosFiltrados = [];


//Funciones
function buscar() {
    //Filtramos
    baseDeDatosFiltrados = baseDeDatos.filter(function (trabajo) {
        return trabajo.nombre.toUpperCase().includes(buscador.value.toUpperCase()) || buscador.value === '';
    });
    //Actualizamos
    render();
}

function filtrarCategoria(nombre) {
    //Filtramos
    if (nombre != textoTodos) {
        baseDeDatosFiltrados = baseDeDatos.filter(function (trabajo) {
            return trabajo.categoria === nombre;

        });
    } else {
        baseDeDatosFiltrados = baseDeDatos;
    }
    //Actualizamos
    render();
}

function render() {
    //Dibujamos los botones
    let categorias = [];
    baseDeDatos.forEach(function (elemento) {
        if (!categorias.includes(elemento.categoria)) {
        categorias = categorias.concat(elemento.categoria);
        }
});
    //Anado el boton de Todos
    categorias = categorias.concat('Todos');
    //Le cambio el orden para que aparezca el primero
    categoriasInversa = categorias.reverse();

    //Vaciamos botones anteriores
    botonFiltro.innerHTML = '';

    //Generamos los botones
    categorias.forEach(function(nombre) {
        const miBoton = plantillaBotonFiltro.cloneNode(true);
        miBoton. textContent = nombre;
        miBoton.addEventListener('click', function () {
            filtrarCategoria(nombre);
        });
        botonFiltro.appendChild(miBoton);
});
    //Borramos el HTML anterior de los trabajos antes de mostrarlo
    trabajos.innerHTML = '';
    //Dibujamos los trabajos
    baseDeDatosFiltrados.forEach(function (trabajo) {
        const miTrabajo = plantillaTrabajo.cloneNode(true);
        //Titulo
        const miTitulo = miTrabajo.querySelector('.trabajo__titulo');
        miTitulo.textContent = trabajo.nombre;
        //Imagen
        const miImagen = miTrabajo.querySelector('.trabajo__imagen');
        miImagen.setAttribute('alt', trabajo.nombre);
        miImagen.setAttribute('src', trabajo.imagen);

        //Categoria
        const miCategoria = miTrabajo.querySelector('.trabajo__categoria');
        miCategoria.textContent = trabajo.categoria;

        //Descripcion
        const miDescripcion = miTrabajo.querySelector('.trabajo__descripcion');
        miDescripcion.textContent = trabajo.descripcion;

        //Anyado miTrabajo a trabajos
        trabajos.appendChild(miTrabajo);
    });
}

//Eventos
buscador.addEventListener('input', buscar);

//Inicio
buscar();