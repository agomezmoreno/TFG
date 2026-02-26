const pool = require("../config/db")

function obtenerIdListaActiva(idUsuario) {
  return pool
    .query(
      `
      SELECT IdLista 
      FROM LISTA_COMPRA 
      WHERE IdUsuario = ? AND Nombre = 'Lista actual'
      ORDER BY CreadoEn DESC
      LIMIT 1
    `,
      [idUsuario]
    )
    .then(([filas]) => (filas.length > 0 ? filas[0].IdLista : null))
}

const ListaModel = {
  obtenerOCrearIdListaActiva(idUsuario) {
    return obtenerIdListaActiva(idUsuario).then((idLista) => {
      if (idLista) return idLista
      return pool
        .query(
          `
          INSERT INTO LISTA_COMPRA (IdUsuario, Nombre, CreadoEn)
          VALUES (?, 'Lista actual', NOW())
        `,
          [idUsuario]
        )
        .then(([resultado]) => resultado.insertId)
    })
  },

  obtenerItemsListaActiva(idUsuario) {
    return obtenerIdListaActiva(idUsuario).then((idLista) => {
      if (!idLista) return []
      return pool
        .query(
          `
          SELECT 
            li.IdItem,
            li.Cantidad,
            p.IdProducto,
            p.Nombre,
            p.ImagenURL
          FROM ITEM_LISTA li
          JOIN PRODUCTO p ON p.IdProducto = li.IdProducto
          WHERE li.IdLista = ?
          ORDER BY p.Nombre
        `,
          [idLista]
        )
        .then(([items]) => items)
    })
  },

  añadirItem(idUsuario, idProducto, cantidad) {
    return this.obtenerOCrearIdListaActiva(idUsuario).then((idLista) => {
      return pool
        .query(
          `
          SELECT IdItem, Cantidad
          FROM ITEM_LISTA
          WHERE IdLista = ? AND IdProducto = ?
          LIMIT 1
        `,
          [idLista, idProducto]
        )
        .then(([existente]) => {
          // si ya estaba en la lista, sumamos cantidad
          if (existente.length > 0) {
            const nuevoTotal = Number(existente[0].Cantidad) + Number(cantidad)
            return pool.query(
              `UPDATE ITEM_LISTA SET Cantidad = ? WHERE IdItem = ?`,
              [nuevoTotal, existente[0].IdItem]
            )
          }
          return pool.query(
            `
            INSERT INTO ITEM_LISTA (IdLista, IdProducto, Cantidad)
            VALUES (?, ?, ?)
          `,
            [idLista, idProducto, cantidad]
          )
        })
    })
  },

  actualizarCantidadItem(idItem, cantidad) {
    return pool.query(`UPDATE ITEM_LISTA SET Cantidad = ? WHERE IdItem = ?`, [cantidad, idItem])
  },

  eliminarItem(idItem) {
    return pool.query(`DELETE FROM ITEM_LISTA WHERE IdItem = ?`, [idItem])
  },

  vaciarLista(idUsuario) {
    return obtenerIdListaActiva(idUsuario).then((idLista) => {
      if (!idLista) return Promise.resolve()
      return pool.query(`DELETE FROM ITEM_LISTA WHERE IdLista = ?`, [idLista])
    })
  },
}

module.exports = ListaModel
