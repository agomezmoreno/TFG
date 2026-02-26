import { useState, useEffect } from "react"
import BarraNavegacion from "../components/BarraNavegacion"
import { useNavigate } from "react-router-dom"
import TarjetaPequena from "../components/tarjetas/TarjetaPequena"
import BarraBusqueda from "../components/BarraBusqueda"
import BloqueSeccion from "../components/bloques/BloqueSeccion"
import TarjetaInfo from "../components/tarjetas/TarjetaInfo"
import Mensaje from "../components/Mensaje"
import getImagenCategoria from "../utils/helpers/getImagenCategoria"
import mapOfertaAProducto from "../utils/helpers/mapOfertaAProducto"
import { apiGet } from "../utils/api"
import { mostrarMensaje } from "../utils/mensajes/mensajeModal"
import buscarImg from "../assets/buscar.png"
import listaImg from "../assets/lista.png"
import dineroImg from "../assets/dinero.png"
import supermercado1Img from "../assets/supermercado1.jpg"
import supermercado2Img from "../assets/supermercado2.jpg"

function ordenarPorPrecio(lista) {
  return [...lista].sort((a, b) => {
    const precioA = Number(a.PrecioActual) || 0
    const precioB = Number(b.PrecioActual) || 0
    return precioA - precioB
  })
}

function Home() {
  const [valor, setValor] = useState("")
  const categorias = ["Fruta", "Verdura", "Carne", "Pescado"]
  const [ofertas, setOfertas] = useState([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  const alClicCategoria = (nombreCategoria) => {
    navigate(`/search/categoria/${encodeURIComponent(nombreCategoria)}`)
  }

  const alBuscar = () => {
    const texto = valor.trim()
    if (texto.length === 0) return
    navigate(`/search/${encodeURIComponent(texto)}`)
  }

  const alVerPrecios = (idProducto) => {
    navigate("/compare/" + idProducto)
  }

  const alAbrirProducto = (oferta) => () => {
    if (oferta.UrlProducto) {
      window.open(oferta.UrlProducto, "_blank")
    } else {
      mostrarMensaje("No hay enlace al supermercado disponible", "info")
    }
  }

  
  let bloqueOfertas = null
  if (cargando) {
    bloqueOfertas = <Mensaje mensaje="Cargando ofertas" />
  } else if (ofertas.length === 0) {
    bloqueOfertas = <Mensaje mensaje="No hay ofertas" />
  } else {
    // mostramos solo 3
    const ofertasMostradas = ofertas.slice(0, 3)
    bloqueOfertas = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ofertasMostradas.map((oferta) => (
          <TarjetaPequena
            key={oferta.IdOferta}
            onClick={alVerPrecios}
            producto={mapOfertaAProducto(oferta)}
            textoExtra={
              <>
                <p className="text-sm text-slate-600">Marca: {oferta.Marca}</p>
                <p className="text-sm text-slate-500 mt-1">
                  Supermercado: {oferta.Supermercado || "-"}
                </p>
              </>
            }
            ocultarBotonVerPrecios={false}
            onOpenProducto={alAbrirProducto(oferta)}
          />
        ))}
      </div>
    )
  }

  const bloqueCategorias = (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            onClick={() => alClicCategoria(categoria)}
            className="bg-white border border-slate-200 rounded p-8 flex flex-col items-center hover:bg-slate-50"
          >
            <img
              src={getImagenCategoria(categoria)}
              alt={categoria}
              className="w-12 h-12 object-cover rounded mb-2"
            />
            <span className="text-sm">{categoria}</span>
          </button>
        ))}
      </div>
    </div>
  )

  const bloqueComofunciona = (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl">
        <TarjetaInfo
          imagen={buscarImg}
          titulo="Buscar"
          descripcion="Encuentra lo que necesitas rápido."
        />
        <TarjetaInfo
          imagen={listaImg}
          titulo="Crear lista"
          descripcion="Añade solo lo que realmente necesitas."
        />
        <TarjetaInfo
          imagen={dineroImg}
          titulo="Ahorrar al comprar"
          descripcion="Compara precios entre supermercados."
        />
      </div>
    </div>
  )

  // fruta para el bloque de abajo
  useEffect(() => {
    setCargando(true)
    apiGet("/api/search/productos/categoria/Fruta")
      .then((data) => {
        if (data) {
          const ordenadas = ordenarPorPrecio(data)
          setOfertas(ordenadas)
        } else {
          setOfertas([])
        }
      })
      .finally(() => setCargando(false))
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BarraNavegacion />
      <div
        className="relative w-full h-100 bg-cover bg-center flex flex-col items-center justify-center px-4 min-h-[280px] py-10"
        style={{ backgroundImage: `url(${supermercado1Img})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-white text-3xl font-bold mb-4 drop-shadow-lg text-center">
            ¿Qué estás buscando hoy?
          </h1>
          <BarraBusqueda valor={valor} onChange={setValor} onSearch={alBuscar} />
        </div>
      </div>
      <div className="max-w-5xl mx-auto pt-10 px-4 space-y-16">
        <BloqueSeccion titulo="Categorías" contenido={bloqueCategorias} />
        <BloqueSeccion
          titulo="Lo más barato en fruta"
          contenido={bloqueOfertas}
        />
      </div>
      <section
        className="mt-16 bg-cover bg-center relative py-16 text-white"
        style={{ backgroundImage: `url(${supermercado2Img})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10">
          <BloqueSeccion
            titulo="Cómo funciona"
            contenido={bloqueComofunciona}
          />
        </div>
      </section>
      <footer className="text-center text-sm text-slate-600 py-6 border-t border-slate-200">
        <p>ComparaYA © 2025</p>
      </footer>
    </div>
  )
}

export default Home
