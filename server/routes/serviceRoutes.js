const express = require('express');
const router = express.Router();
const Service = require("../models/service");

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

module.exports = router;
