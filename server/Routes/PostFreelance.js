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

router.post("/post", upload.single("image"), (req, res) => {
  const { role, skill, experience, text, image, video, idPerson } = req.body;
  console.log(role, skill, experience, text, video, idPerson);

  let path = req.file.destination + req.file.filename;
  console.log(path);
  console.log(role, skill, experience, text, image, video, idPerson);
  db.query(
    "INSERT INTO freelance(roles,skill, experience, text, photo, video, idPerson) VALUES(?, ?, ?,?,?,?,?)",
    [role, skill, experience, text, path, video, idPerson],
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
