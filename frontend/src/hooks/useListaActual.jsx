import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";


// lista del usuario, se pide cuando hay uid
function useListaActual(uid) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

      if (!uid) {
        setProductos([]);
        setCargando(false);
        return;
      }
        
      apiGet("/api/lists?uid=" + uid)
        .then(function (data) {
            if (data) {
                setProductos(data);
            } else {
                setProductos([]);
              }
            })
            .finally(function () {
              setCargando(false);
            });    

    }, [uid])


    return { productos, cargando, setProductos }
}

export default useListaActual