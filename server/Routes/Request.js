const express = require("express");
const router = express.Router();
const db = require("../db");
const app = express();

router.post("/profile", (req, res) => {
  const { idSender, idReciver, status } = req.body;

  console.log(idSender, idReciver, status);
  db.query(
    "INSERT INTO person( idSender, idReciver, status) VALUES(?, ?, ?)",
    [idSender, idReciver, status],
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
