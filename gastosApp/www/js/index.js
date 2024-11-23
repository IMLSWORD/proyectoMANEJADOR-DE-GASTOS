// Función para guardar datos en localStorage
function guardarDatos() {
    const datosGastos = {
        nombres: listasNombresGastos,
        valores: listasValoressGastos,
        descripciones: listasDescripcionesGastos
    };
    localStorage.setItem("gastos", JSON.stringify(datosGastos));
}

// Función para cargar datos desde localStorage
function cargarDatos() {
    const datosGuardados = localStorage.getItem("gastos");
    if (datosGuardados) {
        const { nombres, valores, descripciones } = JSON.parse(datosGuardados);
        listasNombresGastos = nombres || [];
        listasValoressGastos = valores || [];
        listasDescripcionesGastos = descripciones || [];
        actualizarListaDeGastos();
    }
}

// Modifica las funciones existentes para incluir guardarDatos()
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
    guardarDatos(); // Guarda los datos tras agregar un nuevo gasto
}

function eliminarGasto(posicion) {
    listasNombresGastos.splice(posicion, 1);
    listasValoressGastos.splice(posicion, 1);
    listasDescripcionesGastos.splice(posicion, 1);
    actualizarListaDeGastos();
    guardarDatos(); // Guarda los datos tras eliminar un gasto
}

function modificarGasto(posicion) {
    const nuevoNombre = prompt(
        "Nuevo nombre del gasto:",
        listasNombresGastos[posicion]
    );
    const nuevoValor = parseFloat(
        prompt("Nuevo valor del gasto:", listasValoressGastos[posicion])
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
        guardarDatos(); // Guarda los datos tras modificar un gasto
    } else {
        alert("❌ Error: No se pudo modificar el gasto. Asegúrate de ingresar valores válidos.");
    }
}

// Cargar datos al inicio
window.onload = cargarDatos;
