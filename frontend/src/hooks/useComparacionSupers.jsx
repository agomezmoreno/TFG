import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";

// total por super para la lista
function useComparacionSupers(productos) {
    const [comparacion, setComparacion] = useState([]);
    const [cargandoComparacion, setCargandoComparacion] = useState(false);

    useEffect(() => {
        if (!productos || productos.length === 0) {
            setComparacion([]);
            setCargandoComparacion(false);
            return;
        }

        setCargandoComparacion(true);

        const totales = [];

        function procesarProducto(posicion) {
            const terminado = posicion >= productos.length;
            if (terminado) {
                setComparacion(totales.sort((a, b) => a.Total - b.Total));
                setCargandoComparacion(false);
                return;
            }

            const producto = productos[posicion];

            apiGet("/api/compare/" + producto.IdProducto)
                .then(function (ofertas) {
                    if (!ofertas) {
                        procesarProducto(posicion + 1);
                        return;
                    }

                    const cantidad = Number(producto.Cantidad) || 1;

                    for (const oferta of ofertas) {
                        const idSuper = oferta.IdSupermercado;
                        const nombreSuper = oferta.Supermercado;
                        const precio = Number(oferta.PrecioActual) || 0;
                        const subtotal = precio * cantidad;

                        let encontrado = totales.find(
                            (item) => item.IdSupermercado === idSuper
                        );

                        if (!encontrado) {
                            encontrado = {
                                IdSupermercado: idSuper,
                                Supermercado: nombreSuper,
                                Total: 0,
                                Productos: []
                            };
                            totales.push(encontrado);
                        }

                        encontrado.Total += subtotal;

                        encontrado.Productos.push({
                            Nombre: producto.Nombre,
                            Cantidad: cantidad,
                            PrecioUnidad: precio,
                            Subtotal: subtotal
                        })

                    }
                })
                .finally(function () {
                    procesarProducto(posicion + 1);
                })
        }

        procesarProducto(0);
    }, [productos]);

    return { comparacion, cargandoComparacion };
}

export default useComparacionSupers;


