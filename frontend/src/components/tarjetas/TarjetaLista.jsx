function TarjetaLista({ producto, onChangeCantidad, onEliminar }) {
  // quita ceros decimales si es entero
  function formatearCantidad(cantidad) {
    const num = Number(cantidad);
    const esEntero = Number.isInteger(num);
    return esEntero ? num.toString() : num.toFixed(2).replace(/\.?0+$/, "");
  }

  const cantidadFormateada = formatearCantidad(producto.Cantidad);

  const alRestar = () => onChangeCantidad(-1);
  const alSumar = () => onChangeCantidad(1);

  // +1 / -1 lo maneja el padre
  return (
    <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded p-3">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-slate-100 rounded flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={producto.ImagenURL}
            alt={producto.Nombre}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <p className="font-semibold text-sm sm:text-base">{producto.Nombre}</p>
          <p className="text-xs text-slate-500">x{cantidadFormateada}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={alRestar}
            className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          >
            -
          </button>
          <span className="w-6 text-center font-semibold">
            {cantidadFormateada}
          </span>
          <button
            type="button"
            onClick={alSumar}
            className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={onEliminar}
          className="text-xs sm:text-sm px-3 py-1.5 rounded border border-red-300 text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TarjetaLista;
