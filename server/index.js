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

const pass = require("./Routes/pass");
const SignIn = require("./Routes/SignIn");

// const message = require("./Routes/Chat");

// all routes
app.use("/registers", registration);
app.use("/register", registerOrganization);
app.use("/registers", pass);
app.use("/login", SignIn);

// app.use("/chat", message);

app.listen(5001, () => {
  console.log("running on port: 5001");
});
