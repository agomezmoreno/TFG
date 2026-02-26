const express = require('express');
const router = express.Router();
const ofertaController = require('../controllers/ofertaController');

router.get('/', ofertaController.obtenerTodas);

module.exports = router;
