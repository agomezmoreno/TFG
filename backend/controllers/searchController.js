const SearchModel = require('../models/searchModel');

function ejecutarBusqueda(opciones, res) {
  SearchModel.buscarProductosConOfertas(opciones)
    .then(([filas]) => res.json(filas))
    .catch((error) => {
      console.error('Error en búsqueda:', error);
      res.status(500).json({ error: 'Error al buscar productos' });
    });
}

function buscarPorCategoria(req, res) {
  const { nombre } = req.params
  const { superId, limit } = req.query
  // por defecto 50 resultados
  ejecutarBusqueda({
    texto: '',
    idSuper: superId || null,
    categoria: nombre || null,
    limite: limit || 50,
  }, res)
}

function buscarPorTexto(req, res) {
  const { texto } = req.params
  const { superId, limit } = req.query
  ejecutarBusqueda({
    texto: texto || '',
    idSuper: superId || null,
    categoria: null,
    limite: limit || 50,
  }, res)
}

module.exports = {
  buscarPorCategoria,
  buscarPorTexto,
};
