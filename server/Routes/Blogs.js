const express = require("express");
const router = express.Router();
const db = require("../db");
// const app = express();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/post/img/");
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

router.post("/createBlog", upload.single("image"), (req, res) => {
  const { text, video, idPerson } = req.body;
  let path = req.file.destination + req.file.filename;
  db.query(
    "INSERT INTO blog(text,image, video, idPerson) VALUES(?, ?, ?, ?)",
    [text, path, video, idPerson],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted sucessfully");
      }
    }
  );
});

router.post("/create", (req, res) => {
  const { text, video, idPerson } = req.body;
  db.query(
    "INSERT INTO blog(text, image, video, idPerson) VALUES(?, ?, ?, ?)",
    [text, "", video, idPerson],
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
