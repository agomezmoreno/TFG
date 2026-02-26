import { useState, useEffect } from "react"
import { apiGet } from "../utils/api";
import { eliminarAlertaAPI } from "../utils/servicios/alertas";
import { mostrarMensaje, mostrarConfirmar } from "../utils/mensajes/mensajeModal";

function useCargarAlertas(uid) {
    const [alertas, setAlertas] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        if (!uid) {
            setAlertas([])
            setCargando(false)
            return
        }

        setCargando(true)

        apiGet("/api/alerts?uid=" + uid)
            .then((data) => {
                setAlertas(data || [])
            })
            .catch(() => {
                console.log("Error obteniendo alertas")
                setAlertas([])
            })
            .finally(() => {
                setCargando(false)
            })
    }, [uid])


    function eliminarAlerta(id) {
        mostrarConfirmar("¿Eliminar esta alerta?", () => {
            eliminarAlertaAPI(id)
                .then(() => {
                    setAlertas((prev) => prev.filter((e) => e.IdAlerta !== id))
                })
                .catch(() => {
                    mostrarMensaje("Error al eliminar la alerta", "error")
                })
        }, "Eliminar")
    }

    return { alertas, cargando, eliminarAlerta }
}

export default useCargarAlertas
