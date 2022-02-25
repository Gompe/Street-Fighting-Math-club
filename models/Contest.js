const mongoose = require('mongoose')

const ContestSchema = new mongoose.Schema({
  startingTime: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    default: 30,
  },
  maxAttempts: {
    type: Number,
    default: 13,
  },
  name: {
    type: String,
    default: 'Default Name',
    maxlength: 100,
  },
  description: {
    type: String,
    default: 'This is a contest!',
    maxlength: 500,
  },
})

module.exports = mongoose.model('Contest', ContestSchema)
