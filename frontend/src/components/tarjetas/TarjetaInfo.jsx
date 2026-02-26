function TarjetaInfo({ icono, imagen, titulo, descripcion }) {
  const mostrarImagen = Boolean(imagen);

  return (
    <div className="bg-white border border-slate-200 rounded p-6 flex flex-col text-center text-slate-900">
      <div className="mb-3 flex justify-center">
        {mostrarImagen ? (
          <img src={imagen} alt={titulo} className="w-12 h-12 object-contain" />
        ) : (
          <span className="text-3xl">{icono}</span>
        )}
      </div>
      <h3 className="font-semibold mb-1">{titulo}</h3>
      <p className="text-sm text-slate-600">{descripcion}</p>
    </div>
  );
}

export default TarjetaInfo;
