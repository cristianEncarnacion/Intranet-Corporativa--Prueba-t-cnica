const express = require("express");
const router = express.Router();
const { sql } = require("../db");
const bcrypt = require("bcrypt");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const result =
      await sql.query`SELECT nombre_usuario, contraseña FROM usuarios`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    const result = await sql.query`
      SELECT nombre_usuario, contraseña, rol_id FROM usuarios WHERE nombre_usuario = ${nombre_usuario};
    `;

    if (result.recordset.length > 0) {
      const user = result.recordset[0];

      if (user.contraseña === contrasena) {
        return res.status(200).json({
          mensaje: "Usuario encontrado",
          usuario: {
            nombre_usuario: user.nombre_usuario,
            rol: user.rol_id,
          },
        });
      } else {
        const isMatch = await bcrypt.compare(contrasena, user.contraseña);

        if (isMatch) {
          return res.status(200).json({
            mensaje: "Usuario encontrado",
            usuario: {
              nombre_usuario: user.nombre_usuario,
              rol: user.rol_id,
            },
          });
        } else {
          return res.status(401).send("Contraseña incorrecta");
        }
      }
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
