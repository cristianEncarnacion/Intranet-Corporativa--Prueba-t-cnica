const express = require("express");
const router = express.Router();
const { sql } = require("../db");

router.use(express.json());

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql.query`
      SELECT id, nombre_completo, descripcion FROM usuarios WHERE id = ${id};`;

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;

  try {
    const result = await sql.query`
      UPDATE Usuarios
      SET descripcion = ${descripcion}
      WHERE id = ${id};`;

    if (result.rowsAffected[0] > 0) {
      return res.status(200).send("Descripción actualizada correctamente");
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
