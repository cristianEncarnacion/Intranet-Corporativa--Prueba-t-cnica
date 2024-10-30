const dotenv = require("dotenv");
dotenv.config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Si estás utilizando cifrado
    trustServerCertificate: true, // Cambia esto según tu configuración
  },
};

module.exports = config;
