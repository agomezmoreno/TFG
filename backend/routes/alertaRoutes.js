const express = require("express");
const router = express.Router();
const alertaController = require("../controllers/alertaController");

router.get("/", alertaController.obtenerAlertasUsuario);

router.post("/", alertaController.crearAlerta);

router.delete("/:id", alertaController.borrarAlerta);

module.exports = router;
