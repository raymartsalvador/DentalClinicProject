const mongoose = require('mongoose')
const Schema = mongoose.Schema

const servicesSchema = new Schema({
  title: String,
  description:String,
  imageLink:String,
  dateAdded: { type: Date, default: Date.now }
})

module.exports = mongoose.model('service', servicesSchema, 'services')

