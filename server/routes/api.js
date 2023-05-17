const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const Appointment = require("../models/appointment");
const Service = require("../models/service");
const mongoose = require("mongoose");
const db = "mongodb+srv://user:rm@cluster0.yuik2c0.mongodb.net/DentalClinic";
//Connect to DB
async function connect() {
  try {
    await mongoose.connect(db);
    console.log("Connected to mongodb");
  } catch (err) {
    console.error("Error connecting to mongodb", err);
  }
}
connect();

// get request to API route
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

//==================services
// Fetch all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update a service
router.put('/services/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;
    const updatedService = req.body;
    const service = await Service.findByIdAndUpdate(serviceId, updatedService, {
      new: true,
    });
    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
// Create a service
router.post('/services', async (req, res) => {
  try {
    const serviceData = req.body;
    const service = new Service(serviceData);
    const savedService = await service.save();
    res.status(200).json(savedService);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
// Delete a service
router.delete('/services/:id', async (req, res) => {
  try {
    const serviceId = req.params.id;
    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(deletedService);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

//================== Appointments
/// Fetch all appointments
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('user', 'firstName lastName email');
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Update an appointment
router.put("/appointments/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const updatedAppointment = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, updatedAppointment, { new: true });
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Create an appointment
router.post("/appointments", async (req, res) => {
  try {
    const appointmentData = req.body;
    const appointment = new Appointment(appointmentData);
    const savedAppointment = await appointment.save();
    res.status(200).json(savedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete an appointment
router.delete("/appointments/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(deletedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Check appointment availability
router.get("/appointments/availability", async (req, res) => {
  try {
    const startTime = new Date(req.query.startTime);
    const endTime = new Date(req.query.endTime);

    const overlappingAppointments = await Appointment.find({
      $or: [
        { start: { $lt: endTime }, end: { $gt: startTime } }, // Appointment starts before the selected end time and ends after the selected start time
        { start: { $gte: startTime, $lte: endTime } }, // Appointment starts between the selected start and end time
        { end: { $gte: startTime, $lte: endTime } } // Appointment ends between the selected start and end time
      ]
    });

    const isAvailable = overlappingAppointments.length === 0;
    res.status(200).json(isAvailable);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
