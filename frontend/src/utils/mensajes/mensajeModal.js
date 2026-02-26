let notificar = null;

// el contenedor registra aquí su setState
export function initMensajeModal(callback) {
  notificar = callback;
}

// abre modal de mensaje (info, success, error) o alert si no hay contenedor
export function mostrarMensaje(mensaje, tipo = "info") {
  if (notificar) {
    notificar({ tipo: "mensaje", mensaje, tipoMensaje: tipo });
  } else {
    alert(mensaje);
  }
}

// abre modal confirmar o window.confirm si no hay contenedor
export function mostrarConfirmar(mensaje, onConfirm, textoBoton = "Aceptar") {
  if (notificar) {
    notificar({ tipo: "confirmar", mensaje, onConfirm, textoBoton });
  } else if (window.confirm(mensaje)) {
    onConfirm();
  }
}
