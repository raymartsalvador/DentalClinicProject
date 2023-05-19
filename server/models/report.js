const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = new Schema({
  hours: { type: Number, required: true },
  minutes: { type: Number, required: true }
});

const reportSchema = new Schema({
  businessHours: {
    monday: {
      start: { type: timeSchema, required: true },
      end: { type: timeSchema, required: true }
    },
    tuesday: {
      start: { type: timeSchema, required: true },
      end: { type: timeSchema, required: true }
    },
    wednesday: {
      start: { type: timeSchema, required: true },
      end: { type: timeSchema, required: true }
    },
    thursday: {
      start: { type: timeSchema, required: true },
      end: { type: timeSchema, required: true }
    },
    friday: {
      start: { type: timeSchema, required: true },
      end: { type: timeSchema, required: true }
    },
    saturday: {
      start: { type: timeSchema, required: true },
      end: { type: timeSchema, required: true }
    },
    sunday: {
      start: { type: String, required: true },
      end: { type: String, required: true }
    }
  },
  dentistAvailable: { type: Boolean, required: true },
  clinicOpen: { type: Boolean, required: true }
});

module.exports = mongoose.model('Report', reportSchema, 'reports');
