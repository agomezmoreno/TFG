const express = require('express');
const router = express.Router();
const comparatorController = require('../controllers/comparatorController');

router.get('/:productId', comparatorController.obtenerComparacion);

module.exports = router;
