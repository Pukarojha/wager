const express = require("express");
const router = express.Router();
const db = require("../db");

//person getting  personlist
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
  console.log(req.body);
  const { idPerson, senderType, reciverId, reciverType } = req.body;
  db.query(
    //`SELECT chat.senderId, reciverId, date, message, reciverType, senderType, person.photo,  CONCAT(person.fName,' ',person.lname) as name FROM chat join person on chat.reciverId= person.idPerson where (senderID=? AND senderType=? AND  reciverId=? AND reciverType=? ) OR (senderID=? AND senderType=? AND  reciverId=? AND reciverType=? )`,
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
        res.send({
          status: "SUCCESS",
          data: result,
        });
      }
    }
  );
});
// person getting org list
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

// person id -getting-> chatlist organization
router.post("/get_single_org", (req, res) => {
  console.log(req.body);

  const { senderType, reciverId, reciverType, photo } = req.body;
  let idPerson = parseInt(req.body.idPerson);
  db.query(
    // `Select * from chat where (senderId=? AND senderType=? AND reciverId=? AND reciverType=?) OR (senderId=? AND senderType=? AND reciverId=? AND reciverType=?)`,
    // [
    //   idPerson,
    //   senderType,
    //   reciverId,
    //   reciverType,
    //   reciverId,
    //   reciverType,
    //   idPerson,
    //   senderType,
    // ],

    `Select * from chat where (senderId=20 and reciverId=14 and senderType='Person' and reciverType='organization') or (senderId=14 and reciverId=20 and senderType='Organization' and reciverType='Person')`,
    [
      idPerson,
      reciverId,
      senderType,
      reciverType,
      reciverId,
      idPerson,
      reciverType,
      senderType,
    ],

    // [idPerson, reciverId, reciverId, idPerson],
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

// organization routes org

//person list

//Organization belongings:

// org getting person list

router.post("/org_getPersonLIst", (req, res) => {
  const { idOrganization, senderType } = req.body;
  let data = [];
  db.query(
    `SELECT person.idPerson,CONCAT(person.fName,' ',person.lname) AS name,  person.photo , follow.typeFollowing as type from person left join follow on person.idPerson= follow.idFollowing where (idfollower=? AND typeFollower='organization') AND (follow.typeFollowing = "Person")`,
    [idOrganization],
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
          `SELECT person.idPerson, concat(person.fName, ' ' , person.lname) AS name, person.photo , follow.typeFollowing as type from person left join follow on person.idPerson= follow.idFollower where (idFollowing=? AND typeFollowing='Organization') AND (follow.typeFollower = "Person")`,
          [idOrganization],
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

// org getting org list
router.post("/org_get_orgList", (req, res) => {
  const { idOrganization, senderType } = req.body;
  let data = [];
  db.query(
    `SELECT organization.idOrganization, organization.oName, organization.photo, follow.typeFollowing as type from organization left join follow on organization.idOrganization= follow.idFollowing where (idfollower=? AND typeFollower='organization') AND(organization.idOrganization <>?) AND (follow.typeFollowing = "Organization")`,
    [idOrganization, idOrganization],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length) {
          for (let i = 0; i < result.length; i++) {
            data.push({
              idOrganization: result[i].idOrganization,
              name: result[i].oName,
              photo: result[i].photo,
              type: result[i].type,
            });
          }
        }
        db.query(
          `SELECT organization.idOrganization, oName, organization.photo, follow.typeFollower as type from organization left join follow on organization.idOrganization= follow.idFollower where (idFollowing=? AND typeFollowing='organization') AND(organization.idOrganization <>?) AND (follow.typeFollower = "organization")`,
          [idOrganization, idOrganization],
          (err, output) => {
            if (err) {
              console.log(err);
            } else {
              if (output.length) {
                for (let i = 0; i < output.length; i++) {
                  data.push({
                    idOrganization: output[i].idOrganization,
                    name: output[i].oName,
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

//user: organization loading single person
//org getting  single person
router.post("/org_getSingle_person", (req, res) => {
  console.log(req.body);
  const { idPerson, senderType, reciverId, reciverType } = req.body;
  db.query(
    // `SELECT chat.senderId, reciverId, date, message, reciverType, senderType, person.photo,  CONCAT(person.fName,' ',person.lname) as name FROM chat join person on chat.reciverId= person.idPerson where (senderID=? AND senderType=? AND  reciverId=? AND reciverType=? ) OR (senderID=? AND senderType=? AND  reciverId=? AND reciverType=? )`,
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

//org getting single org

module.exports = router;
