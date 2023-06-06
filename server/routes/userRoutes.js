const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Importing JWT library
const User = require('../models/user');



router.get("/", (req, res) => {
  res.send("From API route");
});


// Fetch user count within a time frame
router.get('/getusers/registered', async (req, res) => {
  const timeFrame = req.query.timeFrame; // 'day', 'week', or 'month'

  let startDate;
  if (timeFrame === 'day') {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
  } else if (timeFrame === 'week') {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() - startDate.getDay());
  } else if (timeFrame === 'month') {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(1);
  } else {
    return res.status(400).send('Invalid time frame');
  }

  try {
    const userCount = await User.countDocuments({ dateAdded: { $gte: startDate } });
    res.status(200).json(userCount);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


// Get user information
router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select('-roles -password -dateAdded');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/getusers/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json(count);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
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
    userData.email === "admin@admin.com"
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
        firstName: user.firstName,
        lastName: user.lastName,
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
