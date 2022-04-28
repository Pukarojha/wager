const express = require("express");
const router = express.Router();
const db = require("../db");
// const app = express();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Work/Job/");
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

// router.post("/profile", (req, res) => {
//   res.send({ data: "This is the data" });
// });

// router.post("/post", upload.single("image"), (req, res) => {
router.post("/post", (req, res) => {
  const { role, skill, experience, text, idPerson, userType } = req.body;

  db.query(
    "INSERT INTO work(roles, skill, experience, description, idUser, userType) VALUES(?,?,?,?,?,?)",
    [role, skill, experience, text, idPerson, userType],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send("Values Inserted sucessfully");
        let userID = 0;
        let userType = "Person";
        let description = "New work has been posted";
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
