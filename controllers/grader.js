const moment = require('moment')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const { Contest, Question, User, Answer, Participation } = require('../models')

const isAnswerValid = (a, b) => {
  return a && b && a < b && a > 0 && b > 0
}

const validateAnswer = async (req, res) => {
  const { questionId, lowerBound, upperBound } = req.body
  const userId = req.user.userId

  // Check Answer Format
  if (!questionId) {
    throw new BadRequestError('QuestionId Missing')
  }

  if (!isAnswerValid(lowerBound, upperBound)) {
    throw new BadRequestError('Bounds are not in the right format')
  }

  // Check if question exists
  const question = await Question.findById(questionId)

  if (!question) {
    throw new BadRequestError('Question not found')
  }

  // --- Checks if the individual is actually participating
  const contestId = question.contestId
  const participation = await Participation.findOne({ contestId, userId })

  if (!participation) {
    throw new BadRequestError('You are not participating in this contest')
  }

  const contest = await Contest.findById(contestId)

  // Checks if time is valid

  const timeSinceStart = moment().diff(moment(contest.startingTime), 'seconds')
  if (timeSinceStart > 60 * contest.duration) {
    throw new BadRequestError('The time is over')
  }

  if (participation.answers.length >= contest.maxAttempts) {
    throw new BadRequestError('You have no more attempts')
  }

  return {
    lowerBound,
    upperBound,
    questionId,
    answer: question.answer,
    timeLeft: 60 * contest.duration - timeSinceStart,
  }
}

const gradeAnswer = async (req, res) => {
  const { lowerBound, upperBound, answer, timeLeft, questionId } =
    await validateAnswer(req, res)

  const { userId } = req.user

  let grade = -1

  if (answer >= lowerBound && answer <= upperBound) {
    grade = upperBound / lowerBound
  }

  console.log('Changing answer')

  const answerObj = await Answer.create({
    lowerBound,
    upperBound,
    questionId,
    userId,
    grade,
  })

  res.json({ answerObj })
}

module.exports = {
  gradeAnswer,
}
