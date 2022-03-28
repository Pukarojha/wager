const express = require("express");
const router = express.Router();
const db = require("../db");
const app = express();

router.post("/pass", (req, res) => {
  const { password, confirm } = req.body;

  // console.log(path);
  console.log(password, confirm);
  db.query(
    "INSERT INTO person(password, confirm) VALUES(password, confirm)",
    [password, confirm],
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
