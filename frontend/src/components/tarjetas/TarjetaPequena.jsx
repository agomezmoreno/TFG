import { useState, useEffect } from "react";
import { apiPost } from "../../utils/api";
import { auth } from "../../utils/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { mostrarMensaje } from "../../utils/mensajes/mensajeModal";
import ModalCrearAlerta from "../modales/ModalCrearAlerta";

function TarjetaPequena({
  producto,
  onClick,
  onOpenProducto,
  buttonText = "Ver precios",
  textoExtra,
  ocultarBotonVerPrecios = false,
}) {
  const [usuario, setUsuario] = useState(null);
  const [modalAlertaAbierto, setModalAlertaAbierto] = useState(false);

  // para mostrar botones que requieren login
  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (user) => setUsuario(user));
    return () => desuscribir();
  }, []);

  function añadirALista(idProducto) {
    if (!usuario) {
      mostrarMensaje("Debes iniciar sesión para usar las listas", "error");
      return;
    }
    apiPost("/api/lists/items", {
      uid: usuario.uid,
      IdProducto: idProducto,
      Cantidad: 1,
    })
      .then((data) => {
        if (!data) {
          mostrarMensaje("No se ha podido añadir a la lista", "error");
          return;
        }
        mostrarMensaje("Añadido a la lista", "success");
      })
      .catch(() => {
        mostrarMensaje(
          "No se ha podido añadir a la lista (error servidor)",
          "error"
        );
      });
  }

  // click en la card abre url del producto
  const alClicEnCard = () => onOpenProducto && onOpenProducto(producto);

  const alAbrirModalAlerta = (e) => {
    e.stopPropagation();
    setModalAlertaAbierto(true);
  };

  const alCerrarModalAlerta = () => setModalAlertaAbierto(false);

  const alAñadirALista = (e) => {
    e.stopPropagation();
    añadirALista(producto.IdProducto);
  };

  const alVerPrecios = (e) => {
    e.stopPropagation();
    onClick && onClick(producto.IdProducto);
  };

  const mostrarBotonAñadirLista = Boolean(usuario);
  const mostrarSoloBotonAlerta = ocultarBotonVerPrecios && usuario;
  const mostrarBotonesVerPreciosYAlerta = !ocultarBotonVerPrecios;

  // añadir a lista solo si hay usuario
  let bloqueAñadirALista = null;
  if (mostrarBotonAñadirLista) {
    bloqueAñadirALista = (
      <button
        type="button"
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={alAñadirALista}
      >
        Añadir a lista
      </button>
    );
  }

  // ver precios mas alerta, o solo alerta si ocultarBotonVerPrecios
  let bloqueBotones = null;
  if (mostrarSoloBotonAlerta) {
    bloqueBotones = (
      <button
        type="button"
        className="mt-4 w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 text-sm"
        onClick={alAbrirModalAlerta}
      >
        Crear alerta
      </button>
    );
  } else if (mostrarBotonesVerPreciosYAlerta) {
    bloqueBotones = (
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 text-sm"
          onClick={alVerPrecios}
        >
          {buttonText}
        </button>
        {usuario && (
          <button
            type="button"
            className="flex-1 bg-purple-500 text-white rounded py-2 hover:bg-purple-600 text-sm"
            onClick={alAbrirModalAlerta}
          >
            Crear alerta
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-sm border border-slate-200 bg-white p-5 rounded flex flex-col cursor-pointer"
      onClick={alClicEnCard}
    >
      <img
        src={producto.ImagenURL}
        alt={producto.Nombre}
        className="w-full h-40 object-contain rounded mb-4 bg-white"
      />
      <h3 className="font-semibold text-base mb-1">{producto.Nombre}</h3>
      <p className="text-green-600 font-semibold mt-3">{producto.PrecioActual} €</p>
      {textoExtra}
      {bloqueBotones}
      {bloqueAñadirALista}
      <ModalCrearAlerta
        open={modalAlertaAbierto}
        onClose={alCerrarModalAlerta}
        idProducto={producto.IdProducto}
        usuario={usuario}
      />
    </div>
  );
}

export default TarjetaPequena;
