const express = require("express");
const router = express.Router();
const db = require("../db");
const app = express();

router.get("/register", (req, res) => {
  const fname = req.body.fname;
  const flname = req.body.lname;
  const gender = req.body.gender;
  const address = req.body.address;
  const mail = req.body.email;
  const contact = req.body.contact;
  const skill = req.body.skills;
  const interest = req.body.interest;

  db.query(
    "INSERT INTO person(fname, lname, gender, address, email, contact, skill, interest) VALUES(?, ?, ?,?,?,?,?,?)",
    [fname, lname, gender, address, mail, contact, skill, interest],
    (err, result) => {
      if (errr) {
        console.log(err);
      } else {
        res.send("Values Inserted sucessfully");
      }
    }
  );
});
module.exports = router;
