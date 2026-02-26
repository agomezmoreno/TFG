import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/auth/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function BarraNavegacion() {
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // escucha auth, limpia al desmontar
  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (user) => setUsuario(user));
    return () => desuscribir();
  }, []);

  const alCerrarSesion = () => {
    signOut(auth);
    setMenuAbierto(false);
  };

  const alCerrarMenu = () => setMenuAbierto(false);

  // toggle menú hamburguesa en móvil
  const alAbrirCerrarMenu = () => setMenuAbierto((abierto) => !abierto);

  const usuarioLogueado = Boolean(usuario);

  // logueado: perfil y cerrar sesión; si no: login y registro
  let bloqueEnlacesUsuario = null;
  if (usuarioLogueado) {
    bloqueEnlacesUsuario = (
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
        {usuario.photoURL && (
          <img
            src={usuario.photoURL}
            alt={usuario.displayName || "Avatar"}
            className="w-8 h-8 rounded-full border border-slate-300"
          />
        )}
        <Link
          to="/profile"
          onClick={alCerrarMenu}
          className="text-slate-700 hover:text-blue-600 py-2 md:py-0"
        >
          {usuario.displayName || usuario.email}
        </Link>
        <button
          type="button"
          onClick={alCerrarSesion}
          className="px-3 py-2 md:py-1 bg-red-500 text-white rounded hover:bg-red-600 text-left md:text-center"
        >
          Cerrar sesión
        </button>
      </div>
    );
  } else {
    bloqueEnlacesUsuario = (
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <Link
          to="/login"
          onClick={alCerrarMenu}
          className="px-3 py-2 md:py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/register"
          onClick={alCerrarMenu}
          className="px-3 py-2 md:py-1 bg-slate-200 text-slate-800 rounded hover:bg-slate-300 text-center"
        >
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <nav className="w-full bg-white border-b border-slate-200 px-4 md:px-6 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap md:flex-nowrap">
        <Link
          to="/"
          onClick={alCerrarMenu}
          className="text-xl font-bold text-slate-800"
        >
          Compara<span className="text-green-600">YA</span>
        </Link>
        {/* solo visible en móvil */}
        <button
          type="button"
          onClick={alAbrirCerrarMenu}
          className="md:hidden p-2 rounded text-slate-600 hover:bg-slate-100"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="text-2xl leading-none">
            {menuAbierto ? "×" : "☰"}
          </span>
        </button>
        {/* enlaces: oculto en móvil hasta abrir menú */}
        <div
          className={
            "w-full md:w-auto flex flex-col md:flex-row md:items-center gap-1 md:gap-6 text-slate-700 " +
            (menuAbierto ? "flex" : "hidden md:flex")
          }
        >
          <Link
            to="/"
            onClick={alCerrarMenu}
            className="py-2 md:py-0 hover:text-green-600 border-b md:border-0 border-slate-200"
          >
            Inicio
          </Link>
          <Link
            to="/lists"
            onClick={alCerrarMenu}
            className="py-2 md:py-0 hover:text-green-600 border-b md:border-0 border-slate-200"
          >
            Listas
          </Link>
          {bloqueEnlacesUsuario}
        </div>
      </div>
    </nav>
  );
}

export default BarraNavegacion;
