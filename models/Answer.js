const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questionId: {
      type: mongoose.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    lowerBound: {
      type: Number,
      required: true,
    },
    upperBound: {
      type: Number,
      required: true,
    },
    grade: {
      type: Number,
      default: -1,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Answer', AnswerSchema)
