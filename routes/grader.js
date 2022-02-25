const express = require('express')
const router = express.Router()

const { gradeAnswer } = require('../controllers/grader')

router.route('/').post(gradeAnswer)

module.exports = router
