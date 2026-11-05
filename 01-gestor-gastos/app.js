/* ==========================================
   RETOS DE JAVASCRIPT - GESTOR DE GASTOS
   ==========================================
   1. Captura los elementos del DOM (inputs, botones, textos de resumen y la lista <ul>).
   2. Crea variables de estado para almacenar el presupuesto total y un array de gastos.
   3. Al pulsar #btn-definir:
      - Valida que el número sea mayor que 0.
      - Actualiza el texto de #presupuesto-total y recalcula el #saldo-restante.
   4. Al pulsar #btn-agregar:
      - Valida que el concepto no esté vacío y la cantidad sea positiva.
      - Crea un nuevo elemento <li> con el concepto, categoría, precio y un botón "Eliminar".
      - Súmalo al gasto acumulado y descuéntalo del saldo restante.
   5. Si el saldo restante baja de 0, añade una clase CSS para mostrar el texto en rojo.
*/

// Escribe tu código aquí
const presupuestoTotal = document.querySelector('#presupuesto-total');
const gastoTotal = document.querySelector('#gasto-total');
const saldoRestante = document.querySelector('#saldo-restante');
const inputPresupuesto = document.querySelector('#input-presupuesto');
const inputConcepto = document.querySelector('#input-concepto');
const inputCantidad = document.querySelector('#input-cantidad');
const btnDefinir = document.querySelector('#btn-definir');
const categoria = document.querySelector('#select-categoria');
const btnAgregar = document.querySelector('#btn-agregar');
const mensajeError = document.querySelector('#mensaje-error');
const listaGastos = document.querySelector('#lista-gastos');

let presupuestoInicial = 0;
let gastoAcumulado = 0;
let saldoFaltante = 0;

btnDefinir.addEventListener('click', () => {
    const valorPresupuesto = parseFloat(inputPresupuesto.value);

    if (!isNaN(valorPresupuesto) && valorPresupuesto > 0) {
        presupuestoInicial = valorPresupuesto;
        actualizarPantalla();
    }
});

btnAgregar.addEventListener('click', () => {
    const concepto = inputConcepto.value.trim();
    const cantidad = parseFloat(inputCantidad.value);
    const categoriaElegida = categoria.value;

    if (concepto !== '' && !isNaN(cantidad) && cantidad > 0) {
        mensajeError.textContent = '';

        const nuevoGasto = document.createElement('li');
        nuevoGasto.textContent = `${concepto} (${categoriaElegida}) - ${cantidad.toFixed(2)} € `;

        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = 'Eliminar';

        btnBorrar.addEventListener('click', () => {
            nuevoGasto.remove();
            gastoAcumulado = gastoAcumulado - cantidad;
            actualizarPantalla();
        });

        nuevoGasto.appendChild(btnBorrar);
        listaGastos.appendChild(nuevoGasto);

        gastoAcumulado = gastoAcumulado + cantidad;
        actualizarPantalla();

        inputConcepto.value = '';
        inputCantidad.value = '';
    } else {
        // Si no entra en el if, ahora te avisará en pantalla de por qué es:
        mensajeError.textContent = '⚠️ Escribe un concepto y una cantidad mayor que 0.';
    }
});

function actualizarPantalla() {
    saldoFaltante = presupuestoInicial - gastoAcumulado;

    presupuestoTotal.textContent = presupuestoInicial.toFixed(2) + ' €';
    gastoTotal.textContent = gastoAcumulado.toFixed(2) + ' €';
    saldoRestante.textContent = saldoFaltante.toFixed(2) + ' €';

    if (saldoFaltante < 0) {
        saldoRestante.classList.add('alerta-roja');
    } else {
        saldoRestante.classList.remove('alerta-roja');
    }
}