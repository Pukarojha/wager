const express = require("express");
const router = express.Router();
const db = require("../db");
const session = require("express-session");

const app = express();

router.post("/login", async (req, res) => {
  try {
    // admin details
    let { email, password } = req.body;

    // validation and register
    if (email == "" || password == "") {
      res.json({
        loggedIn: false,
        message: "Empty credentials supplied!",
      });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      res.json({
        loggedIn: false,
        message: "Invalid email entered!",
      });
    } else if (password.length < 4) {
      res.json({
        loggedIn: false,
        message: "Password is too short!",
      });
    } else {
      db.query(
        "SELECT * FROM admin WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            res.json({
              loggedIn: false,
              message: "An error occured while checking for user account!",
            });
          } else if (result.length) {
            if (result[0].password === password) {
              res.json({
                loggedIn: true,
                message: "Signin Successful.",
                data: result[0],
              });
            } else {
              res.json({
                loggedIn: false,
                message: "Invalid password entered!",
              });
            }

            // const hashedPassword = result[0].password;
            // bcrypt
            //   .compare(password, hashedPassword)
            //   .then((output) => {
            //     if (output) {
            //       res.json({
            //         status: "SUCCESS",
            //         message: "Signin Successful.",
            //         data: result[0],
            //       });
            //     } else {
            //       res.json({
            //         status: "FAILED",
            //         message: "Invalid password entered!",
            //       });
            //     }
            //   })
            //   .catch((err) => {
            //     res.json({
            //       status: "FAILED",
            //       message: "An error occuured while hasing password!",
            //     });
            //   });
          } else {
            res.json({
              status: "FAILED",
              message: "No such email exists!",
            });
          }
        }
      );
    }
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

router.get("/managePerson", (err, res) => {
  db.query(
    `select idPerson, concat(person.fName,' ', person.lname) as name, gender, address, email, contact, skill, interest, photo, password, confirm from person`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        res.send({
          data: data,
        });
      }
    }
  );
});

router.get("/manageOrganization", (err, res) => {
  db.query(
    `Select idOrganization, oName as name, pNum, regNum, oEmail as email, address, contact, zipCode, postalCode, photo, password, confirm from organization`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        res.send({
          data: data,
        });
      }
    }
  );
});

router.get("/chartData", (req, res) => {
  try {
    let data = [
      { name: "Person", TotalPerson: 0 },
      { name: "Organiation", TotalOrganization: 0 },
    ];
    db.query(
      `Select count(person.idPerson) as TotalPerson from person`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          data[0].TotalPerson = result[0].TotalPerson;
          db.query(
            `Select count(organization.idOrganization) as TotalOrganization from organization`,
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                data[1].TotalOrganization = result[0].TotalOrganization;
                res.json({
                  data: data,
                });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.post("/viewPerson", (req, res) => {
  try {
    const { idUser } = req.body;
    db.query(
      `select idPerson, person.fName, person.lname,  concat(person.fName,' ', person.lname) as name, gender, address, email, contact, skill, interest, photo, password, confirm from person where idPerson=?`,
      [idUser],
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            data: data[0],
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.post("/viewOrg", (req, res) => {
  try {
    const { idUser } = req.body;
    db.query(
      `select idOrganization, organization.oName as name, pNum, regNum, oEmail as email, contact, address, zipCode, photo, postalCode,password,  confirm from organization where idOrganization=?`,
      [idUser],
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            data: data[0],
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.post("/editProfile", (req, res) => {
  try {
    const {
      idUser,
      fname,
      lname,
      gender,
      address,
      email,
      contact,
      skills,
      interest,
    } = req.body;
    console.log(req.body);
    db.query(
      `Update person SET fName=?, lName=?,  gender=?, address=?, email=?, contact=?, skill=?, interest=? where idPerson=? `,
      [fname, lname, gender, address, email, contact, skills, interest, idUser],
      (err, result) => {
        if (err) {
          // console.log(err);
          res.json({
            status: "FAILED",
            message: "An error occured while updating",
          });
        } else {
          res.json({
            // data: data[0],
            status: "SUCCESS",
            message: "Updated sucessfully!",
          });
          // res.send("Sucessful!");
          console.log("Sucessful");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteProfile", (req, res) => {
  const idPerson = req.body;
  try {
    db.query(`Delete * from person where ?`, [idPerson], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted Sucessfully");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
