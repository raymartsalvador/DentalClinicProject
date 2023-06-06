const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const businessHoursSchema = new Schema({
  mondayToFriday: {
    start: { type: String, set: setTime },
    end: { type: String, set: setTime }
  },
  saturday: {
    start: { type: String, set: setTime },
    end: { type: String, set: setTime }
  },
  sunday: {
    start: { type: String, set: setTime },
    end: { type: String, set: setTime }
  }
});

function setTime(value) {
  if (!value) return value;
  return moment(value, 'h:mm a').toDate();
}

const settingsSchema = new Schema({
  businessHours: businessHoursSchema,
  dentalClinic: {
    dentists: [String],
    staffs: [String]
  }
});

module.exports = mongoose.model('setting', settingsSchema, 'settings');

