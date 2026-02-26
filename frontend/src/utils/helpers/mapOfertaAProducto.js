// normaliza oferta al formato producto (nombre, imagen, precio, etc)
function mapOfertaAProducto(oferta) {
  return {
    ImagenURL: oferta.ImagenURL,
    Nombre:
      oferta.NombreProducto ||
      oferta.Nombre ||
      oferta.ProductoNombre ||
      "Producto sin nombre",
    Supermercado:
      oferta.Supermercado ||
      oferta.Marca ||
      oferta.Tienda ||
      "-",
    PrecioActual: oferta.PrecioActual,
    IdProducto: oferta.IdProducto,
    UrlProducto: oferta.UrlProducto,
  };
}

export default mapOfertaAProducto;
