import { useState, useEffect } from "react";
import { auth } from "../../utils/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ModalCrearAlerta from "../modales/ModalCrearAlerta";

// producto con ver precios y crear alerta si hay usuario
function Tarjeta({ producto, onClick, onOpenProducto }) {
  const [usuario, setUsuario] = useState(null);
  const [modalAlertaAbierto, setModalAlertaAbierto] = useState(false);

  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (user) => setUsuario(user));
    return () => desuscribir();
  }, []);

  const alClicEnCard = () => onOpenProducto && onOpenProducto(producto);

  const alVerPrecios = (e) => {
    e.stopPropagation();
    onClick && onClick(producto.IdProducto);
  };

  const alAbrirModalAlerta = (e) => {
    e.stopPropagation();
    setModalAlertaAbierto(true);
  };

  const alCerrarModalAlerta = () => setModalAlertaAbierto(false);

  // stopPropagation es para no disparar alClicEnCard
  return (
    <div
      className="border border-slate-200 bg-white p-4 rounded mb-10 max-w-md mx-auto cursor-pointer"
      onClick={alClicEnCard}
    >
      <img
        src={producto.ImagenURL}
        alt={producto.Nombre}
        className="w-full h-40 object-contain rounded mb-3 bg-white"
      />
      <h3 className="font-semibold text-lg mb-1">{producto.Nombre}</h3>
      <p className="text-sm text-slate-600">
        Supermercado: {producto.Supermercado}
      </p>
      <p className="text-green-600 font-bold mt-2 text-lg">
        {producto.PrecioActual} €
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
          onClick={alVerPrecios}
        >
          Ver precios
        </button>
        {usuario && (
          <button
            type="button"
            className="flex-1 bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
            onClick={alAbrirModalAlerta}
          >
            Crear alerta
          </button>
        )}
      </div>
      <ModalCrearAlerta
        open={modalAlertaAbierto}
        onClose={alCerrarModalAlerta}
        idProducto={producto.IdProducto}
        usuario={usuario}
      />
    </div>
  );
}

export default Tarjeta;
