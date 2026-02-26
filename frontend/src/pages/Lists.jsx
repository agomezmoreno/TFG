import BarraNavegacion from "../components/BarraNavegacion";
import TarjetaLista from "../components/tarjetas/TarjetaLista";
import BloqueComparacion from "../components/bloques/BloqueComparacion";
import useUsuario from "../hooks/useUsuario";
import useListaActual from "../hooks/useListaActual";
import useComparacionSupers from "../hooks/useComparacionSupers";
import { actualizarCantidadAPI, eliminarProductoAPI, vaciarListaAPI } from "../utils/servicios/listas";
import { mostrarConfirmar } from "../utils/mensajes/mensajeModal";

function Lists() {
  const { usuario, cargando: cargandoUsuario } = useUsuario();
  const { productos, cargando: cargandoListas, setProductos } =
    useListaActual(usuario != null ? usuario.uid : null)
  const { comparacion, cargandoComparacion } =
    useComparacionSupers(productos)

  const alCambiarCantidad = (producto, diferencia) => {
    const nuevaCantidad = Number(producto.Cantidad) + diferencia;
    if (nuevaCantidad < 1) return;

    const nuevosProductos = productos.map((item) =>
      item.IdItem === producto.IdItem
        ? { ...item, Cantidad: nuevaCantidad }
        : item
    );
    setProductos(nuevosProductos);
    actualizarCantidadAPI(producto.IdItem, nuevaCantidad);
  };

  const alEliminarProducto = (producto) => {
    mostrarConfirmar("¿Eliminar este producto?", () => {
      const nuevosProductos = productos.filter(
        (item) => item.IdItem !== producto.IdItem
      );
      setProductos(nuevosProductos);
      eliminarProductoAPI(producto.IdItem);
    }, "Eliminar");
  };

  const alVaciarLista = () => {
    mostrarConfirmar("¿Vaciar toda la lista?", () => {
      setProductos([])
      if (usuario) vaciarListaAPI(usuario.uid)
    }, "Vaciar");
  };

  const alCambiarCantidadDe = (producto) => (diferencia) =>
    alCambiarCantidad(producto, diferencia);

  if (cargandoUsuario) {
    return (
      <div className="min-h-screen bg-slate-50">
        <BarraNavegacion />
        <div className="flex justify-center items-center flex-1 py-20">
          <p className="text-slate-700 text-lg">Cargando usuario...</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="min-h-screen bg-slate-50">
        <BarraNavegacion />
        <div className="flex justify-center items-center flex-1 py-20">
          <p className="text-red-600 text-lg">
            Debes iniciar sesión para ver tus listas.
          </p>
        </div>
      </div>
    );
  }

  let bloqueLista = null
  if (cargandoListas) {
    bloqueLista = (
      <p className="text-center text-slate-600 mt-8">
        Cargando lista actual...
      </p>
    );
  } else if (!productos || productos.length === 0) {
    bloqueLista = (
      <p className="text-center text-slate-600 mt-8">
        Tu lista está vacía.
      </p>
    );
  } else {
    bloqueLista = (
      <div className="bg-white rounded p-6 mt-4 border border-slate-200">
        <button
          type="button"
          onClick={alVaciarLista}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Vaciar lista
        </button>
        <div className="mt-6 space-y-4">
          {productos.map((producto) => (
            <TarjetaLista
              key={producto.IdItem}
              producto={producto}
              onChangeCantidad={alCambiarCantidadDe(producto)}
              onEliminar={() => alEliminarProducto(producto)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <BarraNavegacion />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Tu lista de la compra
        </h1>
        {bloqueLista}
        <div className="mt-12">
          <BloqueComparacion
            productos={productos}
            cargando={cargandoComparacion}
            comparacion={comparacion}
          />
        </div>
      </div>
    </div>
  );
}

export default Lists;
