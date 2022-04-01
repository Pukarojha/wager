const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/rating", (req, res) => {
  const { text, rating } = req.body;
  console.log(text, rating);
  db.query(
    "INSERT INTO rating(text,rating) VALUES(?, ?)",
    [text, rating],
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
