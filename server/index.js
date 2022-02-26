const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "edureka",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO login_person (Cid, Fname, Lname, Email, Gender, Country, Phone, Skills, Interest) VALUES (001, 'Ram', 'Potheneni', 'ram@ram.com', 'male', 'nep', '978555', 'java,c, c#');";
//   db.query(sqlInsert, (err, result) => {
//     res.send("Hello Worldie");
//   });
// });

app.post("/api/insert", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const sqlInsert =
    "INSERT INTO login_person (Cid, Fname, Lname, Email, Gender, Country, Phone, Skills, Interest) VALUES (?, ?, ?. ?, ? ,?, ?,?, ?, ?);";
  db.query(
    sqlInsert,
    [Cid, Fname, Lname, Email, Gender, Country, Phone, Skills, Interest],
    (err, result) => {
      console.log(err);
    }
  );
});

app.listen(3001, () => {
  console.log("running on port: 3001");
});
