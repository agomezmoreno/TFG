const express = require("express");
const router = express.Router();
const listaController = require("../controllers/listaController");

router.post("/items", listaController.añadirItem);

router.patch("/items/:id", listaController.actualizarCantidadItem);

router.delete("/items/:id", listaController.eliminarItem);

router.get("/", listaController.obtenerListaActiva);

router.delete("/", listaController.vaciarLista);

module.exports = router;
