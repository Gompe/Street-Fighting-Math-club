const express = require('express')
const router = express.Router()

const { ContestView } = require('../controllers/contests')
const {
  createAnswer,
  getAllAnswers,
  getAllAnswersInQuestion,
} = require('../controllers/answers')

// CONTEST VIEW
router.route('/').get(ContestView)

// ANSWERS
router.route('/answers').get(getAllAnswers)

router
  .route('/answers/:questionId')
  .post(createAnswer)
  .get(getAllAnswersInQuestion)

module.exports = router
