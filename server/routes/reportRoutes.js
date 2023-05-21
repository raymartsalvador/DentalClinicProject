const express = require('express');
const router = express.Router();
const Report = require("../models/report");


router.get("/reports/:id", async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Update the report
router.put("/reports/:id", async (req, res) => {
  try {
    const reportId = req.params.id;
    const updatedReport = req.body;
    const report = await Report.findByIdAndUpdate(reportId, updatedReport, {
      new: true,
    });
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Create a report
router.post("/reports", async (req, res) => {
  try {
    const reportData = req.body;
    const report = new Report(reportData);
    const savedReport = await report.save();
    res.status(200).json(savedReport);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete a report
router.delete("/reports/:id", async (req, res) => {
  try {
    const reportId = req.params.id;
    const deletedReport = await Report.findByIdAndDelete(reportId);
    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json(deletedReport);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
module.exports = router;
