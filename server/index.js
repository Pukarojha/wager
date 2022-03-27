const express = require("express");
const db = require("./db.js");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// provide access to images from uploads folder
app.use("/uploads", express.static("uploads"));

// routes
// registration route
const registration = require("./Routes/Register");

const registerOrganization = require("./Routes/RegisterOrganization");

// all routes
app.use("/register", registration);
app.use("/register", registerOrganization);

app.listen(5001, () => {
  console.log("running on port: 5001");
});
