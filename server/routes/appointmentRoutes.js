const express = require('express');
const router = express.Router();

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
