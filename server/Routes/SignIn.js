const express = require("express");
const router = express.Router();
const db = require("../db");

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

router.post("/user", (req, res) => {
  //   const { email, password } = req.body;
  let email = req.body.email;
  let password = req.body.password;
  console.log(email, password);

  // Ensure the input fields exists and are not empty
  if (email && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "SELECT * FROM person WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          req.session.loggedin = true;
          req.session.email = email;
          // Redirect to home page
          //   response.redirect("/home");
        } else {
          console.log(req.body.email);
          res.send("Incorrect Email and/or Password!");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter Email and Password!");
    res.end();
  }
});

module.exports = router;
