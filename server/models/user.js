const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  phone: String,
  firstName: String,
  middleName: String,
  lastName: String,
  suffix: String,
  age: Number,
  sex: String,
  address: String,
  comorbidity: String,
  roles: [{ type: String }],
  dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema, 'users');
