const express = require("express");
const router = express.Router();
const db = require("../db");
const app = express();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/");
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

router.post("/profile", upload.single("image"), (req, res) => {
  const { fname, lname, gender, email, address, contact, skills, intrest } =
    req.body;

  let path = req.file.destination + req.file.filename;
  console.log(path);
  console.log(fname, lname, gender, email, address, contact, skills, intrest);
  db.query(
    "INSERT INTO person(fname, lname, gender, address, email, contact, skill, interest, photo) VALUES(?, ?, ?,?,?,?,?,?,?)",
    [fname, lname, gender, address, email, contact, skills, intrest, path],
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
