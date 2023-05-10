const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const db =
  "mongodb+srv://user:rm@cluster0.yuik2c0.mongodb.net/DentalClinic";

async function connect() {
  try {
    await mongoose.connect(db);
    console.log("Connected to mongodb");
  } catch (err) {
    console.error("Error connecting to mongodb", err);
  }
}

connect();

router.get("/", (req, res) => {
  res.send("From API route");
});

router.post("/register", async (req, res) => {
  let userData = req.body;

  // Check if username and password match the condition for admin role
  if (userData.email === "admin@admin.com" && userData.password === "admin1234") {
    userData.roles = ["admin"];
  } else {
    userData.roles = ["user"];
  }

  let user = new User(userData);
  try {
    const registeredUser = await user.save();
    let payload = { subject: registeredUser._id };
    let token = jwt.sign(payload, 'secretKey');
    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});


router.post("/login", async (req, res) => {
  let userData = req.body;
  try {
    let user = await User.findOne({ email: userData.email }).exec();
    if (!user) {
      res.status(401).send("invalid email");
    } else if (user.password !== userData.password) {
      res.status(401).send("invalid password");
    } else {

    let payload = {subject: user._id}
    let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}



module.exports = router;
