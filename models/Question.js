const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  answer: {
    type: Number,
    required: true,
  },
  contestId: {
    type: mongoose.Types.ObjectId,
    ref: 'Contest',
    required: true,
  },
  index: {
    type: Number,
  },
})

module.exports = mongoose.model('Question', QuestionSchema)
