import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BarraNavegacion from "../components/BarraNavegacion";
import BarraBusqueda from "../components/BarraBusqueda";
import TarjetaPequena from "../components/tarjetas/TarjetaPequena";
import Mensaje from "../components/Mensaje";
import getSearchTitle from "../utils/helpers/getSearchTitle";
import { apiGet } from "../utils/api";

// 6 al inicio, luego +6 por cada cargar más
const INCREMENTO = 6;

// ordenados de barato a caro
function ordenarPorPrecio(lista) {
  return [...lista].sort((a, b) => {
    const precioA = Number(a.PrecioActual) || 0;
    const precioB = Number(b.PrecioActual) || 0;
    return precioA - precioB;
  });
}

function SearchResults() {
  const { texto, nombre } = useParams();
  const esCategoria = nombre !== undefined;
  const textoBuscado = esCategoria ? "" : (texto != null ? texto : "");
  const categoriaBuscada = esCategoria ? (nombre != null ? nombre : "") : "";
  const [listaResultados, setListaResultados] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [valorInput, setValorInput] = useState("");
  const [cuantosMostrar, setCuantosMostrar] = useState(INCREMENTO);
  const navigate = useNavigate();

  const textoDeTitulo = getSearchTitle(textoBuscado, categoriaBuscada)

  const alVerComparar = (idProducto) => navigate("/compare/" + idProducto)

  const alBuscar = () => {
    const t = valorInput.trim();
    if (t.length === 0) return;
    navigate(`/search/${encodeURIComponent(t)}`);
    setValorInput("");
  };

  // muestra 6 más
  const alCargarMas = () => setCuantosMostrar((n) => n + INCREMENTO);

  const alAbrirProducto = (producto) => {
    if (producto && producto.UrlProducto) window.open(producto.UrlProducto, "_blank");
  };

  let bloqueResultados = null;
  if (estaCargando) {
    bloqueResultados = <Mensaje mensaje="Cargando resultados..." />;
  } else if (listaResultados.length === 0) {
    bloqueResultados = (
      <Mensaje mensaje={`No se han encontrado productos para ${textoDeTitulo}`} />
    );
  } else {
    const total = listaResultados.length;
    bloqueResultados = (
      <div className="flex flex-col items-center w-full">
        {/* 3 columnas al inicio, 4 al expandir */}
        <div
          className={
            cuantosMostrar <= INCREMENTO
              ? "w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              : "w-full grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
          }
        >
          {listaResultados.slice(0, cuantosMostrar).map((producto) => (
            <TarjetaPequena
              key={producto.IdProducto}
              producto={producto}
              textoExtra={
                <p className="text-sm text-slate-600">
                  Supermercado: {producto.Supermercado}
                </p>
              }
              onClick={alVerComparar}
              onOpenProducto={alAbrirProducto}
            />
          ))}
        </div>
        {/* si quedan más resultados */}
        {total > cuantosMostrar && (
          <button
            type="button"
            onClick={alCargarMas}
            className="mt-8 mb-16 px-6 py-3 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 font-medium transition-colors"
          >
            Cargar más
          </button>
        )}
        {total <= cuantosMostrar && total > 0 && <div className="mb-16" />}
      </div>
    );
  }

  // categoría o texto, una ruta u otra
  useEffect(() => {
    if (esCategoria && nombre) {
      setCuantosMostrar(INCREMENTO)
      setEstaCargando(true);
      apiGet(`/api/search/productos/categoria/${encodeURIComponent(nombre)}`)
        .then((data) => {
          setListaResultados(data ? ordenarPorPrecio(data) : []);
        })
        .finally(() => setEstaCargando(false));
      return;
    }
    if (!esCategoria && texto) {
      setCuantosMostrar(INCREMENTO);
      setEstaCargando(true);
      apiGet(`/api/search/productos/${encodeURIComponent(texto)}`)
        .then((data) => {
          setListaResultados(data ? ordenarPorPrecio(data) : []);
        })
        .finally(() => setEstaCargando(false));
      return;
    }
    setListaResultados([]);
    setEstaCargando(false);
  }, [esCategoria, texto, nombre]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BarraNavegacion />
      <div className="flex flex-col items-center justify-center mt-10">
        <BarraBusqueda valor={valorInput} onChange={setValorInput} onSearch={alBuscar} />
        <h1 className="text-2xl font-bold text-center mt-10 mb-6">
          Resultados para: {textoDeTitulo}
        </h1>
      </div>
      <div className="w-full max-w-7xl mx-auto pt-10 px-4">
        {bloqueResultados}
      </div>
    </div>
  );
}

export default SearchResults;
