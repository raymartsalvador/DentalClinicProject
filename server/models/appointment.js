const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  start: Date,
  end: Date,
  color: {
    primary: String,
    secondary: String
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
