const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const { Contest, Question, User, Answer, Participation } = require('../models')

const getScoreboard = async (req, res) => {
  const { contestId } = req.params
  const participations = await Participation.find({ contestId })

  // Creates the row with user data
  const userRows = []

  const questionMap = {}
  const questions = await Question.find({ contestId })

  questions.map((question, index) => {
    questionMap[question._id.toString()] = index
  })

  for (const participation of participations) {
    const userId = participation.userId
    const userName = (await User.findById(userId)).name

    const answers = []
    for (const answerId of participation.answers) {
      answers.push(await Answer.findById(answerId))
    }

    // console.trace(answers)

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
      // answer.questionIndex = questionMap[answer.questionId.toString()]

      const answerObj = answer.toObject()
      answerObj.questionIndex = questionMap[answer.questionId.toString()]

      lastAnswers.push(answerObj)
    })

    let points = participation.points

    if (points === -1) {
      points = refreshPoints(participation)
    }

    const userRow = {
      userId: participation.userId,
      userName,
      answers: lastAnswers,
      points,
    }

    userRows.push(userRow)
  }

  const numQuestions = (await Question.find({ contestId })).length
  const contestName = (await Contest.findById(contestId)).name

  res.status(StatusCodes.OK).json({ userRows, numQuestions, contestName })
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
  getScoreboard,
}
