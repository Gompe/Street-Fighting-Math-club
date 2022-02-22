const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { Participation, Question, Answer } = require('../models')

/* Answers

It is assumed that

(1) - req.contest
(2) - req.participation
(3) - req.user

*/

const createAnswer = async (req, res) => {
  //
  const contest = req.contest
  const { userId } = req.user
  const participation = req.participation

  //
  const { questionId } = req.params
  const { lowerBound, upperBound } = req.body
  validateAnswer(lowerBound, upperBound)

  const question = await Question.findById(questionId)

  if (!question) {
    throw new NotFoundError('Question not found')
  }

  if (participation.answers.length > contest.maxAttempts) {
    throw new BadRequestError("You don't have more attempts")
  }

  // Creating the answer
  const grade = computeGrade(question.answer, lowerBound, upperBound)

  const answer = await Answer.create({
    userId,
    questionId,
    lowerBound,
    upperBound,
    grade,
  })

  await Participation.findByIdAndUpdate(participation._id, {
    answers: [...participation.answers, answer._id],
  })

  await refreshPoints(await Participation.findById(participation._id))

  res.status(StatusCodes.OK).json(answer)
}

const getAllAnswers = async (req, res) => {
  const participation = req.participation
  const answerPromises = []

  for (const answerId of participation.answers) {
    answerPromises.push(Answer.findById(answerId))
  }

  const answers = await Promise.all(answerPromises)

  res.status(StatusCodes.OK).json({ answers })
}

const getAllAnswersInQuestion = async (req, res) => {
  const { questionId } = req.params
  const participation = req.participation
  const answerPromises = []

  for (const answerId of participation.answers) {
    answerPromises.push(Answer.findById(answerId))
  }

  const answers = await Promise.all(answerPromises)

  res.status(StatusCodes.OK).json({
    answers: answers.filter((answer) => answer.questionId === questionId),
  })
}

// --- HELPER FUNCTIONS

const validateAnswer = (a, b) => {
  if (!a || !b) {
    throw new BadRequestError('Answer is not in the right format')
  }
  if (a < 0 || b < 0 || b < a) {
    throw new BadRequestError('Answer is not in the right format')
  }
}

const computeGrade = (answer, lowerBound, upperBound) => {
  if (answer >= lowerBound && answer <= upperBound) {
    return upperBound / lowerBound
  }

  return -1
}

const refreshPoints = async (participation) => {
  let sumGradesCorrect = 0
  let numCorrect = 0

  const answers = []
  for (const answerId of participation.answers) {
    answers.push(await Answer.findById(answerId))
  }

  answers.sort((a1, a2) => (a1.timestamp > a2.timestamp ? 1 : -1))

  // Get the last answer for each question
  const lastAnswers = []
  answers.forEach((answer) => {
    for (const lastAnswer of lastAnswers) {
      if (answer.questionId.equals(lastAnswer.questionId)) {
        return
      }
    }

    // Answer to a new question
    lastAnswers.push(answer)

    if (answer.grade !== -1) {
      numCorrect += 1
      sumGradesCorrect += answer.grade
    }
  })

  const numQuestions = (
    await Question.find({ contestId: participation.contestId })
  ).length

  const points =
    Math.pow(2, numQuestions - numCorrect) * (10 + sumGradesCorrect)

  await Participation.findByIdAndUpdate(participation._id, { points })

  return points
}

module.exports = {
  getAllAnswers,
  getAllAnswersInQuestion,
  createAnswer,
}
