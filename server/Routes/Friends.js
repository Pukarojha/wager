const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/get_connect_list", (req, res) => {
  const { idPerson } = req.body;
  db.query(
    "SELECT idPerson, CONCAT(fName,' ',lname) AS name, photo FROM person WHERE idPerson<>? AND idPerson NOT IN (SELECT idReciver FROM palsrequest WHERE idSender=?)",
    [idPerson, idPerson],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: "SUCCESS",
          data: result,
        });
      }
    }
  );
});

module.exports = router;
