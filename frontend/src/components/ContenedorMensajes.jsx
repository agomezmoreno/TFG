import { useState, useEffect } from "react";
import { initMensajeModal } from "../utils/mensajes/mensajeModal";
import ModalMensaje from "./modales/ModalMensaje";
import ModalConfirmar from "./modales/ModalConfirmar";

// escucha el modal global y muestra mensaje o confirmar
export default function ContenedorMensajes() {
  const [estado, setEstado] = useState(null);

  // registra setEstado al montar, limpia al desmontar
  useEffect(() => {
    initMensajeModal(setEstado);
    return () => initMensajeModal(null);
  }, []);

  if (!estado) {
    return null;
  }

  const alCerrar = () => setEstado(null);

  const esMensaje = estado.tipo === "mensaje";
  if (esMensaje) {
    return (
      <ModalMensaje
        open
        mensaje={estado.mensaje}
        tipo={estado.tipoMensaje}
        onClose={alCerrar}
      />
    );
  }

  // modal de confirmación con botón y callback
  const esConfirmar = estado.tipo === "confirmar";
  if (esConfirmar) {
    const alConfirmar = () => estado.onConfirm && estado.onConfirm();
    return (
      <ModalConfirmar
        open
        mensaje={estado.mensaje}
        textoBoton={estado.textoBoton != null ? estado.textoBoton : "Aceptar"}
        onConfirm={alConfirmar}
        onClose={alCerrar}
      />
    );
  }

  return null;
}
