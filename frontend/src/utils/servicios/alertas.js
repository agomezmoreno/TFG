import { apiPost, apiDelete } from "../api";
import { mostrarMensaje } from "../mensajes/mensajeModal";

export function crearAlerta(datos, alTerminar) {
  if (!datos.uid) {
    mostrarMensaje("Debes iniciar sesión para crear una alerta", "error");
    if (alTerminar) alTerminar(false);
    return;
  }

  const IdProducto = Number(datos.IdProducto);
  if (!IdProducto || isNaN(IdProducto)) {
    mostrarMensaje("Pon un id de producto válido", "error");
    if (alTerminar) alTerminar(false);
    return;
  }

  const Umbral = Number(datos.Umbral);
  if (!Umbral || isNaN(Umbral)) {
    mostrarMensaje("Pon un umbral válido", "error");
    if (alTerminar) alTerminar(false);
    return;
  }

  const Tipo = datos.Tipo === "baja" ? "baja" : "umbral"
  // email o telegram, lo mandamos en mayúsculas
  let Canal
  if (datos.Canal === "email") {
    Canal = "EMAIL";
  } else {
    Canal = "TELEGRAM";
  }

  apiPost("/api/alerts", {
    uid: datos.uid,
    IdProducto,
    Tipo,
    Umbral,
    Canal,
  })
    .then((res) => {
      if (res && res.ok) {
        mostrarMensaje("Alerta creada correctamente.", "success");
        if (alTerminar) alTerminar(true);
      } else {
        mostrarMensaje("Error al crear la alerta", "error");
        if (alTerminar) alTerminar(false);
      }
    })
    .catch(() => {
      mostrarMensaje("Error al crear la alerta", "error");
      if (alTerminar) alTerminar(false);
    });
}

export function eliminarAlertaAPI(id) {
  return apiDelete("/api/alerts/" + id);
}
