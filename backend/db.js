const sql = require("mssql");
const config = require("./config/dbConfig");

const connectionToDb = async () => {
  try {
    await sql.connect(config);
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sql, connectionToDb };
