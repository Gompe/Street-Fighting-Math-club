const moment = require('moment')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const { Contest, Question, User, Answer, Participation } = require('../models')

// --- Middleware for checking if answer is valid

const checkAnswerFormat = async (req, res) => {
  const { questionId, lowerBound, upperBound } = req.body

  if (!questionId || !lowerBound || !upperBound) {
    throw new BadRequestError(`Fields missing in Answer Submission`)
  }

  if (lowerBound <= 0 || upperBound <= 0 || upperBound < lowerBound) {
    throw new BadRequestError('Bounds are not ordered positive reals')
  }
}

const getQuestionData = async (req, res) => {
  const question = await Question.findById(questionId)

  if (!question) {
    throw new BadRequestError('Question not found')
  }

  req.body.question = question
}

const checkUserParticipating = async (req, res) => {
  const { contestId } = req.body.question
  const { userId } = req.user

  const participation = await Participation.findOne({ contestId, userId })
  if (!participation) {
    throw new BadRequestError('You are not participating in this contest')
  }

  req.body.participation = participation
}
