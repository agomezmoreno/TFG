import TarjetaSuper from "../tarjetas/TarjetaSuper"

function BloqueComparacion({ productos, cargando, comparacion }) {
  const hayProductos = productos && productos.length > 0
  if (!hayProductos) {
    return null
  }

  if (cargando) {
    return (
      <p className="text-center text-slate-600 mt-10">
        Calculando el mejor supermercado para tu lista...
      </p>
    )
  }

  // el primero es el más barato
  const hayComparacion = comparacion && comparacion.length > 0
  if (!hayComparacion) {
    return (
      <p className="text-center text-slate-600 mt-10">
        No hay suficientes datos para comparar supermercados.
      </p>
    )
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        Comparando tu cesta en:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comparacion.map((superInfo, indice) => (
          <TarjetaSuper
            key={superInfo.IdSupermercado}
            info={superInfo}
            esMasBarato={indice === 0}
          />
        ))}
      </div>
    </section>
  )
}

export default BloqueComparacion
