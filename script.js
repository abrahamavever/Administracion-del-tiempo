// Definir variables para la acción de trotar
let trotarDuracionInicial = 70;
let trotarDuracionIncremento = 10;
let trotarNivel = 1;

// Función para incrementar el nivel de trotar
function aumentarNivelTrotar() {
    trotarNivel++;
    trotarDuracionInicial += trotarDuracionIncremento;
    document.getElementById("trotar-nivel").textContent = trotarNivel;
    document.getElementById("trotar-duracion").textContent = trotarDuracionInicial;
    console.log("¡Has subido de nivel en trotar! Nivel actual: " + trotarNivel);
    console.log("Nueva duración de trotar: " + trotarDuracionInicial + " segundos");
  }

