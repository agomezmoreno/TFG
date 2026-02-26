// caja con título y contenido, click fuera cierra
function Modal({ open, onClose, contenido, titulo }) {
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
        className="bg-white rounded shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={alClicEnCaja}
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center rounded-t z-10">
          {titulo ? (
            <h2 className="text-xl font-semibold text-slate-800">{titulo}</h2>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <div className="p-6">{contenido}</div>
      </div>
    </div>
  );
}

export default Modal;
