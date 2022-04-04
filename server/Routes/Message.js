const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/chat", (req, res) => {
  const { senderId, reciverId, date, message, reciverType } = req.body;
  console.log(senderId, reciverId, date, message);
  db.query(
    "INSERT INTO chat(senderId,reciverId, date, message, reciverType) VALUES(?, ?, ?,?,?)",
    [senderId, reciverId, date, message, reciverType],
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
