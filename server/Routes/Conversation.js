// const { Socket } = require("socket.io");
// const db = require("../db");
// const router = require("express").Router();

// router.post("/chat", async (req, res) => {
//   const newConversation = new Conversation({
//     members: [req.body.senderId, req.body.reciverId],
//   });
//   try {
//     const savedConversation = await newConversation.save();
//     res.status(200).json(savedConversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/get_personList", (req, res) => {
  const { idPerson, senderType } = req.body;
  let data = [];
  db.query(
    `SELECT person.idPerson, CONCAT(person.fName,' ',person.lname) AS name, person.photo, follow.typeFollowing as type from Person left join follow on person.idPerson= follow.idFollowing where (idfollower=? AND typeFollower='Person') AND(person.idPerson <>?) AND (follow.typeFollowing = "Person")`,
    [idPerson, idPerson, idPerson],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length) {
          for (let i = 0; i < result.length; i++) {
            data.push({
              idPerson: result[i].idPerson,
              name: result[i].name,
              photo: result[i].photo,
              type: result[i].type,
            });
          }
        }
        db.query(
          `SELECT person.idPerson, CONCAT(person.fName,' ',person.lname) AS name, person.photo, follow.typeFollower as type from Person left join follow on person.idPerson= follow.idFollower where (idFollowing=? AND typeFollowing='Person') AND(person.idPerson <>?) AND (follow.typeFollower = "Person")`,
          [idPerson, idPerson],
          (err, output) => {
            if (err) {
              console.log(err);
            } else {
              if (output.length) {
                for (let i = 0; i < output.length; i++) {
                  data.push({
                    idPerson: output[i].idPerson,
                    name: output[i].name,
                    photo: output[i].photo,
                    type: output[i].type,
                  });
                }
              }
              res.send({
                status: "SUCCESS",
                data: data,
              });
            }
          }
        );
      }
    }
  );
});

router.post("/get_single_person", (req, res) => {
  const { idPerson, senderType, reciverId, reciverType } = req.body;
  db.query(
    `SELECT chat.senderId, reciverId, date, message, reciverType, senderType, person.photo,  CONCAT(person.fName,' ',person.lname) as name FROM chat join person on chat.reciverId= person.idPerson where (senderID=? AND senderType=? AND  reciverId=? AND reciverType=? ) OR (senderID=? AND senderType=? AND  reciverId=? AND reciverType=? )`,
    // `SELECT * FROM chat where (senderID=? AND senderType=? AND  reciverId=? AND reciverType=? ) OR (senderID=? AND senderType=? AND  reciverId=? AND reciverType=? )`,
    [
      idPerson,
      senderType,
      reciverId,
      reciverType,
      reciverId,
      reciverType,
      idPerson,
      senderType,
    ],
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

router.post("/getOlist", (req, res) => {
  const { idPerson, senderType } = req.body;
  let data = [];
  db.query(
    `SELECT organization.idOrganization, oName AS name, organization.photo , follow.typeFollowing as type from organization left join follow on organization.idOrganization= follow.idFollowing where (idfollower=? AND typeFollower='Person') AND (follow.typeFollowing = "Organization")`,
    [idPerson],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length) {
          for (let i = 0; i < result.length; i++) {
            data.push({
              idPerson: result[i].idOrganization,
              name: result[i].name,
              photo: result[i].photo,
              type: result[i].type,
            });
          }
        }
        db.query(
          `SELECT organization.idOrganization, oName AS name, organization.photo , follow.typeFollowing as type from organization left join follow on organization.idOrganization= follow.idFollowing where (idFollowing=? AND typeFollowing='Person') AND (follow.typeFollower = "Organization")`,
          [idPerson],
          (err, output) => {
            if (err) {
              console.log(err);
            } else {
              if (output.length) {
                for (let i = 0; i < output.length; i++) {
                  data.push({
                    idPerson: output[i].idOrganization,
                    name: output[i].name,
                    photo: output[i].photo,
                    type: output[i].type,
                  });
                }
              }
              res.send({
                status: "SUCCESS",
                data: data,
              });
            }
          }
        );
      }
    }
  );
});

//chatlist organization
router.post("/get_single_org", (req, res) => {
  const { idPerson, senderType, reciverId, reciverType } = req.body;
  db.query(
    `SELECT chat.senderId, reciverId, date, message, reciverType, senderType, person.photo,  CONCAT(person.fName,' ',person.lname) as name FROM chat join person on chat.reciverId= person.idPerson where (senderID=? AND senderType='Person' AND reciverId=? AND reciverType='Organization') OR (senderID=? AND senderType='Organization' AND reciverId=? AND reciverType='Person')`,
    [idPerson, reciverId, reciverId, idPerson],
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

router.post(`/msg`, (req, res) => {
  const { senderID, reciverId, date, message, reciverType, senderType } =
    req.body;
  db.query(
    "INSERT INTO chat (senderId, reciverId, date, message, reciverType, senderType) VALUES(?,?,?, ?,?, ?)",
    [senderID, reciverId, date, message, reciverType, senderType],
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
