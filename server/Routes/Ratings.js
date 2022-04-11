const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/rating", (req, res) => {
  const { text, rating, idPerson } = req.body;
  console.log(text, rating, idPerson);
  db.query(
    "INSERT INTO personrating(text ,rating, idPerson) VALUES(?, ?, ?)",
    [text, rating, idPerson],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted sucessfully");
      }
    }
  );
});

module.exports = router;
