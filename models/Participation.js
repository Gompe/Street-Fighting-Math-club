const mongoose = require('mongoose')

const ParticipationSchema = new mongoose.Schema({
  contestId: {
    type: mongoose.Types.ObjectId,
    ref: 'Contest',
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: {
    type: [mongoose.Types.ObjectId],
    ref: 'Answer',
    default: [],
  },
  points: {
    type: Number,
    default: -1,
  },
})

module.exports = mongoose.model('Participation', ParticipationSchema)
