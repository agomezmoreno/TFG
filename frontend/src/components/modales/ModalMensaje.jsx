// modal que muestra mensaje de se ha añadido correctamente
function ModalMensaje({ open, onClose, mensaje }) {
  if (!open) {
    return null;
  }

  const alClicEnFondo = () => onClose();

  const alClicEnCaja = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={alClicEnFondo}
    >
      <div
        className="bg-white rounded shadow-lg max-w-sm w-full mx-4 p-6"
        onClick={alClicEnCaja}
      >
        <p className="text-slate-800 mb-6">{mensaje}</p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 text-slate-800 rounded hover:bg-slate-300"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMensaje;
