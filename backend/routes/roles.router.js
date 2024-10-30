const express = require("express");
const router = express.Router();
const { sql } = require("../db");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const result = await sql.query`
    SELECT nombre,id from Roles;
`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
