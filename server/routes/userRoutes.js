const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Importing JWT library
const User = require('../models/user');



router.get("/", (req, res) => {
  res.send("From API route");
});



// edit user
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

//register user
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

//login authentication
router.post('/login', async (req, res) => {
  let userData = req.body;
  try {
    let user = await User.findOne({ email: userData.email }).exec();
    if (!user) {
      res.status(401).send('Invalid email');
    } else if (user.password !== userData.password) {
      res.status(401).send('Invalid password');
    } else {
      let payload = {
        subject: user._id,
        role: user.roles,
      };
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

//fetching users
router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude the password field from the returned users
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//deleting users
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
