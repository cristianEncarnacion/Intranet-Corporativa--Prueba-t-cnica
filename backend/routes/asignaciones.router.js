const express = require("express");
const router = express.Router();
const { sql } = require("../db");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const result = await sql.query`
       
SELECT 
    A.descripcion AS Asignacion,
    U.nombre_completo AS Empleado,
    A.fecha_asignacion,A.id
FROM 
    Asignaciones A
JOIN 
    Usuarios U ON A.nombre_usuario = U.nombre_usuario;
      `;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error al obtener asignaciones");
  }
});

router.post("/", async (req, res) => {
  const { asignacion, empleado_id } = req.body;
  console.log(req.body);

  try {
    await sql.query`
        INSERT INTO Asignaciones (descripcion, nombre_usuario)
        VALUES (${asignacion}, ${empleado_id});
      `;
    res.status(201).json({ message: "Asignación creada correctamente" });
  } catch (err) {
    res.status(500).send("Error al crear la asignación");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql.query`
        DELETE FROM Asignaciones WHERE id = ${id};
      `;

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Asignación eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Asignación no encontrada" });
    }
  } catch (err) {
    res.status(500).send("Error al eliminar la asignación");
  }
});

module.exports = router;
