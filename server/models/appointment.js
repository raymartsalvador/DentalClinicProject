const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user' },

  service:String,
  dateSet: { type: Date, default: Date.now }

});

module.exports = mongoose.model('appointment', appointmentSchema, 'appointments')

