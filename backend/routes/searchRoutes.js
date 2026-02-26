const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/productos/categoria/:nombre', searchController.buscarPorCategoria);
router.get('/productos/:texto', searchController.buscarPorTexto);

module.exports = router;
