const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const { Contest, Question, User, Answer, Participation } = require('../models')

const createParticipation = async (req, res) => {
  const { userId } = req.user
  const { contestId } = req.params

  const contest = await Contest.findById(contestId)
  if (!contest) {
    throw new NotFoundError('Contest not Found')
  }

  if (await Participation.findOne({ userId, contestId })) {
    throw new BadRequestError('You are already registered')
  }

  const participation = await Participation.create({ userId, contestId })

  // Idea - use the success key for modals
  res
    .status(StatusCodes.CREATED)
    .json({ success: 'You are participating', participation })
}

const getAllParticipationsInContest = async (req, res) => {
  const { contestId } = req.params
  const participations = await Participation.find({ contestId })

  res.status(StatusCodes.OK).json(participations)
}

const getUserAnswers = async (req, res) => {
  const { contestId, userId } = req.params
  const participation = await Participation.findOne({ contestId, userId })

  if (!participation) {
    throw new BadRequestError('User Not Participating')
  }

  // --- get answers ---
  const answers = []
  participations.answers.forEach(async (answerId) => {
    const answer = await Answer.findById(answerId)
    answers.push(answer)
  })

  res.status(StatusCodes.OK).json(answers)
}

const getLastGrade = async (req, res) => {
  const { userId, questionId } = req.params
  const answers = await Answer.find({ userId, questionId })

  if (answers.length === 0) {
    return res.status(StatusCodes.OK).json({ lastGrade: -1 })
  }

  res
    .status(StatusCodes.OK)
    .json({ lastGrade: answers[answers.length - 1].grade })
}

module.exports = {
  createParticipation,
  getAllParticipationsInContest,
  getUserAnswers,
  getLastGrade,
}
