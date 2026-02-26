import { apiPatch, apiDelete } from "../api";

export function actualizarCantidadAPI(idItem, nuevaCantidad) {
  return apiPatch("/api/lists/items/" + idItem, {
    Cantidad: nuevaCantidad,
  });
}

export function eliminarProductoAPI(idItem) {
  return apiDelete("/api/lists/items/" + idItem)
}

export function vaciarListaAPI(uid) {
  return apiDelete("/api/lists?uid=" + uid)
}
