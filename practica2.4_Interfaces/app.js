//Capturo los elementos del DOM
const form = document.getElementById("formMatricula");

const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const email = document.getElementById("email");
const ciclo = document.getElementById("ciclo");
const acepto = document.getElementById("acepto");

const msgEdad = document.getElementById("msgEdad");
const msgEmail = document.getElementById("msgEmail");
const msgCiclo = document.getElementById("msgCiclo");
const msgMods = document.getElementById("msgMods");
const msgAcepto = document.getElementById("msgAcepto");


//La primera validación es la edad:
function validarEdad() {
  const valor = edad.value;

  if (valor === "") {
    msgEdad.textContent = "Edad no puede estar vacía";
    msgEdad.style.color = "red";
    return false;
  }

  if (isNaN(valor)) {
    msgEdad.textContent = "La edad tiene que ser un número";
    msgEdad.style.color = "red";
    return false;
  }

  if (valor < 16) {
    msgEdad.textContent = "La edad no puede ser menor de 16";
    msgEdad.style.color = "red";
    return false;
  }

  if (valor > 60) {
    msgEdad.textContent = "La edad no puede ser mayor de 60";
    msgEdad.style.color = "red";
    return false;
  }

  msgEdad.textContent = "Edad correcta";
  msgEdad.style.color = "green";
  return true;
}

edad.addEventListener("input", validarEdad);


//La segunda validación es el email:
function validarEmail() {
  const valor = email.value.toLowerCase();

  if (valor === "") {
    msgEmail.textContent = "El email no puede estar vacío";
    msgEmail.style.color = "red";
    return false;
  }

  if (valor.length < 6) {
    msgEmail.textContent = "El email tiene menos de 6 caracteres";
    msgEmail.style.color = "red";
    return false;
  }

  if (!valor.includes("@")) {
    msgEmail.textContent = "El email debe contener @";
    msgEmail.style.color = "red";
    return false;
  }

  if (!valor.includes(".")) {
    msgEmail.textContent = "El email debe contener un punto";
    msgEmail.style.color = "red";
    return false;
  }

  if (valor.includes("@yahoo.")) {
    msgEmail.textContent = "No se permiten emails de Yahoo";
    msgEmail.style.color = "red";
    return false;
  }

  msgEmail.textContent = "Email correcto";
  msgEmail.style.color = "green";
  return true;
}

email.addEventListener("input", validarEmail);


//La tercera validación es el ciclo:
function validarCiclo() {
  if (ciclo.value === "") {
    msgCiclo.textContent = "Debes seleccionar un ciclo";
    msgCiclo.style.color = "red";
    return false;
  }

  msgCiclo.textContent = "Ciclo seleccionado correctamente";
  msgCiclo.style.color = "green";
  return true;
}

ciclo.addEventListener("change", validarCiclo);

//La cuarta validación son los checkboxes de los módulos:
function validarModulos() {
  const modulos = document.getElementsByName("modulos");
  let contador = 0;

  for (let i = 0; i < modulos.length; i++) {
    if (modulos[i].checked) {
      contador++;
    }
  }

  if (contador < 2) {
    msgMods.textContent = "Debes marcar al menos 2 módulos";
    msgMods.style.color = "red";
    return false;
  }

  msgMods.textContent = "Módulos correctos";
  msgMods.style.color = "green";
  return true;

}

// Capturamos todos los checkboxes de módulos
const modulos = document.getElementsByName("modulos");

// Añadimos un listener a cada checkbox
for (let i = 0; i < modulos.length; i++) {
  modulos[i].addEventListener("change", validarModulos);
}


form.addEventListener("submit", function (e) {
  e.preventDefault(); // evitamos ese envío automático que comenté en la captura de antes de esta parte

  // validamos todos los campos y guardamos resultados
  let errores = [];

  if (!validarEdad()) errores.push("Edad");
  if (!validarEmail()) errores.push("Email");
  if (!validarCiclo()) errores.push("Ciclo");
  if (!validarModulos()) errores.push("Módulos");
  if (!validarAcepto()) errores.push("Aceptar condiciones");

  if (errores.length > 0) {
    alert("Campos no válidos: " + errores.join(", "));
    return; // no seguimos hasta que estén todos correctos
  }

  // Si todo está correcto, mostramos el resumen
  mostrarResumen();
});

//para mostar mi resumen
function mostrarResumen() {
  const modulosSeleccionados = [];
  const modulos = document.getElementsByName("modulos");
  for (let i = 0; i < modulos.length; i++) {
    if (modulos[i].checked) {
      modulosSeleccionados.push(modulos[i].value);
    }
  }

  // Construimos el contenido como string
  var resumen = "<h1>Resumen de matrícula</h1>";
  resumen += "<p><strong>Alumno:</strong> " + nombre.value + "</p>";
  resumen += "<p><strong>Edad:</strong> " + edad.value + "</p>";
  resumen += "<p><strong>Email:</strong> " + email.value + "</p>";
  resumen += "<p><strong>Ciclo:</strong> " + ciclo.value + "</p>";
  resumen += "<p><strong>Módulos:</strong> " + modulosSeleccionados.join(", ") + "</p>";
  resumen += "<p><strong>Condiciones aceptadas:</strong> Sí</p>";

  // Mostramos el resumen en el body
  document.body.innerHTML = resumen;
}




//la quinta validación es la de aceptar las condiciones:
function validarAcepto() {
  if (!acepto.checked) {
    msgAcepto.textContent = "Debes aceptar las condiciones";
    return false;
  }

  msgAcepto.textContent = "";
  return true;
}
acepto.addEventListener("change", validarAcepto);


//para mi botón recargar:
const btnReload = document.getElementById("btnReload");

btnReload.addEventListener("click", () => {
  location.reload(); // recarga la página como al inicio
});
//para mi botón limpiar
document.getElementById("btnReset").addEventListener("click", () => {
  msgEdad.textContent = "";
  msgEmail.textContent = "";
  msgCiclo.textContent = "";
  msgMods.textContent = "";
  msgAcepto.textContent = "";
});
