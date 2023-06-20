class ActividadManager {
    constructor(duracionInicial, duracionIncremento, actividadNombre) {
      this.actividadDuracionInicial = duracionInicial;
      this.actividadDuracionIncremento = duracionIncremento;
      this.actividadNivel = 1;
      this.actividadCuentaRegresiva = null;
      this.actividadSonidoAlerta = new Audio('alerta.mp3');
      this.actividadNivelGuardado = localStorage.getItem(`nivel${actividadNombre}`);
  
      if (this.actividadNivelGuardado) {
        this.actividadNivel = parseInt(this.actividadNivelGuardado);
      } else {
        this.guardarNivelActividad(actividadNombre);
        this.actividadNivelGuardado = this.actividadNivel.toString();
      }
  
      this.actualizarDatosActividad(actividadNombre);
    }
  
    guardarNivelActividad(actividadNombre) {
      localStorage.setItem(`nivel${actividadNombre}`, this.actividadNivel.toString());
    }
  
    actualizarDatosActividad(actividadNombre) {
      const nivelElement = document.getElementById(`${actividadNombre}-nivel`);
      const duracionElement = document.getElementById(`${actividadNombre}-duracion`);
  
      if (nivelElement) {
        nivelElement.textContent = this.actividadNivel;
      }
  
      if (duracionElement) {
        duracionElement.textContent = this.calcularDuracionActividad();
      }
    }
  
    calcularDuracionActividad() {
      return this.actividadDuracionInicial + (this.actividadNivel - 1) * this.actividadDuracionIncremento;
    }
  
    aumentarNivelActividad(actividadNombre) {
      this.actividadNivel++;
      this.guardarNivelActividad(actividadNombre);
      this.actualizarDatosActividad(actividadNombre);
      console.log(`¡Has subido de nivel en ${actividadNombre}! Nivel actual: ${this.actividadNivel}`);
      console.log(`Nueva duración de ${actividadNombre}: ${this.calcularDuracionActividad()} segundos`);
    }
  
    bajarNivelActividad(actividadNombre) {
      if (this.actividadNivel > 1) {
        this.actividadNivel--;
        this.guardarNivelActividad(actividadNombre);
        this.actualizarDatosActividad(actividadNombre);
        console.log(`¡Has bajado de nivel en ${actividadNombre}! Nivel actual: ${this.actividadNivel}`);
        console.log(`Nueva duración de ${actividadNombre}: ${this.calcularDuracionActividad()} segundos`);
      }
    }
  
    empezarCuentaRegresiva(actividadNombre) {
      const duracionInicial = this.calcularDuracionActividad();
      let segundosRestantes = duracionInicial;
      const duracionElement = document.getElementById(`${actividadNombre}-duracion`);
  
      if (duracionElement) {
        duracionElement.textContent = segundosRestantes;
      }
  
      this.actividadCuentaRegresiva = setInterval(() => {
        segundosRestantes--;
        if (duracionElement) {
          duracionElement.textContent = segundosRestantes;
        }
  
        if (segundosRestantes <= 0) {
          clearInterval(this.actividadCuentaRegresiva);
          this.reproducirSonidoAlerta();
          this.almacenarDatos(actividadNombre);
          this.reiniciarCuentaRegresiva(actividadNombre);
        }
      }, 1000);
    }
  
    reproducirSonidoAlerta(actividadNombre) {
      this.actividadSonidoAlerta.play();
      setTimeout(() => {
        this.reiniciarCuentaRegresiva(actividadNombre);
      }, 2000);
    }
  
    reiniciarCuentaRegresiva(actividadNombre) {
      clearInterval(this.actividadCuentaRegresiva);
      const duracionElement = document.getElementById(`${actividadNombre}-duracion`);
  
      if (duracionElement) {
        duracionElement.textContent = this.calcularDuracionActividad();
      }
    }
  
    almacenarDatos(accion) {
      const fechaHora = new Date().toLocaleString();
      const datos = {
        nivel: this.actividadNivel,
        tiempo: this.calcularDuracionActividad(),
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
  
  class TrotarManager extends ActividadManager {
    constructor() {
      super(70, 10, "trotar");
    }
  }
  
  class LecturaManager extends ActividadManager {
    constructor() {
      super(10, 5, "lectura");
    }
  }
  
  const trotarManager = new TrotarManager();
  const lecturaManager = new LecturaManager();
  
  function aumentarNivelTrotar() {
    trotarManager.aumentarNivelActividad("trotar");
  }
  
  function bajarNivelTrotar() {
    trotarManager.bajarNivelActividad("trotar");
  }
  
  function empezarCuentaRegresiva() {
    trotarManager.empezarCuentaRegresiva("trotar");
  }
  
  function aumentarNivelLectura() {
    lecturaManager.aumentarNivelActividad("lectura");
  }
  
  function bajarNivelLectura() {
    lecturaManager.bajarNivelActividad("lectura");
  }
  
  function empezarCuentaRegresivaLectura() {
    lecturaManager.empezarCuentaRegresiva("lectura");
  }
  
  function almacenarDatos() {
    trotarManager.almacenarDatos("Trotar");
  }
  
  function almacenarDatosLectura() {
    lecturaManager.almacenarDatos("Lectura");
  }
  
  function mostrarDatosAlmacenados() {
    trotarManager.mostrarDatosAlmacenados();
    lecturaManager.mostrarDatosAlmacenados();
  }
  