import BarraNavegacion from "../components/BarraNavegacion";
import Mensaje from "../components/Mensaje";
import useUsuario from "../hooks/useUsuario";
import useCargarAlertas from "../hooks/useCargarAlertas";
import { logout } from "../utils/auth/getLoginYRegistro";

function Profile() {
  const { usuario, cargando } = useUsuario();
  // cierra sesión y redirige
  const alCerrarSesion = logout();

  const { alertas, cargandoAlertas, eliminarAlerta } = useCargarAlertas(
    usuario != null ? usuario.uid : null
  );

  const alEliminarAlerta = (alerta) => eliminarAlerta(alerta.IdAlerta);

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-50">
        <BarraNavegacion />
        <div className="max-w-3xl mx-auto px-4 pt-16">
          <Mensaje mensaje="Cargando usuario..." />
        </div>
      </div>
    );
  }

  if (!usuario) {
    // no logueado
    return (
      <div className="min-h-screen bg-slate-50">
        <BarraNavegacion />
        <div className="max-w-3xl mx-auto px-4 pt-16">
          <Mensaje mensaje="No has iniciado sesión" />
        </div>
      </div>
    );
  }

  // inicial para avatar cuando no hay foto
  const inicialNombre =
    (usuario.nombre && usuario.nombre.charAt(0).toUpperCase()) ||
    (usuario.email && usuario.email.charAt(0).toUpperCase()) ||
    "?";

  const bloquePerfil = (
    <div className="bg-white border border-slate-200 rounded p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="shrink-0">
          {usuario.foto ? (
            <img
              src={usuario.foto}
              alt="Foto de perfil"
              className="w-20 h-20 rounded-full border-2 border-slate-200 object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full border-2 border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 text-xl font-semibold">
              {inicialNombre}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {usuario.nombre || "Usuario"}
          </h1>
          <p className="text-slate-600 text-sm mb-1">{usuario.email}</p>
        </div>
        <button
          type="button"
          onClick={alCerrarSesion}
          className="px-4 py-2 text-sm rounded border border-red-300 text-red-600 hover:bg-red-50"
        >
          Cerrar sesión
        </button>
      </div>
      <a
        href={`https://t.me/ComparaYA_bot?start=${usuario.uid}`}
        target="_blank"
        rel="noopener noreferrer"
        className="boton-morado mt-4 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded bg-purple-600 text-white hover:bg-purple-700"
      >
        Vincular mis alertas con Telegram
      </a>
    </div>
  );

  let bloqueAlertas = null;
  if (cargandoAlertas) {
    bloqueAlertas = (
      <p className="text-center text-slate-600">Cargando alertas...</p>
    );
  } else if (!alertas || alertas.length === 0) {
    bloqueAlertas = (
      <p className="text-center text-slate-600">No tienes alertas.</p>
    );
  } else {
    bloqueAlertas = (
      <div className="bg-white border border-slate-200 rounded p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Tus alertas ({alertas.length})
        </h2>
        <ul className="space-y-3">
          {alertas.map((alerta) => (
            <li
              key={alerta.IdAlerta}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-slate-200 rounded px-4 py-3 hover:bg-slate-50"
            >
              <div className="flex items-start gap-3 flex-1">
                {alerta.ImagenURL ? (
                  <img
                    src={alerta.ImagenURL}
                    alt={alerta.NombreProducto || "Producto"}
                    className="w-12 h-12 rounded border border-slate-200 object-contain bg-white"
                  />
                ) : (
                  <div className="w-12 h-12 rounded border border-slate-200 bg-slate-100" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-800 truncate">
                    {alerta.NombreProducto || `Producto #${alerta.IdProducto}`}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-0.5 text-[11px] rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {alerta.Tipo}
                    </span>
                    <span className="px-2 py-0.5 text-[11px] rounded-full bg-green-50 text-green-700 border border-green-200">
                      Umbral: {alerta.Umbral}€
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alEliminarAlerta(alerta)}
                className="self-start sm:self-auto px-3 py-1.5 text-xs rounded border border-red-300 text-red-600 hover:bg-red-50 shrink-0"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <BarraNavegacion />
      <main className="max-w-4xl mx-auto px-4 py-10">
        {bloquePerfil}
        {bloqueAlertas}
      </main>
    </div>
  );
}

export default Profile;
