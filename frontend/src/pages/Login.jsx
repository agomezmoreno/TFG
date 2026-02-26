import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import BarraNavegacion from "../components/BarraNavegacion"
import {
  loginConEmail,
  loginConGoogle,
  loginConGitHub,
} from "../utils/auth/getLoginYRegistro"
import loginyregistroImg from "../assets/loginyregistro.jpg"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const alIniciarConEmail = loginConEmail(email, password, navigate)
  const alIniciarConGoogle = loginConGoogle(navigate)
  const alIniciarConGithub = loginConGitHub(navigate)

  const alCambiarEmail = (e) => setEmail(e.target.value)
  const alCambiarPassword = (e) => setPassword(e.target.value)

  return (
    <div className="min-h-screen flex flex-col relative">
      <div
        className="absolute inset-0 -z-10 min-w-full min-h-full"
        style={{
          backgroundImage: `url(${loginyregistroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(10px)",
        }}
      />
      <BarraNavegacion />
      <div className="flex flex-1 items-center justify-center px-4">
        {/* card del form */}
        <div className="bg-white shadow p-8 rounded max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">
            Inicia Sesión
          </h1>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              placeholder="Correo electrónico"
              onChange={alCambiarEmail}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <input
              type="password"
              value={password}
              placeholder="Contraseña"
              onChange={alCambiarPassword}
              className="border border-slate-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button
              type="button"
              onClick={alIniciarConEmail}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={alIniciarConGoogle}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Iniciar sesión con Google
            </button>
            <button
              type="button"
              onClick={alIniciarConGithub}
              className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900"
            >
              Iniciar sesión con GitHub
            </button>
            {/* enlace a registro si no tiene cuenta */}
            <span className="text-center text-sm text-slate-700 mt-2">
              ¿Aún no tienes cuenta?{" "}
              <Link to="/register" className="text-green-600 hover:underline">
                Regístrate
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
