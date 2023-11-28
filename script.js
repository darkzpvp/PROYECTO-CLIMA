const titulo = document.querySelector("#titulo");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
const inputCiudad = document.querySelector("#ciudad");
const selectPais = document.querySelector("#pais");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  imprimir();
});
function Celsiusyredondeo(numero) {
  const resultado = (numero - 273.15).toFixed(2);
  return resultado;
}

function imprimir() {
  const ciudad = inputCiudad.value;
  const pais = selectPais.value;

  if (ciudad.trim() === "" || pais === "") {
    alert("Por favor, ingresa ciudad y país");
    return;
  }

  const apiKey = "099ab8b783734262ba694706263a82ee";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener datos del clima");
      }
      return response.json();
    })
    .then((data) => {
      const elemento = document.createElement("div");
      elemento.classList.add("contenedor");

      const temp_min = data.main.temp_min;
      const temp = data.main.temp;
      const temp_resultado = Celsiusyredondeo(temp);

      const temperatura = document.createElement("div");
      temperatura.classList.add("temperatura");
      temperatura.textContent = temp_resultado;

      const temp_min_resultado = Celsiusyredondeo(temp_min);
      const temp_max = data.main.temp_max;
      const temp_max_resultado = Celsiusyredondeo(temp_max);

      resultado.textContent = "";
      elemento.innerHTML = `Clima en ${ciudad}, ${pais}:<br>
          ${temperatura.outerHTML}<br>
          Temperatura mínima: ${temp_min_resultado}<br>
          Temperatura máxima: ${temp_max_resultado}<br>
        `;

      resultado.appendChild(elemento);
    });
}
