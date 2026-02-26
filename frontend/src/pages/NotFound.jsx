import { Link } from "react-router-dom";
import BarraNavegacion from "../components/BarraNavegacion";

// página para rutas que no existen
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <BarraNavegacion />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <p className="text-6xl font-bold text-slate-400 mb-2">404</p>
        <p className="text-lg text-slate-700 mb-8 text-center max-w-sm">
          No se ha podido encontrar la página.
        </p>
        {/* vuelve a home */}
        <Link
          to="/"
          className="px-5 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 text-sm"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
