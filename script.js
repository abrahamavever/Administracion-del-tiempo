let trotarDuracionInicial = 70;
let trotarDuracionIncremento = 10;
let trotarNivel = 1;
let cuentaRegresiva;
let sonidoAlerta = new Audio('alerta.mp3');
let nivelGuardado = localStorage.getItem("nivelTrotar");

if (nivelGuardado) {
    trotarNivel = parseInt(nivelGuardado);
    trotarDuracionInicial = 70 + (trotarNivel - 1) * 10;
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
    document.getElementById("trotar-duracion").textContent = trotarDuracionInicial;
}

function aumentarNivelTrotar() {
    trotarNivel++;
    trotarDuracionInicial += trotarDuracionIncremento;
    guardarNivelTrotar();
    actualizarDatosTrotar();
    console.log(`¡Has subido de nivel en trotar! Nivel actual: ${trotarNivel}`);
    console.log(`Nueva duración de trotar: ${trotarDuracionInicial} segundos`);
}

function bajarNivelTrotar() {
    if (trotarNivel > 1) {
        trotarNivel--;
        trotarDuracionInicial -= trotarDuracionIncremento;
        guardarNivelTrotar();
        actualizarDatosTrotar();
        console.log(`¡Has bajado de nivel en trotar! Nivel actual: ${trotarNivel}`);
        console.log(`Nueva duración de trotar: ${trotarDuracionInicial} segundos`);
    }
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
            reproducirSonidoAlerta();
        }
    }, 1000);
}

function reproducirSonidoAlerta() {
    sonidoAlerta.play();
}
