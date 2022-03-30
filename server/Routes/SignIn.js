const express = require("express");
const router = express.Router();
const db = require("../db");
const session = require("express-session");

const app = express();
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

router.post("/person", (req, res) => {
  //   const { email, password } = req.body;
  let email = req.body.email;
  let password = req.body.password;
  // console.log(email, password);

  // Ensure the input fields exists and are not empty
  // if (email && password) {
  // Execute SQL query that'll select the account from the database based on the specified username and password
  db.query(
    "SELECT * FROM person WHERE email = ? ",
    email,
    // AND password = ?",
    // [email, password],
    function (err, results, fields) {
      // If there is an issue with the query, output the error
      // if (error) throw error;
      if (err) {
        console.log(err);
      }
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        // req.session.loggedin = true;
        // req.session.email = email;
        // // Redirect to home page
        // response.redirect("/redir");

        if (password == results[0].password) {
          res.json({ loggedIn: true, email: email });
        } else {
          res.json({
            loggedIn: false,
            message: "Wrong user name/password",
          });
        }
      } else {
        // console.log(req.body.email);
        // res.send("Incorrect Email and/or Password!");
        // res.send("User doesn't exist!");
        res.json({ loggedIn: false, message: "User doesn't exist" });
      }
      res.end();
    }
  );
  // } else {
  //   res.send("Please enter Email and Password!");
  //   res.end();
  // }
});

module.exports = router;
