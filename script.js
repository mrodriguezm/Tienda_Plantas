const container = document.getElementById("productos_container");

let productosCarrito = [];

function getPlantas() {
  productos.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.className = "producto";

    // Añadir atributos data-* al div del producto
    productoDiv.dataset.nombre = producto.nombre;
    productoDiv.dataset.imagen = producto.imagen;
    productoDiv.dataset.descripcion = producto.descripcion;
    productoDiv.dataset.precio = producto.precio;
    productoDiv.dataset.stock = producto.stock;
    productoDiv.innerHTML = `
        <h2>${producto.nombre}</h2>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p class="descripcion-planta">${producto.descripcion}</p>
        <p class="precio-planta">${producto.precio}€</p>
        <button class="btnPlanta">Añadir al carrito</button>
    `;
    container.appendChild(productoDiv);
  });
}

function abrirCarrito() {
  const carrito = document.querySelector("#btncarrito");

  carrito.addEventListener("click", function () {
    const carritoDiv = document.querySelector(".carrito");
    if (carritoDiv.classList.contains("hidden")) {
      carritoDiv.classList.remove("hidden");
    }
    carritoDiv.innerHTML = `
    <div class="cabecera-carrito">
    <div class="cerrarbtn"><button id="toggleX">X</button></div>
    <h2>Carrito</h2> 
    </div>
    <div id="listaCarrito"></div>

    `;

    document.body.appendChild(carritoDiv);

    const toggleX = document.getElementById("toggleX");
    toggleX.addEventListener("click", cerrarCarrito);

    tablaCarrito();
  });

  
}

function cerrarCarrito() {
  const carrito = document.querySelector(".carrito");
  carrito.classList.toggle("hidden");
}

function anadirPlanta() {
  const $btnPlanta = document.querySelectorAll(".btnPlanta");

  let cantidad=0;
  $btnPlanta.forEach(($btn) => {
    $btn.addEventListener("click", function () {
      const productoDiv = $btn.closest(".producto");

      let nombre = productoDiv.dataset.nombre;
      let imagen = productoDiv.dataset.imagen;
      let descripcion = productoDiv.dataset.descripcion;
      let precio = parseInt(productoDiv.dataset.precio);
      let stock = parseInt(productoDiv.dataset.stock);


      const existPlanta=productosCarrito.find(item=>item.name===nombre);

      if(existPlanta){
        if(existPlanta.cantidad==existPlanta.stock){
          alert("No hay mas stock disponible "+existPlanta.name);
        }else{
          existPlanta.cantidad+=1;
        }
       
        
      }else{

      const infoPlanta = {
        name: nombre,
        precio: precio,
        cantidad: 1,
        stock:stock
      };

    
      productosCarrito.push(infoPlanta);
    }
      tablaCarrito();
    
    });
  
  });

}

function tablaCarrito() {
  
  const $ventanaCarrito=document.getElementById("listaCarrito");
  $ventanaCarrito.innerHTML="";

  if(productosCarrito.length===0){
    let $txtTabla=document.createElement("p");
  $txtTabla.innerText="No hay nada en el carrito";

  $ventanaCarrito.appendChild($txtTabla);

  }else{
    const $tabla = document.createElement("table");
    const $header = document.createElement("thead");
    const $headerRow = document.createElement("tr");

    const encabezados = ["Planta", "Precio", "Cantidad"];
    encabezados.forEach(encabezado => {
      const $th = document.createElement("th");
      $th.innerText = encabezado;
      $headerRow.appendChild($th);
    });
    $header.appendChild($headerRow);
    $tabla.appendChild($header);

    const $cuerpo = document.createElement("tbody");

    let total=0;

    productosCarrito.forEach(element => {
        

      const $fila = document.createElement("tr");
      
      const $tdNombre = document.createElement("td");
      $tdNombre.innerText = element.name;
      $fila.appendChild($tdNombre);

      const $tdPrecio = document.createElement("td");
      $tdPrecio.innerText = `${element.precio*element.cantidad}€`;
      $fila.appendChild($tdPrecio);

      const $tdCantidad = document.createElement("td");
      $tdCantidad.innerText=`${element.cantidad}`;
      $fila.appendChild($tdCantidad);

      const $tdSumar=document.createElement("td");
      const $btnSumar = document.createElement("button");
      $btnSumar.classList.add("btnComprar");
      $btnSumar.innerText = "+";
      $btnSumar.addEventListener("click", () => {
        if(element.cantidad==element.stock){
          alert('No hay mas stock de '+element.name);
        }else{
          element.cantidad++;
        }
        tablaCarrito(); 
      });
      $tdSumar.appendChild($btnSumar);
      $fila.appendChild($tdSumar);

      const $tdRestar=document.createElement("td");
      const $btnRestar = document.createElement("button");
      $btnRestar.classList.add("btnVaciar");
      $btnRestar.innerText = "-";
      $btnRestar.addEventListener("click", ()=> {
        if(element.cantidad==1){
          productosCarrito=productosCarrito.filter(item=>item.name!==element.name);
          
        }else{
          element.cantidad--;
          
        }
        tablaCarrito();
      });
      
      $tdRestar.appendChild($btnRestar);
      $fila.appendChild($tdRestar);

      $cuerpo.appendChild($fila);

      total+=element.precio*element.cantidad;
      
    });

    $tabla.appendChild($cuerpo);
    $ventanaCarrito.appendChild($tabla);

    let $txtTotal=document.createElement("p");
    $txtTotal.innerHTML=`<p><b>Total compra:${total}€</b></p>`;

    let $divComprar=document.createElement("div");
    $divComprar.classList.add("style-btn");
    let $btnComprar=document.createElement("button");
    $btnComprar.classList.add("btnComprar");
    $btnComprar.innerText="Realizar Compra";
    $btnComprar.addEventListener("click", () => {
      alert("Compra realizada- Total a pagar: "+total+" €");
      productosCarrito.splice(0);
      location.reload();
    });

    let $btnVaciar=document.createElement("button");
    $btnVaciar.classList.add("btnVaciar");
    $btnVaciar.innerText="Vaciar carrito";
    $btnVaciar.addEventListener("click", () =>{
      productosCarrito.splice(0);
      tablaCarrito();
    });
    
    $divComprar.appendChild($btnComprar);
    $divComprar.appendChild($btnVaciar);

    $ventanaCarrito.appendChild($txtTotal);
    $ventanaCarrito.appendChild($divComprar);

  }

  

}

function burguer(){

  let $btnBurguer=document.getElementById("hamburger");
  let $menu=document.querySelector(".navbar-mobile");

  $btnBurguer.addEventListener("click", () =>{
    $menu.classList.toggle('active');
  });

}

getPlantas();
abrirCarrito();
anadirPlanta();
burguer();