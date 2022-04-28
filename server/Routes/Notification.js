const db = require("../db");
const express = require("express");
const router = express.Router();

router.post("/post_person", (req, res) => {
  let { idPerson } = req.body;
  db.query(
    `Select * from notification where (idUser= ? and userType='Person') OR (idUser= 0 and userType='Person')`,
    [idPerson],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          result: result,
        });
        // res.send(result);
      }
    }
  );
});
router.post("/post_organization", (req, res) => {
  let { idOrganization } = req.body;
  db.query(
    `Select * from notification where (idUser= ? and userType='Person') OR (idUser= 0 and userType='Person')`,
    [idOrganization],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
