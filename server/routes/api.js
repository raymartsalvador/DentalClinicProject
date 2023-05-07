const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const db =
  "mongodb+srv://user:E1l79iXG86enMmyL@cluster0.yuik2c0.mongodb.net/DentalClinic";

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
  let user = new User(userData);
  try {
    const registeredUser = await user.save();
    let payload = {subject: registeredUser._id}
    let token = jwt.sign(payload, 'secretKey')
    res.status(200).send({token});
  } catch (error) {
    console.log(error);
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

router.get('/events', (req,res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }]})

router.get('/specialEvents', (req,res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }]})



module.exports = router;
