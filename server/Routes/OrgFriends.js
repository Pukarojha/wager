const express = require("express");
const router = express.Router();
const db = require("../db");

// get for person
// router.post("/get_connect_list_person", (req, res) => {
//   const { idPerson } = req.body;
//   db.query(
//     "SELECT idPerson, CONCAT(fName,' ',lname) AS name, photo FROM person WHERE idPerson<>? AND idPerson NOT IN (SELECT idFollowing FROM follow WHERE typeFollowing='Person')",
//     [idPerson, idPerson],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send({
//           status: "SUCCESS",
//           data: result,
//         });
//       }
//     }
//   );
// });

// get for organization list in organization id
router.post("/get_connect_list_organization", (req, res) => {
  const { idOrganization } = req.body;
  db.query(
    "SELECT idOrganization, oName, photo FROM organization WHERE idOrganization<>? AND idOrganization NOT IN (SELECT idFollowing FROM follow WHERE typeFollower='organization' AND typeFollowing='organization' AND idFollower=?)",
    [idOrganization, idOrganization],
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
// get for person list in organization id
router.post("/get_connect_list_person", (req, res) => {
  const { idOrganization } = req.body;
  db.query(
    `SELECT idPerson, CONCAT(fName,' ',lname) AS name, photo FROM person WHERE idPerson NOT IN (SELECT idFollowing FROM follow WHERE typeFollowing='Person' AND typeFollower='organization' AND idFollower=?)`,
    [idOrganization],
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
// get for org
// follow person
router.post("/person_following", (req, res) => {
  console.log(req.body);
  const { idPerson, followerType, idFollowing, followingType } = req.body;
  db.query(
    "INSERT INTO follow(idFollower, idFollowing, typeFollower, typeFollowing) VALUES (?,?,?,?)",
    [idPerson, idFollowing, followerType, followingType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted sucessfully");
      }
    }
  );
});
// follow organization
router.post("/organization_following", (req, res) => {
  console.log(req.body);
  const { idPerson, followerType, idFollowing, followingType } = req.body;
  db.query(
    "INSERT INTO follow(idFollower, idFollowing, typeFollower, typeFollowing) VALUES (?,?,?,?)",
    [idPerson, idFollowing, followerType, followingType],
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
