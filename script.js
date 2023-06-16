// Definir variables para la acción de trotar
let trotarDuracionInicial = 70;
let trotarDuracionIncremento = 10;
let trotarNivel = 1;
let cuentaRegresiva;

// Función para incrementar el nivel de trotar
function aumentarNivelTrotar() {
    trotarNivel++;
    trotarDuracionInicial += trotarDuracionIncremento;
    document.getElementById("trotar-nivel").textContent = trotarNivel;
    document.getElementById("trotar-duracion").textContent = trotarDuracionInicial;
    console.log("¡Has subido de nivel en trotar! Nivel actual: " + trotarNivel);
    console.log("Nueva duración de trotar: " + trotarDuracionInicial + " segundos");
  }

  function empezarCuentaRegresiva() {
    const duracionInicial = parseInt(document.getElementById("trotar-duracion").textContent);
    let segundosRestantes = duracionInicial;
    document.getElementById("trotar-duracion").textContent = segundosRestantes;
  
    cuentaRegresiva = setInterval(() => {
      segundosRestantes--;
      document.getElementById("trotar-duracion").textContent = segundosRestantes;
  
      if (segundosRestantes <= 0) {
        clearInterval(cuentaRegresiva);
        alert("¡Tiempo agotado!");
      }
    }, 1000);
  }

