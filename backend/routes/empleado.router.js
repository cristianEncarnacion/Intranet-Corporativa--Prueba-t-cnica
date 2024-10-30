const express = require("express");
const router = express.Router();
const { sql } = require("../db");

router.use(express.json());

router.get("/usuarios-con-departamento", async (req, res) => {
  try {
    const result =
      await sql.query`SELECT nombre_completo,nombre_usuario FROM Usuarios where rol_id=2`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.get("/", async (req, res) => {
  try {
    const result = await sql.query`
    SELECT 
        U.nombre_usuario, 
        u.id,
        D.nombre AS nombre_departamento
    FROM 
        usuarios U
    JOIN 
        departamentos D ON U.departamento_id = D.id
    WHERE 
        U.rol_id = 2;
`;

    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { nombre_usuario, contrasena, rol, departamento, nombre_completo } =
    req.body;

  try {
    const checkUser = await sql.query`
          SELECT COUNT(*) AS count FROM Usuarios WHERE nombre_usuario = ${nombre_usuario};
      `;

    if (checkUser.recordset[0].count > 0) {
      return res
        .status(400)
        .json({ error: "El nombre de usuario ya está en uso" });
    }

    if (contrasena.length < 6) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const result = await sql.query`
          INSERT INTO Usuarios (nombre_usuario, contraseña, departamento_id, rol_id, nombre_completo) 
          VALUES (${nombre_usuario}, ${contrasena}, ${departamento}, ${rol}, ${nombre_completo});
      `;

    res.status(201).json({ message: "Empleado creado correctamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql.query`
        DELETE FROM usuarios WHERE id = ${id}
      `;
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Empleado eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Empleado no encontrado" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
