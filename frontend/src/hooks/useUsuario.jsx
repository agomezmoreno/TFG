import { useEffect, useState } from "react"
import { auth } from "../utils/auth/firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function useUsuario() {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario({
          uid: user.uid,
          email: user.email,
          nombre: user.displayName,
          foto: user.photoURL,
        })
      } else {
        setUsuario(null)
      }
      setCargando(false)
    })
    return cancelar
  }, [])

  return { usuario, cargando }
}
