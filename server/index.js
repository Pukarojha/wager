const express = require("express");
const db = require("./db.js");
const app = express();
const cors = require("cors");

app.use(cors());

// const userRoute = require("./Routes/User");
// app.use("/user", userRoute);

app.listen(3001, () => {
  console.log("running on port: 3001");
});
