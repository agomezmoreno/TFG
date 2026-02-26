const pool = require("../config/db")

const AlertaModel = {
  obtenerPorUsuario(uid) {
    return pool
      .query(
        `
        SELECT 
          a.IdAlerta,
          a.IdProducto,
          p.Nombre AS NombreProducto,
          p.ImagenURL,
          a.Tipo,
          a.Umbral,
          a.Canal,
          a.Activa,
          a.CreadoEn
        FROM ALERTA_PRECIO a
        JOIN PRODUCTO p ON p.IdProducto = a.IdProducto
        WHERE a.IdUsuario = ?
        ORDER BY a.CreadoEn DESC
      `,
        [uid]
      )
      .then(([filas]) => filas)
  },

  crear(uid, idProducto, tipo, umbral, canal) {
    return pool
      .query(
        `
        INSERT INTO ALERTA_PRECIO
          (IdUsuario, IdProducto, Tipo, Umbral, Canal, Activa, CreadoEn)
        VALUES (?, ?, ?, ?, ?, 1, NOW())
      `,
        [uid, idProducto, tipo, umbral, canal]
      )
      .then(([resultado]) => resultado.insertId)
  },

  borrar(idAlerta) {
    return pool.query(`DELETE FROM ALERTA_PRECIO WHERE IdAlerta = ?`, [idAlerta])
  },
}

module.exports = AlertaModel
