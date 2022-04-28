const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/rating", (req, res) => {
  const { idRater, raterType, idUser, text, ratings, userType } = req.body;
  // console.log(idRater, raterType, idUser, text, ratings, userType);
  console.log(req.body);
  db.query(
    "INSERT INTO ratings(idUser ,idRater, text,rating, userType, raterType) VALUES(?, ?, ?,?,?,?)",
    [idUser, idRater, text, ratings, userType, raterType],
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
