const express = require("express");
const router = express.Router();
const { sql } = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await sql.query`
        SELECT 
        * FROM Posts;
        `;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error al obtener publicaciones");
  }
});

router.post("/", async (req, res) => {
  const { titulo, contenido } = req.body;

  try {
    await sql.query`
            INSERT INTO Posts (titulo, contenido)
            VALUES (${titulo}, ${contenido});
        `;
    res.status(201).json({ message: "Post creado correctamente" });
  } catch (err) {
    res.status(500).send("Error al crear el post");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido } = req.body;

  try {
    await sql.query`
            UPDATE Posts
            SET titulo = ${titulo}, contenido = ${contenido}
            WHERE id = ${id};
        `;
    res.status(200).json({ message: "Post actualizado correctamente" });
  } catch (err) {
    res.status(500).send("Error al actualizar el post");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await sql.query`
            DELETE FROM Posts
            WHERE id = ${id};
        `;
    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (err) {
    res.status(500).send("Error al eliminar el post");
  }
});

router.post("/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { texto } = req.body;

  try {
    await sql.query`
            INSERT INTO Comments (post_id, texto)
            VALUES (${postId}, ${texto});
        `;
    res.status(201).json({ message: "Comentario creado correctamente" });
  } catch (err) {
    res.status(500).send("Error al crear el comentario");
  }
});

router.delete("/:postId/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;

  try {
    await sql.query`
            DELETE FROM Comments
            WHERE id = ${commentId};
        `;
    res.status(200).json({ message: "Comentario eliminado correctamente" });
  } catch (err) {
    res.status(500).send("Error al eliminar el comentario");
  }
});

module.exports = router;
