const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/get_connect_list_person", (req, res) => {
  const { idPerson } = req.body;
  db.query(
    "SELECT idPerson, CONCAT(fName,' ',lname) AS name, photo FROM person WHERE idPerson<>? AND idPerson NOT IN (SELECT idFollowing FROM follow WHERE typeFollower='Person' AND typeFollowing='Person' AND idFollower=?)",
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

router.post("/raterList", (req, res) => {
  const { idPerson } = req.body;
  db.query(
    "Select person.idPerson, concat(person.fname, ' ',person.lname) as name,  photo, ratings.text, ratings.rating from person join ratings on person.idPerson= ratings.idRater where idPerson=?",
    [idPerson],
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

router.post("/get_connect_list_organization", (req, res) => {
  const { idPerson } = req.body;
  db.query(
    "SELECT idOrganization, oName, photo FROM organization where idOrganization NOT IN (SELECT idFollowing FROM follow WHERE typeFollower='Person' AND idFollower=? AND typeFollowing='Organization')",
    [idPerson],
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

router.post("/person_following", (req, res) => {
  console.log(req.body);
  const { idPerson, followerType, idFollowing, followingType } = req.body;
  const message = `Let's chat!`;
  const date = Date.now().toString();
  db.query(
    "INSERT INTO follow(idFollower, idFollowing, typeFollower, typeFollowing) VALUES (?,?,?,?)",
    [idPerson, idFollowing, followerType, followingType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          `INSERT INTO chat(senderId, reciverId, date, message, reciverType, senderType) VALUES(?,?,?,?,?,?)`,
          [idPerson, idFollowing, date, message, followingType, followerType],
          (err, output) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Values Inserted sucessfully");
            }
          }
        );
      }
    }
  );
});

router.post("/organization_following", (req, res) => {
  console.log(req.body);
  const { idPerson, followerType, idFollowing, followingType } = req.body;
  const message = `Let's chat!`;
  const date = Date.now().toString();
  db.query(
    "INSERT INTO follow(idFollower, idFollowing, typeFollower, typeFollowing) VALUES (?,?,?,?)",
    [idPerson, idFollowing, followerType, followingType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          `INSERT INTO chat(senderId, reciverId, date, message, reciverType, senderType) VALUES(?,?,?,?,?,?)`,
          [idPerson, idFollowing, date, message, followingType, followerType],
          (err, output) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Values Inserted sucessfully");
            }
          }
        );
      }
    }
  );
});

// organization following person
router.post("/org_following_person", (req, res) => {
  console.log(req.body);
  const { idOrganization, followerType, idFollowing, followingType } = req.body;
  // console.log(followerType);
  const message = `Let's chat!`;
  const date = Date.now().toString();
  db.query(
    "INSERT INTO follow(idFollower, idFollowing, typeFollower, typeFollowing) VALUES (?,?,?,?)",
    [idOrganization, idFollowing, followerType, followingType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          `INSERT INTO chat(senderId, reciverId, date, message, reciverType, senderType) VALUES(?,?,?,?,?,?)`,
          [
            idOrganization,
            idFollowing,
            date,
            message,
            followingType,
            followerType,
          ],
          (err, output) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Values Inserted sucessfully");
            }
          }
        );
      }
    }
  );
});

//org following org

router.post("/org_following_org", (req, res) => {
  console.log(req.body);
  const { idOrganization, followerType, idFollowing, followingType } = req.body;
  // console.log(followerType);
  const message = `Let's chat!`;
  const date = Date.now().toString();
  db.query(
    "INSERT INTO follow(idFollower, idFollowing, typeFollower, typeFollowing) VALUES (?,?,?,?)",
    [idOrganization, idFollowing, followerType, followingType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          `INSERT INTO chat(senderId, reciverId, date, message, reciverType, senderType) VALUES(?,?,?,?,?,?)`,
          [
            idOrganization,
            idFollowing,
            date,
            message,
            followingType,
            followerType,
          ],
          (err, output) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Values Inserted sucessfully");
            }
          }
        );
      }
    }
  );
});

//Search
router.post("/person", (req, res) => {
  console.log(req.body);
  const text = req.body.text + "%";

  db.query(
    `Select person.idPerson, concat(person.fName,' ', person.lname) as name, photo from person  where fName like ?`,
    [text],
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

//search organization
router.post("/organization", (req, res) => {
  console.log(req.body);
  const text = req.body.text + "%";

  db.query(
    `Select organization.idOrganization, organization.oName as name, photo from organization  where oName like ?`,
    [text],
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
