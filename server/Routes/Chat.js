const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/get_personList", (req, res) => {
  const { idPerson, senderType } = req.body;
  db.query(
    "SELECT chat.idchat, chat.senderId, chat.reciverId,  CONCAT(person.fName,' ',person.lname) AS name, person.photo from chat left join person on chat.reciverId= person.idPerson where senderId=? and senderType= ? AND reciverType = 'Person' ;",
    [idPerson, senderType],
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

router.post("/organizationList", (req, res) => {
  const { idOrganization, senderType } = req.body;
  db.query(
    "SELECT chat.idchat, chat.senderId, chat.reciverId,  organization.oName, organization.photo from chat left join organization on chat.reciverId= organization.idOrganization where senderId=? and senderType= ? AND reciverType = 'Organization' ;",
    [idOrganization, senderType],
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
