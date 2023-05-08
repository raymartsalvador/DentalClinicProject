const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  isAdmin:Boolean,
})
module.exports = mongoose.model('user', userSchema, 'users')
console.log();
