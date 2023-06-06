const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  patientName: String,
  title: [String],
  start: Date,
  end: Date,
  isApproved: Boolean,
  color: {
    primary: String,
    secondary: String
  }
});


module.exports = mongoose.model('Appointment', appointmentSchema, 'appointments');
