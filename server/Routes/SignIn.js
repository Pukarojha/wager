const express = require("express");
const router = express.Router();
const db = require("../db");
const session = require("express-session");

const app = express();

router.post("/person", async (req, res) => {
  try {
    // student details
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
        "SELECT * FROM person WHERE email = ?",
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
                user: "Person",
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

// login organization
router.post("/organization", async (req, res) => {
  try {
    // student details
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
        "SELECT * FROM organization WHERE oEmail = ?",
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
                user: "Organization",
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
            console.log(result);
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

module.exports = router;
