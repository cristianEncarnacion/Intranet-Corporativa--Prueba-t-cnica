// Archivo de backend, rutas de asignaciones

const express = require("express");
const router = express.Router();
const { sql } = require("../db");

router.use(express.json());

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await sql.query`
      SELECT 
          A.descripcion AS Asignacion,
          U.nombre_completo AS Empleado,
          A.fecha_asignacion, 
          A.id
      FROM 
          Asignaciones A
      JOIN 
          Usuarios U ON A.nombre_usuario = U.nombre_usuario
      WHERE 
          U.id = ${userId};  -- Filtramos por el userId del usuario logueado
    `;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error al obtener asignaciones");
  }
});

module.exports = router;
