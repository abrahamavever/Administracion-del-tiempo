class TrotarManager {
    constructor() {
      this.trotarDuracionInicial = 70;
      this.trotarDuracionIncremento = 10;
      this.trotarNivel = 1;
      this.cuentaRegresiva = null;
      this.sonidoAlerta = new Audio('alerta.mp3');
      this.nivelGuardado = localStorage.getItem("nivelTrotar");
  
      if (this.nivelGuardado) {
        this.trotarNivel = parseInt(this.nivelGuardado);
      } else {
        this.guardarNivelTrotar();
        this.nivelGuardado = this.trotarNivel.toString();
      }
  
      this.actualizarDatosTrotar();
    }
  
    guardarNivelTrotar() {
      localStorage.setItem("nivelTrotar", this.trotarNivel.toString());
    }
  
    actualizarDatosTrotar() {
      document.getElementById("trotar-nivel").textContent = this.trotarNivel;
      document.getElementById("trotar-duracion").textContent = this.calcularDuracionTrotar();
    }
  
    calcularDuracionTrotar() {
      return this.trotarDuracionInicial + (this.trotarNivel - 1) * this.trotarDuracionIncremento;
    }
  
    aumentarNivelTrotar() {
      this.trotarNivel++;
      this.guardarNivelTrotar();
      this.actualizarDatosTrotar();
      console.log(`¡Has subido de nivel en trotar! Nivel actual: ${this.trotarNivel}`);
      console.log(`Nueva duración de trotar: ${this.calcularDuracionTrotar()} segundos`);
    }
  
    bajarNivelTrotar() {
      if (this.trotarNivel > 1) {
        this.trotarNivel--;
        this.guardarNivelTrotar();
        this.actualizarDatosTrotar();
        console.log(`¡Has bajado de nivel en trotar! Nivel actual: ${this.trotarNivel}`);
        console.log(`Nueva duración de trotar: ${this.calcularDuracionTrotar()} segundos`);
      }
    }
  
    empezarCuentaRegresiva() {
      const duracionInicial = this.calcularDuracionTrotar();
      let segundosRestantes = duracionInicial;
      document.getElementById("trotar-duracion").textContent = segundosRestantes;
  
      this.cuentaRegresiva = setInterval(() => {
        segundosRestantes--;
        document.getElementById("trotar-duracion").textContent = segundosRestantes;
  
        if (segundosRestantes <= 0) {
          clearInterval(this.cuentaRegresiva);
          this.reproducirSonidoAlerta();
          this.almacenarDatos("Trotar");
          this.reiniciarCuentaRegresiva();
        }
      }, 1000);
    }
  
    reproducirSonidoAlerta() {
      this.sonidoAlerta.play();
      setTimeout(() => {
        this.reiniciarCuentaRegresiva();
      }, 2000);
    }
  
    reiniciarCuentaRegresiva() {
      clearInterval(this.cuentaRegresiva);
      document.getElementById("trotar-duracion").textContent = this.calcularDuracionTrotar();
    }
  
    almacenarDatos(accion) {
      const fechaHora = new Date().toLocaleString();
      const datos = {
        nivel: this.trotarNivel,
        tiempo: this.calcularDuracionTrotar(),
        accion: accion,
        fechaHora: fechaHora
      };
  
      const datosPrevios = JSON.parse(localStorage.getItem("datos")) || [];
      datosPrevios.push(datos);
      localStorage.setItem("datos", JSON.stringify(datosPrevios));
    }
  
    mostrarDatosAlmacenados() {
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
  }

  const trotarManager = new TrotarManager();

function aumentarNivelTrotar() {
  trotarManager.aumentarNivelTrotar();
}

function bajarNivelTrotar() {
  trotarManager.bajarNivelTrotar();
}

function empezarCuentaRegresiva() {
  trotarManager.empezarCuentaRegresiva();
}

function almacenarDatos() {
  trotarManager.almacenarDatos("Trotar");
}

function mostrarDatosAlmacenados() {
  trotarManager.mostrarDatosAlmacenados();
}
