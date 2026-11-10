/* ==========================================
   RETOS DE JAVASCRIPT - POMODORO & TAREAS
   ==========================================
   1. Temporizador:
      - Crea variables para minutos (25), segundos (0) y el ID del intervalo (setInterval).
      - Al pulsar #btn-iniciar, resta 1 segundo cada 1000ms y actualiza el DOM (usa .padStart(2, '0') para el formato '05').
      - Evita que se creen múltiples intervalos si el usuario pulsa "Iniciar" varias veces seguidas.
      - Implementa #btn-pausar (clearInterval) y #btn-reiniciar.
      - Al cambiar entre #modo-trabajo y #modo-descanso, lee el atributo 'data-tiempo' y actualiza el reloj.
   2. Lista de Tareas:
      - Escucha el evento 'submit' de #form-tarea (recuerda usar event.preventDefault()).
      - Añade tareas a la lista con botones para marcar como completada (toggle de clase CSS) y eliminar.
*/

// Escribe tu código aquí
const spanMinutos = document.getElementById('minutos');
const spanSegundos = document.getElementById('segundos');
const btniniciar = document.getElementById('boton-iniciar');
const btnpausar = document.getElementById('boton-pausar');
const btnreiniciar = document.getElementById('boton-reiniciar');
const btnTrabajo = document.getElementById('modo-trabajo');
const btnDescanso = document.getElementById('modo-descanso');

let minutos = 25;
let segundos = 0;
let intervalo = setInterval;

function actualizarDisplay(){
   spanMinutos.textContent = String(minutos).padStart(2, '0');
   spanSegundos.textContent = String(segundos).padStart(2, '0');
}
