const express = require('express')
const router = express.Router()

const {
  getAllContests,
  getContest,
  createContest,
  updateContest,
  deleteContest,
  ContestView,
} = require('../controllers/contests')

const adminAuth = require('../middleware/adminAuth')

router.route('/').get(getAllContests)
router.route('/').get(ContestView)

router.use(adminAuth)

router.post('/', createContest)

router
  .route('/:contestId')
  .get(ContestView)
  .patch(updateContest)
  .delete(deleteContest)

module.exports = router
