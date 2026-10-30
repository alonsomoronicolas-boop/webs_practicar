// ==========================================================================
// LÓGICA DE JAVASCRIPT (script.js)
// Escribe aquí tu código para seleccionar el DOM, escuchar eventos y calcular.
// ==========================================================================
const inputCuenta = document.querySelector('#input-cuenta');
const inputPropinaCustom = document.querySelector('#input-propina-custom');
const inputPersonas = document.querySelector('#input-personas');
const msjError= document.querySelector('#mensaje-error');
const resultadoPropina = document.querySelector('#resultado-propina');
const total = document.querySelector('#resultado-total');
const global = document.querySelector('#resultado-cuenta-global');
const reset = document.querySelector('#btn-reset');
const botonesPropina = document.querySelectorAll('.btn-propina');

let cuenta = 0;
let porcentajePropina = 0;
let personas = 1;

function calcular() {
    if (personas >= 1 && cuenta >= 0) {
        const propina = (cuenta * porcentajePropina) / 100;
        const cuentaglobal = cuenta + propina;
        const propinaPorPersona = propina / personas;
        const totalPorPersona = cuentaglobal / personas;

        resultadoPropina.textContent = propinaPorPersona.toFixed(2) + '€';
        total.textContent = totalPorPersona.toFixed(2) + '€';
        global.textContent = cuentaglobal.toFixed(2) + '€';
    }
}

inputCuenta.addEventListener('input', () => {
    cuenta = parseFloat(inputCuenta.value) || 0;
    calcular();
})

botonesPropina.forEach((boton) => {
    boton.addEventListener('click', () => {
        botonesPropina.forEach((btn) => {
            btn.classList.remove('activo');
        });
        boton.classList.add('activo');
        inputPropinaCustom.value = '';
        porcentajePropina = parseFloat(boton.dataset.propina);
        calcular();
    })
})

inputPropinaCustom.addEventListener('input', () => {
    botonesPropina.forEach((btn) => {
        btn.classList.remove('activo');
    });
    porcentajePropina = parseFloat(inputPropinaCustom.value) || 0;
    calcular();
});

inputPersonas.addEventListener('input', () => {
    const valorPersonas = parseInt(inputPersonas.value);
    if (!valorPersonas || valorPersonas <= 0) {
        msjError.classList.remove('error-oculto');
        inputPersonas.style.borderColor = 'red';
    }else{
        msjError.classList.add('error-oculto');
        inputPersonas.style.borderColor = '';
        personas = valorPersonas;
        calcular();
    }
})

reset.addEventListener('click', () => {
    cuenta = 0;
    porcentajePropina = 0;
    personas = 1;
    inputCuenta.value = '';
    inputPropinaCustom.value = '';
    inputPersonas.value = '1';
    botonesPropina.forEach((btn) => {
        btn.classList.remove('activo');
    });
    msjError.classList.add('error-oculto');
    calcular();
})