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

// const pass = require("./Routes/pass");
const SignIn = require("./Routes/SignIn");
const Home = require("./Routes/Home");

//for chat and messaging
const chat = require("./Routes/Conversation");
const rating = require("./Routes/Ratings");
const blog = require("./Routes/Blogs");

// all routes
app.use("/registers", registration);
app.use("/register", registerOrganization);
app.use("/login", SignIn);
app.use("/upload", Home);
app.use("/upload", rating);
app.use("/createBlog", blog);

// app.use("/chat", chat);

app.listen(5001, () => {
  console.log("running on port: 5001");
});

// modeule.exports = app;
