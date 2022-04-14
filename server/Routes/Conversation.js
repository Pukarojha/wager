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
  db.query(
    `SELECT DISTINCT chat.reciverId, chat.reciverType, CONCAT(person.fName,' ',person.lname) AS name, person.photo from chat left join person on chat.reciverId= person.idPerson where senderId=? and senderType=? AND reciverType = 'Person'`,
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

router.post("/get_single_person", (req, res) => {
  const { idPerson, senderType, reciverId, reciverType } = req.body;
  db.query(
    `SELECT * FROM chat where (senderID=? AND senderType=? AND  reciverId=? AND reciverType=? ) OR (senderID=? AND senderType=? AND  reciverId=? AND reciverType=? )`,
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
        console.log(result);
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
  db.query(
    `SELECT chat.idchat, chat.senderId, chat.reciverId,  organization.oName, organization.photo from chat left join organization on chat.reciverId= organization.idOrganization where senderId=? and senderType=? AND reciverType = 'Organization'`,
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

router.post(`/msg`, (req, res) => {
  const { senderId, reciverId, date, message, reciverType, senderType } =
    req.body;
  db.query(
    "INSERT INTO chat (senderId, reciverId, date, message, reciverType, senderType) VALUES(?,?,?, ?,?, ?)",
    [senderId, reciverId, date, message, reciverType, senderType],
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
