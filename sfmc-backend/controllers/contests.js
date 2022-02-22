const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const { Contest, Question } = require('../models')

const getAllContests = async (req, res) => {
  const contests = await Contest.find().sort({ startingTime: -1 })
  res.status(StatusCodes.OK).json({ contests, count: contests.length })
}

const getContest = async (req, res) => {
  const { contestId } = req.params
  const contest = await Contest.findById(contestId)

  if (!contest) {
    console.log('Contest with id: ', contestId, ' not found')
    throw new NotFoundError(`No contest with id ${contestId}`)
  }

  console.log('Respoonse: ', contest)
  res.status(StatusCodes.OK).json({ contest })
}

const createContest = async (req, res) => {
  const contest = await Contest.create(req.body)
  res.status(StatusCodes.CREATED).json({ contest })
}

const deleteContest = async (req, res) => {
  const { contestId } = req.params

  const contest = await Contest.findByIdAndRemove(contestId)

  if (!contest) {
    throw new NotFoundError(`No contest with id ${contestId}`)
  }

  res.status(StatusCodes.OK).json({ success: true })
}

const updateContest = async (req, res) => {
  const { contestId } = req.params

  const contest = await Contest.findByIdAndUpdate(contestId, req.body, {
    new: true,
    runValidators: true,
  })

  if (!contest) {
    throw new NotFoundError(`No contest with id ${contestId}`)
  }

  res.status(StatusCodes.OK).json(contest)
}

// --- Functions for contest view

const groupQuestions = async (req, res) => {
  const questions = await Question.find({ contestId: req.contest._id })
  req.questions = questions.map((question) => {
    return {
      _id: question._id,
      description: question.description,
      index: question.index,
    }
  })
}

const ContestView = async (req, res) => {
  // Checks
  // console.log('Contest View Checks')

  await groupQuestions(req, res)
  // console.log('Check Group Questions OK')

  const attempts = req.contest.maxAttempts - req.participation.answers.length

  res.status(StatusCodes.OK).json({
    questions: req.questions,
    contest: req.contest,
    attempts,
  })
}

module.exports = {
  getAllContests,
  getContest,
  createContest,
  deleteContest,
  updateContest,
  ContestView,
}
