const express = require('express');
const router = express.Router();
const PatientInformation = require("../models/patientInformation");

//------------------ Patient Information
// Fetch patient information by user ID
router.get("/patient-information/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const patientInfo = await PatientInformation.findOne({ user: userId });
    res.status(200).json(patientInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Update patient information
router.put("/patient-information/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedPatientInfo = req.body;
    const patientInfo = await PatientInformation.findOneAndUpdate(
      { user: userId },
      updatedPatientInfo,
      { new: true }
    );
    res.status(200).json(patientInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Create patient information
router.post("/patient-information", async (req, res) => {
  try {
    const patientInfoData = req.body;
    const patientInfo = new PatientInformation(patientInfoData);
    const savedPatientInfo = await patientInfo.save();
    res.status(200).json(savedPatientInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete patient information
router.delete("/patient-information/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedPatientInfo = await PatientInformation.findOneAndDelete({ user: userId });
    if (!deletedPatientInfo) {
      return res.status(404).json({ error: "Patient information not found" });
    }
    res.status(200).json(deletedPatientInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
