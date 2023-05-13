const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const db = "mongodb+srv://user:rm@cluster0.yuik2c0.mongodb.net/DentalClinic";

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

router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


router.post("/register", async (req, res) => {
  let userData = req.body;

  // Check if username and password match the condition for admin role
  if (
    userData.email === "admin@admin.com" &&
    userData.password === "admin1234"
  ) {
    userData.roles = ["admin"];
  } else {
    userData.roles = ["user"];
  }

  let user = new User(userData);
  try {
    const registeredUser = await user.save();
    let payload = { subject: registeredUser._id };
    let token = jwt.sign(payload, "secretKey");
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
      let payload = {
        subject: user._id,
        role: user.roles, // Include the role in the payload
      };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude the password field from the returned users
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
