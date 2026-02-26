// input controlado + botón, enter o click disparan onSearch
function BarraBusqueda({ valor, onChange, onSearch }) {
  const alCambiarTexto = (e) => onChange(e.target.value);

  // enter lanza búsqueda
  const alPulsarTecla = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex gap-3 bg-slate-100 rounded-lg px-3 py-2.5 border border-slate-200 shadow-sm">
      <input
        type="text"
        value={valor}
        onChange={alCambiarTexto}
        onKeyDown={alPulsarTecla}
        placeholder="Buscar producto..."
        className="px-4 py-2 rounded-md w-72 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-300"
      />
      <button
        type="button"
        onClick={onSearch}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium"
      >
        Buscar
      </button>
    </div>
  );
}

export default BarraBusqueda;
