const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = 'mongodb+srv://user:rm@cluster0.yuik2c0.mongodb.net/DentalClinic';

// Connect to DB
async function connect() {
  try {
    await mongoose.connect(db);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}
connect();

// Get request to API route
router.get('/', (req, res) => {
  res.send('From API route');
});

// Import individual route files
const userRoutes = require('./userRoutes');
const serviceRoutes = require('./serviceRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const settingRoutes = require('./settingRoutes');
const patientInformationRoutes = require('./patientInformationRoutes');

// Use the route files
router.use('/users', userRoutes);
router.use('/services', serviceRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/settings', settingRoutes);
router.use('/patient-information', patientInformationRoutes);

module.exports = router;
