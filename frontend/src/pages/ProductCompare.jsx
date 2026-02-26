import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import BarraNavegacion from "../components/BarraNavegacion"
import TarjetaPequena from "../components/tarjetas/TarjetaPequena"
import Mensaje from "../components/Mensaje"
import { apiGet } from "../utils/api"
import mapOfertaAProducto from "../utils/helpers/mapOfertaAProducto"

function ProductCompare() {
  const { productId: idProducto } = useParams()
  const [listaOfertas, setListaOfertas] = useState([])
  const [estaCargando, setEstaCargando] = useState(true)

  useEffect(() => {
    setEstaCargando(true)
    apiGet(`/api/compare/${idProducto}`)
      .then((data) => {
        if (data) {
          setListaOfertas(data)
        } else {
          setListaOfertas([])
        }
      })
      .finally(() => setEstaCargando(false))
  }, [idProducto])

  let bloqueContenido = null
  if (estaCargando) {
    bloqueContenido = <Mensaje mensaje="Cargando..." />
  } else if (listaOfertas.length === 0) {
    bloqueContenido = <Mensaje mensaje="No hay datos para este producto." />
  } else {
    const encontrada = listaOfertas.find(
      (oferta) => String(oferta.IdProducto) === String(idProducto)
    )
    // por si no coincide el id, usamos la primera
    const ofertaBase = encontrada != null ? encontrada : listaOfertas[0]

    bloqueContenido = (
      <div>
        <h1 className="text-2xl font-bold text-center mb-2">
          {ofertaBase.Nombre}
        </h1>
        <p className="text-center text-slate-600 mb-6">
          Formato: {ofertaBase.Cantidad} {ofertaBase.Unidad}
        </p>
        <p className="text-center text-slate-600">
          Hay {listaOfertas.length} ofertas.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {listaOfertas.map((oferta) => (
            <TarjetaPequena
              key={oferta.IdOferta}
              producto={mapOfertaAProducto(oferta)}
              ocultarBotonVerPrecios
              onOpenProducto={(producto) => {
                if (producto && producto.UrlProducto) window.open(producto.UrlProducto, "_blank");
              }}
              textoExtra={
                <>
                  <p className="text-sm text-slate-500 mt-1">
                    Marca: {oferta.Marca || "—"}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Supermercado: {oferta.Supermercado || "—"}
                  </p>
                </>
              }
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BarraNavegacion />
      <div className="max-w-5xl mx-auto pt-10 px-4">{bloqueContenido}</div>
    </div>
  )
}

export default ProductCompare
