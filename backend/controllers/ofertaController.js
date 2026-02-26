const OfertaModel = require('../models/ofertaModel')

exports.obtenerTodas = function (req, res) {
  OfertaModel.obtenerTodas()
    .then(([filas]) => {
      res.json(filas)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({ error: 'Fallo al cargar ofertas' })
    })
}
