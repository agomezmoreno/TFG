function TarjetaSuper({ info, esMasBarato }) {
  const textoEtiqueta = esMasBarato
    ? "Supermercado - Más barato"
    : "Supermercado";

  const hayProductos = info.Productos && info.Productos.length > 0;

  return (
    <div className="bg-white border border-slate-200 rounded p-4 flex flex-col h-full">
      <div>
        <p className="text-sm font-semibold text-slate-800">{textoEtiqueta}</p>
        <p className="text-base font-semibold text-slate-900">
          {info.Supermercado}
        </p>
      </div>
      <div className="mt-3 flex-1">
        {hayProductos ? (
          <ul className="space-y-1 text-sm text-slate-700">
            {info.Productos.map((producto, indice) => (
              <li key={indice} className="flex gap-2">
                <span className="w-16 font-semibold">
                  {producto.Subtotal.toFixed(2)} €
                </span>
                <span className="flex-1 truncate">{producto.Nombre}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">
            No hay detalles de productos.
          </p>
        )}
      </div>
      <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between text-sm font-semibold">
        <span>Total</span>
        <span>{info.Total.toFixed(2)} €</span>
      </div>
    </div>
  );
}

export default TarjetaSuper;
