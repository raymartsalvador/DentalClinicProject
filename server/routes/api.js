const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const db = "mongodb+srv://user:E1l79iXG86enMmyL@cluster0.yuik2c0.mongodb.net/"

async function connect() {
  try {
    await mongoose.connect(db)
    console.log('Connected to mongodb')
  } catch (err) {
    console.error('Error connecting to mongodb', err)
  }
}

connect()

router.get('/', (req, res)=>{
  res.send('From API route')
})

module.exports = router;
