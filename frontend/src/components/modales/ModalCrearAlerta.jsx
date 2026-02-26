import { useState } from "react";
import Modal from "./Modal";
import { crearAlerta } from "../../utils/servicios/alertas";
import { mostrarMensaje } from "../../utils/mensajes/mensajeModal";

// formulario tipo (baja/umbral) y precio objetivo, post a alertas
function ModalCrearAlerta({ open, onClose, idProducto, usuario }) {
  const [tipo, setTipo] = useState("");
  const [umbral, setUmbral] = useState("");
  const [enviando, setEnviando] = useState(false);

  function alEnviarFormulario(e) {
    e.preventDefault();

    const usuarioNoLogueado = !usuario;
    if (usuarioNoLogueado) {
      mostrarMensaje("Debes iniciar sesión para crear una alerta", "error");
      return;
    }

    setEnviando(true);

    const datosAlerta = {
      uid: usuario.uid,
      IdProducto: idProducto,
      Tipo: tipo,
      Umbral: umbral,
      Canal: "telegram",
    };
    function alTerminar(ok) {
      setEnviando(false);
      if (ok) {
        setTipo("");
        setUmbral("");
        onClose();
      }
    }
    crearAlerta(datosAlerta, alTerminar);
  }

  // no cerrar mientras envía
  function alCerrar() {
    const puedeCerrar = !enviando;
    if (puedeCerrar) {
      setTipo("");
      setUmbral("");
      onClose();
    }
  }

  const textoAyudaTipo =
    (tipo === "baja" && "Te avisaremos cuando el precio baje") ||
    (tipo === "umbral" && "Te avisaremos cuando alcance este precio") ||
    "";

  const textoBotonEnviar = enviando ? "Creando..." : "Crear alerta";

  const bloqueTipoDeAlerta = (
    <div>
      <label className="block text-sm text-slate-700 mb-1">
        Tipo de alerta <span className="text-red-500">*</span>
      </label>
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="w-full border border-slate-300 rounded px-4 py-2 text-sm"
        required
        disabled={enviando}
      >
        <option value="">Selecciona un tipo</option>
        <option value="baja">Bajada de precio</option>
        <option value="umbral">Umbral de precio</option>
      </select>
      <p className="text-xs text-slate-500 mt-1">{textoAyudaTipo}</p>
    </div>
  );

  const bloquePrecioObjetivo = (
    <div>
      <label className="block text-sm text-slate-700 mb-1">
        Precio objetivo (€) <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          €
        </span>
        <input
          type="number"
          step="0.01"
          min="0"
          value={umbral}
          onChange={(e) => setUmbral(e.target.value)}
          placeholder="0.00"
          className="w-full border border-slate-300 rounded pl-8 pr-4 py-2 text-sm"
          required
          disabled={enviando}
        />
      </div>
      <p className="text-xs text-slate-500 mt-1">
        Introduce el precio al que quieres recibir la alerta
      </p>
    </div>
  );

  const bloqueBotones = (
    <div className="flex gap-3 pt-4 border-t border-slate-200">
      <button
        type="button"
        onClick={alCerrar}
        className="flex-1 px-4 py-2 bg-slate-200 text-slate-800 rounded hover:bg-slate-300 disabled:opacity-50"
        disabled={enviando}
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        disabled={enviando}
      >
        {textoBotonEnviar}
      </button>
    </div>
  );

  const contenido = (
    <form onSubmit={alEnviarFormulario} className="space-y-5">
      {bloqueTipoDeAlerta}
      {bloquePrecioObjetivo}
      {bloqueBotones}
    </form>
  );

  return (
    <Modal
      open={open}
      onClose={alCerrar}
      contenido={contenido}
      titulo="Crear alerta de precio"
    />
  );
}

export default ModalCrearAlerta;
