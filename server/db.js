const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "wagerdb",
});

module.exports = db;
