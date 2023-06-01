const express = require('express');
const router = express.Router();
const Settings = require('../models/setting');

// Create a new settings
router.post('', async (req, res) => {
  try {
    const settingsData = req.body;
    const settings = new Settings(settingsData);
    const savedSettings = await settings.save();
    res.status(200).json(savedSettings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Fetch settings
router.get('', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update settings
router.put(':id', async (req, res) => {
  try {
    const settingsId = req.params.id;
    const updatedSettings = req.body;
    const settings = await Settings.findByIdAndUpdate(settingsId, updatedSettings, {
      new: true,
    });
    res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete settings
router.delete(':id', async (req, res) => {
  try {
    const settingsId = req.params.id;
    const deletedSettings = await Settings.findByIdAndDelete(settingsId);
    if (!deletedSettings) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    res.status(200).json(deletedSettings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
