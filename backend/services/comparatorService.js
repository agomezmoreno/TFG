const pool = require('../config/db');

// ofertas por super para un producto (una por super, por ProductoBase)
function obtenerComparacionProducto(idProducto) {
  return pool.query(
    `
    SELECT 
      o.IdOferta,
      o.IdProducto,
      p.Nombre,
      p.Marca,
      p.Cantidad,
      p.Unidad,
      p.ImagenURL,
      o.PrecioActual,
      o.PrecioUnidad,
      o.UrlProducto,
      s.IdSupermercado,
      s.Nombre AS Supermercado
    FROM PRODUCTO_OFERTA o
    JOIN PRODUCTO p 
      ON p.IdProducto = o.IdProducto
    JOIN SUPERMERCADO s 
      ON s.IdSupermercado = o.IdSupermercado
    JOIN (
      SELECT 
        po.IdSupermercado,
        MAX(po.IdOferta) AS MaxIdOferta
      FROM PRODUCTO_OFERTA po
      JOIN PRODUCTO p2 ON p2.IdProducto = po.IdProducto
      WHERE p2.ProductoBase = (
        SELECT ProductoBase 
        FROM PRODUCTO 
        WHERE IdProducto = ?
      )
      GROUP BY po.IdSupermercado
    ) ult
      ON ult.IdSupermercado = o.IdSupermercado
     AND ult.MaxIdOferta   = o.IdOferta
    WHERE p.ProductoBase = (
      SELECT ProductoBase 
      FROM PRODUCTO 
      WHERE IdProducto = ?
    );
  `,
    [idProducto, idProducto]
  );
}

module.exports = { obtenerComparacionProducto };
