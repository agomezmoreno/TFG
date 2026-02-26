const ListaModel = require("../models/listaModel")

exports.añadirItem = function (req, res) {
  const body = req.body
  // uid o IdUsuario, da igual
  const idUsuario = body.IdUsuario || body.uid
  const idProducto = body.IdProducto
  const cantidad = body.Cantidad || 1

  if (!idUsuario || !idProducto) {
    return res
      .status(400)
      .json({ error: "IdUsuario/uid e IdProducto son obligatorios" })
  }

  ListaModel.añadirItem(idUsuario, idProducto, cantidad)
    .then(() => {
      res.json({ ok: true })
    })
    .catch((error) => {
      console.error("Error en añadirItem:", error)
      res.status(500).json({ error: "Error al añadir a la lista" })
    })
}

exports.obtenerListaActiva = function (req, res) {
  // mismo que en alertas, uid o usuario
  const idUsuario = req.query.uid || req.query.usuario
  if (!idUsuario) {
    return res
      .status(400)
      .json({ error: "Falta el parámetro uid/usuario" })
  }

  ListaModel.obtenerItemsListaActiva(idUsuario)
    .then((items) => {
      res.json(items)
    })
    .catch((error) => {
      console.error("Error en obtenerListaActiva:", error)
      res.status(500).json({ error: "Error al obtener la lista" })
    })
}

exports.actualizarCantidadItem = function (req, res) {
  const idItem = req.params.id
  const cantidad = Number(req.body.Cantidad)

  if (!cantidad || cantidad < 1) {
    return res.status(400).json({ error: "Cantidad inválida" })
  }

  ListaModel.actualizarCantidadItem(idItem, cantidad)
    .then(() => {
      res.json({ ok: true })
    })
    .catch((error) => {
      console.error("Error en actualizarCantidadItem:", error)
      res
        .status(500)
        .json({ error: "Error al actualizar la cantidad" })
    })
}

exports.eliminarItem = function (req, res) {
  const idItem = req.params.id
  ListaModel.eliminarItem(idItem)
    .then(() => {
      res.json({ ok: true })
    })
    .catch((error) => {
      console.error("Error en eliminarItem:", error)
      res.status(500).json({ error: "Error al borrar item" })
    })
}

exports.vaciarLista = function (req, res) {
  const idUsuario = req.query.uid || req.query.usuario

  if (!idUsuario) {
    return res
      .status(400)
      .json({ error: "Falta el parámetro uid/usuario" })
  }

  ListaModel.vaciarLista(idUsuario)
    .then(() => {
      res.json({ ok: true })
    })
    .catch((error) => {
      console.log("vaciarLista error", error)
      res.status(500).json({ error: "Error al vaciar la lista" })
    })
}

