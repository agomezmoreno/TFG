const pool = require('../config/db')

function buscarProductosConOfertas({ texto, idSuper, categoria, limite = 50 }) {
  const condiciones = []
  const params = []

  if (texto && texto.trim()) {
    // nombre o titulo de oferta
    const termino = `%${texto.trim()}%`
    condiciones.push('(p.Nombre LIKE ? OR p.ProductoBase LIKE ? OR o.TituloOriginal LIKE ?)')
    params.push(termino, termino, termino)
  }
  if (categoria) {
    condiciones.push('LOWER(p.CategoriaIA) = LOWER(?)')
    params.push(categoria)
  }
  if (idSuper) {
    condiciones.push('s.IdSupermercado = ?')
    params.push(idSuper)
  }

  const where = condiciones.length ? condiciones.join(' AND ') : '1=1'
  params.push(Number(limite))

  const sql = `
    SELECT
      p.IdProducto, p.Nombre, p.CategoriaIA, p.Marca, p.Unidad, p.Cantidad, p.ImagenURL,
      o.IdOferta, o.PrecioActual, o.PrecioUnidad, o.UrlProducto,
      s.IdSupermercado, s.Nombre AS Supermercado
    FROM PRODUCTO p
    JOIN PRODUCTO_OFERTA o ON o.IdProducto = p.IdProducto
    JOIN SUPERMERCADO s ON s.IdSupermercado = o.IdSupermercado
    WHERE ${where}
    ORDER BY COALESCE(o.PrecioUnidad, o.PrecioActual)
    LIMIT ?
  `

  return pool.query(sql, params)
}

module.exports = { buscarProductosConOfertas }
