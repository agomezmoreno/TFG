const AlertaModel = require("../models/alertaModel")

exports.obtenerAlertasUsuario = function (req, res) {
  // viene uid o usuario, da igual
  const uid = req.query.uid || req.query.usuario

  if (!uid) {
    return res.status(400).json({ error: "Falta parámetro uid" })
  }

  AlertaModel.obtenerPorUsuario(uid)
    .then((filas) => {
      res.json(filas)
    })
    .catch((error) => {
      console.error("Error en obtenerAlertasUsuario:", error)
      res.status(500).json({ error: "Error al obtener alertas" })
    })
}

exports.crearAlerta = function (req, res) {
  const body = req.body

  const uid = body.uid || body.IdUsuario
  const idProducto = body.IdProducto
  const tipoBruto = (body.Tipo || "").toString().toLowerCase()
  const umbral = body.Umbral
  let canal = body.Canal

  if (!uid || !idProducto || !tipoBruto || umbral == null || !canal) {
    return res.status(400).json({ error: "Faltan datos de la alerta" })
  }

  let tipo
  if (tipoBruto === "baja") {
    tipo = "BAJADA"
  } else if (tipoBruto === "umbral") {
    tipo = "UMBRAL"
  } else {
    return res.status(400).json({ error: "Tipo de alerta no válido. Usa: umbral o bajada." })
  }

  // telegram o email, lo pasamos a mayúsculas
  canal = canal.toLowerCase() === "telegram" ? "TELEGRAM" : "EMAIL"

  AlertaModel.crear(uid, idProducto, tipo, umbral, canal)
    .then((idInsertado) => {
      res.json({ ok: true, IdAlerta: idInsertado })
    })
    .catch((error) => {
      console.error("Error en crearAlerta:", error)
      res.status(500).json({ error: "Error al crear alerta" })
    })
}

exports.borrarAlerta = function (req, res) {
  const idAlerta = req.params.id

  if (!idAlerta) {
    return res.status(400).json({ error: "Falta IdAlerta" })
  }

  AlertaModel.borrar(idAlerta)
    .then(() => {
      res.json({ ok: true })
    })
    .catch((error) => {
      console.log("borrarAlerta:", error)
      res.status(500).json({ error: "No se pudo borrar la alerta" })
    })
}
