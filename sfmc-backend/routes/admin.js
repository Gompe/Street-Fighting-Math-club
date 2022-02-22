const express = require('express')
const router = express.Router()

const {
  getContest,
  createContest,
  updateContest,
  deleteContest,
} = require('../controllers/contests')

router
  .route('/contests/:contestId')
  .get(getContest)
  .post(createContest)
  .patch(updateContest)
  .delete(deleteContest)

module.exports = router
