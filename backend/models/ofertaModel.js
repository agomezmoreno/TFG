const pool = require('../config/db')

const OfertaModel = {
  obtenerTodas: () => {
    return pool.query(`
      SELECT 
        o.IdOferta,
        o.IdProducto,
        o.IdSupermercado,
        o.TituloOriginal,
        o.UrlProducto,
        o.PrecioActual,
        o.PrecioUnidad,
        p.Nombre AS NombreProducto,
        p.Categoria,
        p.Marca,
        p.Unidad,
        p.Cantidad,
        p.ImagenURL,
        s.Nombre AS Supermercado,
        s.WebURL
      FROM PRODUCTO_OFERTA o
      JOIN PRODUCTO p ON p.IdProducto = o.IdProducto
      JOIN SUPERMERCADO s ON s.IdSupermercado = o.IdSupermercado;
    `)
  },
}

module.exports = OfertaModel
