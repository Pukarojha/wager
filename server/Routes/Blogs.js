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

// router.post("/createBlog", upload.single("image"), (req, res) => {
//   // const { text, video, idPerson } = req.body;
//   // let path = req.file.destination + req.file.filename;
//   const { idPerson, userType, text: editorText } = req.body;
//   console.log(req.body);
//   db.query(
//     "INSERT INTO blog(text,image, video, idPerson) VALUES(?, ?, ?, ?)",
//     [text, path, video, idPerson],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted sucessfully");
//       }
//     }
//   );
// });

// router.post("/create", (req, res) => {
//   const { text, video, idPerson } = req.body;
//   db.query(
//     "INSERT INTO blog(text, image, video, idPerson) VALUES(?, ?, ?, ?)",
//     [text, "", video, idPerson],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted sucessfully");
//       }
//     }
//   );
// });

router.post("/createBlog", (req, res) => {
  const { idUser, userType, text } = req.body;
  console.log(userType);
  db.query(`INSERT INTO blogs(idUser, userType, text) VALUES(?,?,?)`, [
    idUser,
    userType,
    text,
  ]),
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted sucessfully");
      }
    };
});

router.post("/ocreateBlog", (req, res) => {
  const { idUser, userType, text } = req.body;
  db.query(`INSERT INTO blogs(idUser, userType, text) VALUES(?,?,?)`, [
    idUser,
    userType,
    text,
  ]),
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted sucessfully");
      }
    };
});

router.post("/get_blog_list", (req, res) => {
  const { idPerson } = req.body;
  db.query(
    // "SELECT person.idPerson, CONCAT(person.fName,' ',person.lname) AS name, person.photo, blog.text, blog.image from person join blog on person.idPerson = blog.idPerson;",
    "SELECT person.idPerson, CONCAT(person.fName,' ',person.lname) AS name, person.photo, blogs.text from person join blogs on person.idPerson = blogs.idUser where blogs.userType='Person';",

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
router.post("/get_orgBlogList", (req, res) => {
  db.query(
    `Select organization.idOrganization, organization.oName as name, organization.photo, blogs.text from organization join blogs on organization.idOrganization= blogs.idUser where blogs.userType='Organization'`,
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
