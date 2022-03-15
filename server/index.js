const express = require("express");
// const mysql = require("mysql");
const db = require("./db.js");
const app = express();
const cors = require("cors");

app.use(cors());
// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "admin",
//   database: "wagerdb",
// });

// app.get("/register", (req, res) => {
//   const fname = req.body.fname;
//   const flname = req.body.lname;
//   const gender = req.body.gender;
//   const address = req.body.address;
//   const mail = req.body.mail;
//   const contact = req.body.contact;
//   const skill = req.body.skill;
//   const interest = req.body.interest;

//   db.query(
//     "INSERT INTO person(fname, lname, gender, address, email, contact, skill, interest) VALUES(?, ?, ?,?,?,?,?,?)",
//     [fname, lname, gender, address, mail, contact, skill, interest],
//     (err, result) => {
//       if (errr) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted sucessfully");
//       }
//     }
//   );
// });

app.listen(3001, () => {
  console.log("running on port: 3001");
});
