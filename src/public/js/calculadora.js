import { guardarFuncion, obtenerFunciones } from "./firebase.js";
const inputFuncion = document.getElementById('funcion');
const div = document.getElementById('mostrarFuncion');
const CanvasGrafica = document.getElementById("grafica");
const funcionForm = document.getElementById('funcion-form');
const btnGuardar = document.getElementById('btnGuardar')
const lista = document.getElementById('funcion-container');


window.addEventListener("DOMContentLoaded", async (e) => {
    lista.innerHTML = "";
    await obtenerFunciones((querySnapshot) => {
        querySnapshot.forEach(element => {
            console.log(element.data());
            let funcion = element.data();
            lista.innerHTML += `
            <ul class="list-group">
            <li class="list-group-item">${funcion.expresion}</li>
          </ul>
            `
        });
    })
})

inputFuncion.addEventListener('change', e => {
    if (e.target.value != null && e.target.value !== "") {
        div.innerHTML = `
        <p class="form-control mt-4 text-center rounded">${e.target.value}</p>`
    } else {
        div.innerHTML = "";
    }
});

const graficar = (canva, x, y, expresion) => {
    return new Chart(canva, {
        type: 'line',
        data: {
            labels: x,
            datasets: [
                {
                    label: expresion,
                    data: y,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.5,
                },
            ],
        }
    });
}


funcionForm.addEventListener('submit', e => {
    e.preventDefault()

    if (inputFuncion.value == "" || inputFuncion.value == undefined) {
        alert('ingrese datos!')
        return;
    }

    if (inputFuncion.value !== '') {
        const expresion = inputFuncion.value;
        // Crea un arreglo de valores de x en un rango específico
        const valoresX = [];
        const valoresY = [];

        for (let x = -10; x <= 10; x += 0.1) {
            valoresX.push(x);
            const scope = { x }; // Define el valor de x en el alcance de la expresión
            const resultado = math.evaluate(expresion, scope);
            valoresY.push(resultado);
        };

        let grafica = graficar(CanvasGrafica.getContext("2d"), valoresX, valoresY, expresion)
        funcionForm.addEventListener('click', e => {
            grafica.destroy();
        });

        console.log(valoresY[0]);
    } else {
        alert('No ha digitado ninguna funcion')
        inputFuncion.focus();
    }
});

btnGuardar.addEventListener('click', async (e) => {
    btnGuardar.innerHTML = `
    <i class="fa-solid fa-spinner fa-beat-fade"></i>
    `
    if (inputFuncion.value == "" || inputFuncion.value == undefined) {
        alert('ingrese datos!')
        return;
    } else {
        let value = inputFuncion.value;
        try {
            const result = await guardarFuncion(value)
            console.log(result);
            alert('dato guardado');
            btnGuardar.innerHTML = `<i class='fa-solid fa-floppy-disk'></i>
            Guardar`
        } catch (error) {
            console.log(error);
        }
    }
})