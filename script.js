const titulo = document.querySelector("#titulo");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
const inputCiudad = document.querySelector("#ciudad");
const selectPais = document.querySelector("#pais");
const errorContainer = document.querySelector("#errorContainer");

// Evento submit de formulario
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const ciudad = inputCiudad.value; 
  const pais = selectPais.value;

  if (ciudad.trim() === "" || pais === "") {
    añadirError();
  } else {
    imprimir(ciudad, pais);
    quitarError();
    inputCiudad.value = "";
  }
});

function añadirError() {
 
  const existingError = document.querySelector(".errorhijo");
  if (!existingError) {
    const error = document.createElement("p");
    error.classList.add("errorhijo");
    error.textContent = "Error";
    errorContainer.appendChild(error);
    setTimeout(() => {
      quitarError();
    }, 5000);
  }
}

function quitarError() {

  const existingError = document.querySelector(".errorhijo");
  if (existingError) {
    existingError.classList.remove("errorhijo");
    existingError.textContent = "";
    errorContainer.removeChild(existingError);
  }
}

function Celsiusyredondeo(numero) {
  const resultado = (numero - 273.15).toFixed(2);
  return resultado;
}

function imprimir(ciudad, pais) {
  const apiKey = "099ab8b783734262ba694706263a82ee"; //Mi key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        añadirError();
      }
      return response.json();
    })
    .then((data) => {
      //Definicion de variables JSON
      const temp = data.main.temp;
      const temp_min = data.main.temp_min;
      const temp_max = data.main.temp_max;

      //Pasar a Celsius y añadir dos decimales

      const temp_resultado = Celsiusyredondeo(temp);
      const temp_min_resultado = Celsiusyredondeo(temp_min);
      const temp_max_resultado = Celsiusyredondeo(temp_max);

      //Crear DIV únicamente para "temp", ya que este tiene que ser más grande
      const temperatura = document.createElement("div");
      temperatura.classList.add("temperatura");
      temperatura.textContent = temp_resultado;

      //Crear elemento DIV para resto de elementos para cambiar color de texto, fuente, etc.
      const elemento = document.createElement("div");
      elemento.classList.add("contenedor");

      //Formateo la etiqueta resultado para que no aparezca nada
      resultado.textContent = "";
      //Aquí imprimimos temperatura, temperatura mínima y temperatura máxima
      elemento.innerHTML = `Clima en ${ciudad}, ${pais}:<br>
        ${temperatura.outerHTML}<br>
        Temperatura mínima: ${temp_min_resultado}<br>
        Temperatura máxima: ${temp_max_resultado}<br>
      `;

      resultado.appendChild(elemento);
    })
   //(Bloque catch opcional)
}
