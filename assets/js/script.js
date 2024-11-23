let listasNombresGastos = [];
let listasValoressGastos = [];
let listasDescripcionesGastos = [];

function clickBoton() {
  const nombreGasto = document.getElementById("nombreGasto").value;
  const valorGasto = Number(document.getElementById("valorGasto").value);
  const descripcionGasto = document.getElementById("descripcionGasto").value;

  if (valorGasto > 150) {
    alert("⚠️ Advertencia: Has registrado un gasto mayor a $150.");
  }

  listasNombresGastos.push(nombreGasto);
  listasValoressGastos.push(valorGasto);
  listasDescripcionesGastos.push(descripcionGasto);

  actualizarListaDeGastos();
}

function actualizarListaDeGastos() {
  const listaElementos = document.getElementById("listaDeGastos");
  const totalElementos = document.getElementById("totalGastos");
  let htmlLista = "";
  let totalGastos = 0;

  listasNombresGastos.forEach((nombre, posicion) => {
    const valorGasto = listasValoressGastos[posicion];
    const descripcion = listasDescripcionesGastos[posicion];

    htmlLista += `
      <li>
        ${posicion + 1}. ${nombre} - USD ${valorGasto.toFixed(2)} <br>
        <small>${descripcion}</small>
        <button onclick="modificarGasto(${posicion})">Modificar</button>
        <button onclick="eliminarGasto(${posicion})">Eliminar</button>
      </li>`;
    totalGastos += valorGasto;
  });

  listaElementos.innerHTML = htmlLista;
  totalElementos.innerHTML = totalGastos.toFixed(2);

  limpiarCampos();
}

function limpiarCampos() {
  document.getElementById("nombreGasto").value = "";
  document.getElementById("valorGasto").value = "";
  document.getElementById("descripcionGasto").value = "";
}

function eliminarGasto(posicion) {
  listasNombresGastos.splice(posicion, 1);
  listasValoressGastos.splice(posicion, 1);
  listasDescripcionesGastos.splice(posicion, 1);
  actualizarListaDeGastos();
}

function modificarGasto(posicion) {
  const nuevoNombre = prompt(
    "Nuevo nombre del gasto:",
    listasNombresGastos[posicion]
  );
  const nuevoValor = parseFloat(
    prompt(
      "Nuevo valor del gasto:",
      listasValoressGastos[posicion]
    )
  );
  const nuevaDescripcion = prompt(
    "Nueva descripción:",
    listasDescripcionesGastos[posicion]
  );

  if (nuevoNombre && !isNaN(nuevoValor) && nuevaDescripcion !== null) {
    listasNombresGastos[posicion] = nuevoNombre;
    listasValoressGastos[posicion] = nuevoValor;
    listasDescripcionesGastos[posicion] = nuevaDescripcion;
    actualizarListaDeGastos();
  } else {
    alert("❌ Error: No se pudo modificar el gasto. Asegúrate de ingresar valores válidos.");
  }
}
