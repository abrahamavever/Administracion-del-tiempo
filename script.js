const trotarDuracionInicial = 70;
const trotarDuracionIncremento = 10;
let trotarNivel = 1;
let cuentaRegresiva;
const sonidoAlerta = new Audio('alerta.mp3');
let nivelGuardado = localStorage.getItem("nivelTrotar");

if (nivelGuardado) {
  trotarNivel = parseInt(nivelGuardado);
} else {
  guardarNivelTrotar();
  nivelGuardado = trotarNivel.toString();
}

actualizarDatosTrotar();

function guardarNivelTrotar() {
  localStorage.setItem("nivelTrotar", trotarNivel.toString());
}

function actualizarDatosTrotar() {
  document.getElementById("trotar-nivel").textContent = trotarNivel;
  document.getElementById("trotar-duracion").textContent = calcularDuracionTrotar();
}

function calcularDuracionTrotar() {
  return trotarDuracionInicial + (trotarNivel - 1) * trotarDuracionIncremento;
}

function aumentarNivelTrotar() {
  trotarNivel++;
  guardarNivelTrotar();
  actualizarDatosTrotar();
  console.log(`¡Has subido de nivel en trotar! Nivel actual: ${trotarNivel}`);
  console.log(`Nueva duración de trotar: ${calcularDuracionTrotar()} segundos`);
}

function bajarNivelTrotar() {
  if (trotarNivel > 1) {
    trotarNivel--;
    guardarNivelTrotar();
    actualizarDatosTrotar();
    console.log(`¡Has bajado de nivel en trotar! Nivel actual: ${trotarNivel}`);
    console.log(`Nueva duración de trotar: ${calcularDuracionTrotar()} segundos`);
  }
}

function empezarCuentaRegresiva() {
  const duracionInicial = calcularDuracionTrotar();
  let segundosRestantes = duracionInicial;
  document.getElementById("trotar-duracion").textContent = segundosRestantes;

  cuentaRegresiva = setInterval(() => {
    segundosRestantes--;
    document.getElementById("trotar-duracion").textContent = segundosRestantes;

    if (segundosRestantes <= 0) {
      clearInterval(cuentaRegresiva);
      reproducirSonidoAlerta();
      almacenarDatos(trotarNivel, duracionInicial, "Trotar");
      reiniciarCuentaRegresiva();
    }
  }, 1000);
}

function reproducirSonidoAlerta() {
  sonidoAlerta.play();
  setTimeout(() => {
    reiniciarCuentaRegresiva();
  }, 2000); // Espera 2 segundos antes de reiniciar la cuenta regresiva
}

function reiniciarCuentaRegresiva() {
  clearInterval(cuentaRegresiva);
  document.getElementById("trotar-duracion").textContent = calcularDuracionTrotar();
}

function almacenarDatos(nivel, tiempo, accion) {
  const fechaHora = new Date().toLocaleString();
  const datos = {
    nivel: nivel,
    tiempo: tiempo,
    accion: accion,
    fechaHora: fechaHora
  };
  const datosPrevios = JSON.parse(localStorage.getItem("datos")) || [];
  datosPrevios.push(datos);
  localStorage.setItem("datos", JSON.stringify(datosPrevios));
}

function mostrarDatosAlmacenados() {
  const datosPrevios = JSON.parse(localStorage.getItem("datos"));
  if (datosPrevios) {
    datosPrevios.forEach((datos) => {
      console.log(`Nivel: ${datos.nivel}`);
      console.log(`Tiempo: ${datos.tiempo} segundos`);
      console.log(`Acción: ${datos.accion}`);
      console.log(`Fecha y Hora: ${datos.fechaHora}`);
      console.log("------------------");
    });
  } else {
    console.log("No hay datos almacenados.");
  }
}
