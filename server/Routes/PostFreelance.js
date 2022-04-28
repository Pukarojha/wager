const express = require("express");
const router = express.Router();
const db = require("../db");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Work/Freelance/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimetype) => {
  switch (mimetype) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpeg";
    case "image/jpg":
      return ".jpg";
  }
};

const filefilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

router.post("/post", (req, res) => {
  const { role, skill, experience, text, idUser, type } = req.body;
  // console.log(role, skill, experience, text, idUser, type);

  db.query(
    "INSERT INTO work(roles,skill, experience, description, idUser, userType) VALUES(?, ?, ?,?,?,?)",
    [role, skill, experience, text, idUser, type],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send("Values Inserted sucessfully");
        let userID = 0;
        let userType = "Person";
        let description = "New job has been posted";
        let createdDate = Date.now().toString();
        db.query(
          `INSERT INTO notification (idUser, userType, description, createdDate) values (?,?,?,?)`,
          [userID, userType, description, createdDate],
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

module.exports = router;
