const productos = [
    // Pijamas
    {
        id: "pijama-03",
        titulo: "Pijama 03",
        imagen: "./img/Pijamas/pijama003.webp",
        categoria: {
            nombre: "Pijama",
            id: "pijamas"
        },
        precio: 1000
    },
    {
        id: "pijama-04",
        titulo: "Pijama 04",
        imagen: "./img/Pijamas/pijama04.jpg",
        categoria: {
            nombre: "Pijama",
            id: "pijamas"
        },
        precio: 1000
    },


    // Lazos
    {
        id: "lazo-01",
        titulo: "Lazo 01",
        imagen: "./img/Lazos/lazo01.jpg",
        categoria: {
            nombre: "Lazos",
            id: "Lazos"
        },
        precio: 1000
    },
    {
        id: "lazo-02",
        titulo: "Lazo 02",
        imagen: "./img/Lazos/lazo02.webp",
        categoria: {
            nombre: "Lazos",
            id: "Lazos"
        },
        precio: 1000
    },
    {
        id: "lazo-03",
        titulo: "Lazo 03",
        imagen: "./img/Lazos/lazo03.webp",
        categoria: {
            nombre: "Lazos",
            id: "Lazos"
        },
        precio: 1000
    },
    {
        id: "lazo-04",
        titulo: "Lazo 04",
        imagen: "./img/Lazos/lazo04.webp",
        categoria: {
            nombre: "Lazos",
            id: "Lazos"
        },
        precio: 1000
    },

    // Escolar
    {
        id: "escolar-01",
        titulo: "Escolar 01",
        imagen: "./img/Escolar/escolar01.jpg",
        categoria: {
            nombre: "Escolar",
            id: "escolar"
        },
        precio: 1000
    },
    {
        id: "escolar-02",
        titulo: "Escolar 02",
        imagen: "./img/Escolar/escolar02.jpg",
        categoria: {
            nombre: "Escolar",
            id: "escolar"
        },
        precio: 1000
    },
    {
        id: "escolar-04",
        titulo: "Escolar 04",
        imagen: "./img/Escolar/escolar04.jpg",
        categoria: {
            nombre: "Escolar",
            id: "escolar"
        },
        precio: 1000
    },
    {
        id: "escolar-05",
        titulo: "Escolar 05",
        imagen: "./img/Escolar/escolar05.jpg",
        categoria: {
            nombre: "Escolar",
            id: "escolar"
        },
        precio: 1000
    },
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

// Cargar todos los productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    tituloPrincipal.innerText = "Todos los productos";
    cargarProductos(productos);
});
