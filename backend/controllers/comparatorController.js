const comparatorService = require('../services/comparatorService')

exports.obtenerComparacion = function (req, res) {
  const idProducto = req.params.productId

  comparatorService.obtenerComparacionProducto(idProducto)
    .then(([filas]) => {
      // no hay ofertas para ese producto
      if (filas.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' })
      }
      res.json(filas)
    })
    .catch((error) => {
      console.error('Error en obtenerComparacion:', error)
      res.status(500).json({ error: 'Error al obtener comparación' })
    })
}
